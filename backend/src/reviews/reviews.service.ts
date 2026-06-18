import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { AiProvidersService } from '../ai-providers/ai-providers.service';
import { CreateReviewDto } from './dto/create-review.dto';
import axios from 'axios';

@Injectable()
export class ReviewsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly aiProvidersService: AiProvidersService,
  ) {}

  /* ================= CREATE REVIEW ================= */

  async createReview(userId: string, dto: CreateReviewDto) {
    const project = await this.prisma.project.findFirst({
      where: { id: dto.projectId, userId },
    });

    if (!project) throw new NotFoundException('Project not found');

    const files = await this.prisma.file.findMany({
      where: { projectId: dto.projectId },
      orderBy: { path: 'asc' },
    });

    if (!files.length) {
      throw new BadRequestException('No files found in project');
    }

    const provider = await this.aiProvidersService.getDefaultProvider();

    if (!provider) {
      throw new BadRequestException('No active AI provider configured');
    }

    const selectedFiles = this.selectRelevantFiles(files);
    const prompt = this.buildPrompt(dto.type, selectedFiles);

    try {
      const response = await axios.post(
        `${provider.baseUrl}/chat/completions`,
        {
          model: provider.modelName,
          messages: [
            {
              role: 'system',
              content:
                'You are a senior software engineer. Return ONLY valid JSON with: summary, issues, recommendations, severity. Focus only on important logic.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.2,
          max_tokens: 1200,
        },
        {
          headers: {
            Authorization: `Bearer ${provider.apiKey}`,
            'Content-Type': 'application/json',
          },
        },
      );

      const content =
        response.data?.choices?.[0]?.message?.content ?? '{}';

      let parsed: any;

      try {
        parsed = JSON.parse(
          content.replace(/```json/g, '').replace(/```/g, '').trim(),
        );
      } catch {
        parsed = {
          summary: 'Failed to parse AI response',
          issues: [],
          recommendations: [],
          severity: 'LOW',
        };
      }

      return this.prisma.review.create({
        data: {
          projectId: dto.projectId,
          userId,
          type: dto.type,
          summary: parsed.summary || 'No summary returned',
          issues: parsed.issues || [],
          recommendations: parsed.recommendations || [],
          severity: parsed.severity || 'INFO',
          status: 'COMPLETED',
        },
      });
    } catch (error) {
      console.error(
        'AI REVIEW ERROR:',
        error?.response?.data || error.message,
      );

      return this.prisma.review.create({
        data: {
          projectId: dto.projectId,
          userId,
          type: dto.type,
          summary:
            error?.response?.data?.error?.message || 'Review failed',
          issues: [],
          recommendations: [],
          severity: 'LOW',
          status: 'FAILED',
        },
      });
    }
  }

  /* ================= FIND BY PROJECT ================= */

  async findByProject(userId: string, projectId: string) {
    const project = await this.prisma.project.findFirst({
      where: { id: projectId, userId },
    });

    if (!project) throw new NotFoundException('Project not found');

    return this.prisma.review.findMany({
      where: { projectId },
      orderBy: { createdAt: 'desc' },
    });
  }

  /* ================= FIND ONE ================= */

  async findOne(userId: string, reviewId: string) {
    const review = await this.prisma.review.findFirst({
      where: { id: reviewId, userId },
    });

    if (!review) throw new NotFoundException('Review not found');

    return review;
  }

  /* ================= SMART FILE SELECTION ================= */

  private selectRelevantFiles(files: any[]) {
    return files
      .map((file) => {
        let score = 0;
        const path = file.path.toLowerCase();

        // Entry / core files
        if (
          path.includes('main') ||
          path.includes('app') ||
          path.includes('index')
        ) {
          score += 10;
        }

        // Business logic
        if (
          path.includes('service') ||
          path.includes('controller') ||
          path.includes('module')
        ) {
          score += 7;
        }

        // Helpers
        if (path.includes('util') || path.includes('helper')) {
          score += 4;
        }

        // Size factor
        if (file.content?.length > 1000) {
          score += 2;
        }

        return {
          path: file.path,
          content: file.content,
          score,
        };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 8); // 🔥 token control
  }

  /* ================= CONTENT COMPRESSION ================= */

  private compressContent(content: string) {
    if (!content) return '';

    return content
      .split('\n')
      .slice(0, 120) // prevent huge token usage
      .join('\n');
  }

  /* ================= PROMPT BUILDER ================= */

  private buildPrompt(type: string, files: any[]) {
    const fileContent = files
      .map(
        (file) =>
          `FILE: ${file.path}\n\`\`\`\n${this.compressContent(
            file.content,
          )}\n\`\`\``,
      )
      .join('\n\n');

    return `
You are a senior software engineer performing a ${type} review.

RULES:
- Focus ONLY on important logic
- Ignore boilerplate and formatting
- Be precise and actionable

Return STRICT JSON:
{
  "summary": "short analysis",
  "severity": "HIGH | MEDIUM | LOW",
  "issues": [
    {
      "file": "file path",
      "problem": "what is wrong",
      "severity": "HIGH | MEDIUM | LOW",
      "lineHint": "optional"
    }
  ],
  "recommendations": [
    "clear actionable improvement"
  ]
}

CODEBASE:
${fileContent}
`;
  }
}