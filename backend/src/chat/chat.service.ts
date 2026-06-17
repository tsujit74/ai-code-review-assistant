import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import axios from 'axios';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}

  async createSession(userId: string, projectId: string) {
    return this.prisma.chatSession.create({
      data: { projectId, userId },
    });
  }

  async getSessions(userId: string, projectId: string) {
    return this.prisma.chatSession.findMany({
      where: { projectId, userId },
      orderBy: { createdAt: 'desc' },
    });
  }

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

  async sendMessage(userId: string, sessionId: string, message: string) {
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
      const baseUrl = process.env.AI_BASE_URL;
      const apiKey = process.env.AI_API_KEY;
      const model = process.env.AI_MODEL;

      if (!baseUrl || !apiKey || !model) {
        throw new BadRequestException('AI env config missing');
      }

      const response = await axios.post(
        `${baseUrl}/chat/completions`,
        {
          model,
          messages: [
            {
              role: 'system',
              content:
                'You are a helpful assistant. Give SHORT, SIMPLE, DIRECT answers in 1-4 lines only. No long explanation.',
            },
            {
              role: 'user',
              content: message,
            },
          ],
          temperature: 0.2,
          max_tokens: 250,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        },
      );

      const assistantMessage =
        response.data?.choices?.[0]?.message?.content?.trim();

      if (!assistantMessage) {
        throw new BadRequestException('No response from AI');
      }

      await this.prisma.message.create({
        data: {
          sessionId,
          content: assistantMessage,
          role: 'ASSISTANT',
        },
      });

      return { reply: assistantMessage };
    } catch (error) {
      console.error(
        'AI ERROR:',
        error?.response?.data || error.message,
      );

      throw new BadRequestException(
        error?.response?.data?.error?.message ||
          'AI request failed',
      );
    }
  }
}