import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { AiProvidersService } from '../ai-providers/ai-providers.service';
import axios from 'axios';

@Injectable()
export class ChatService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly aiProvidersService: AiProvidersService,
  ) {}

  /* ================= CREATE SESSION ================= */

  async createSession(userId: string, projectId: string) {
    return this.prisma.chatSession.create({
      data: { projectId, userId },
    });
  }

  /* ================= GET SESSIONS ================= */

  async getSessions(userId: string, projectId: string) {
    return this.prisma.chatSession.findMany({
      where: { projectId, userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  /* ================= GET MESSAGES ================= */

  async getMessages(userId: string, sessionId: string) {
    const session = await this.prisma.chatSession.findFirst({
      where: { id: sessionId, userId },
    });

    if (!session) {
      throw new NotFoundException('Chat session not found');
    }

    return this.prisma.message.findMany({
      where: { sessionId },
      orderBy: { createdAt: 'asc' },
    });
  }

  /* ================= SEND MESSAGE ================= */

  async sendMessage(
    userId: string,
    sessionId: string,
    message: string,
    providerId?: string, // 👈 IMPORTANT (USER CHOICE)
  ) {
    const session = await this.prisma.chatSession.findFirst({
      where: { id: sessionId, userId },
    });

    if (!session) {
      throw new NotFoundException('Chat session not found');
    }

    // Save user message
    await this.prisma.message.create({
      data: {
        sessionId,
        content: message,
        role: 'USER',
      },
    });

    try {
      /* ================= AI PROVIDER RESOLUTION ================= */

      let provider;

      if (providerId) {
        provider = await this.aiProvidersService.findOne(userId, providerId);
      } else {
        provider =
          await this.aiProvidersService.getDefaultProvider(userId);
      }

      if (!provider) {
        throw new BadRequestException('No AI provider configured');
      }

      /* ================= PROJECT CONTEXT ================= */

      const files = await this.prisma.file.findMany({
        where: { projectId: session.projectId },
        take: 5,
        orderBy: { path: 'asc' },
      });

      const projectContext =
        files.length > 0
          ? `
Project Context (important files):
${files
  .map(
    (f) =>
      `FILE: ${f.path}\n${(f.content || '').slice(0, 500)}`,
  )
  .join('\n\n')}
`
          : '';

      /* ================= AI REQUEST ================= */

      const response = await axios.post(
        `${provider.baseUrl}/chat/completions`,
        {
          model: provider.modelName,
          messages: [
            {
              role: 'system',
              content: `
You are a senior code assistant.

Rules:
- Be extremely concise (1–4 lines max)
- Focus on practical fixes
- No unnecessary explanation
- If code issue → give fix immediately

${projectContext}
              `.trim(),
            },
            {
              role: 'user',
              content: message,
            },
          ],
          temperature: 0.2,
          max_tokens: 300,
        },
        {
          headers: {
            Authorization: `Bearer ${provider.apiKey}`,
            'Content-Type': 'application/json',
          },
        },
      );

      const assistantMessage =
        response.data?.choices?.[0]?.message?.content?.trim();

      if (!assistantMessage) {
        throw new BadRequestException('No response from AI');
      }

      // Save assistant message
      await this.prisma.message.create({
        data: {
          sessionId,
          content: assistantMessage,
          role: 'ASSISTANT',
        },
      });

      return { reply: assistantMessage };
    } catch (error) {
      console.error('AI ERROR:', error?.response?.data || error.message);

      throw new BadRequestException(
        error?.response?.data?.error?.message ||
          'AI request failed',
      );
    }
  }
}