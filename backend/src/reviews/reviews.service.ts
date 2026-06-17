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

  async createReview(userId: string, dto: CreateReviewDto) {
    const project = await this.prisma.project.findFirst({
      where: { id: dto.projectId, userId },
    });

    if (!project) throw new NotFoundException('Project not found');

    const files = await this.prisma.file.findMany({
      where: { projectId: dto.projectId },
      orderBy: { path: 'asc' },
    });

    if (files.length === 0) {
      throw new BadRequestException('No files found in project');
    }

    const provider = await this.aiProvidersService.getDefaultProvider();

    if (!provider) {
      throw new BadRequestException('No active AI provider configured');
    }

    const prompt = this.buildPrompt(dto.type, files);

    try {

      
      const response = await axios.post(
        `${provider.baseUrl}/chat/completions`,
        {
          model: provider.modelName,
          messages: [
            {
              role: 'system',
              content:
                'You are a senior code reviewer. Return ONLY valid JSON with keys: summary, issues, recommendations, severity.',
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
          content
            .replace(/```json/g, '')
            .replace(/```/g, '')
            .trim(),
        );
      } catch {
        parsed = {
          summary: 'Invalid AI response',
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
        'GROQ REVIEW ERROR:',
        error?.response?.data || error.message,
      );

      return this.prisma.review.create({
        data: {
          projectId: dto.projectId,
          userId,
          type: dto.type,
          summary:
            error?.response?.data?.error?.message ||
            'Review failed',
          issues: [],
          recommendations: [],
          severity: 'LOW',
          status: 'FAILED',
        },
      });
    }
  }

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

  async findOne(userId: string, reviewId: string) {
    const review = await this.prisma.review.findFirst({
      where: { id: reviewId, userId },
    });

    if (!review) throw new NotFoundException('Review not found');

    return review;
  }

  private buildPrompt(type: string, files: any[]) {
    const fileContent = files
      .map(
        (file) =>
          `FILE: ${file.path}\n\`\`\`\n${file.content.slice(0, 2000)}\n\`\`\``,
      )
      .join('\n\n');

    return `
Review this code for ${type} issues.

Return JSON only:

{
  "summary": "short summary",
  "issues": [],
  "recommendations": [],
  "severity": "HIGH"
}

Code:
${fileContent}
`;
  }
}