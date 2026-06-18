import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateAiProviderDto } from './dto/create-ai-provider.dto';
import { UpdateAiProviderDto } from './dto/update-ai-provider.dto';

@Injectable()
export class AiProvidersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateAiProviderDto) {
    const existing = await this.prisma.aIProvider.findFirst({
      where: {
        userId,
        name: dto.name,
      },
    });

    if (existing) {
      throw new ConflictException('Provider name already exists');
    }

    return this.prisma.aIProvider.create({
      data: {
        ...dto,
        userId,
      },
    });
  }

 
  async findAll(userId: string) {
    return this.prisma.aIProvider.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

 
  async findActive(userId: string) {
    return this.prisma.aIProvider.findMany({
      where: {
        userId,
        isActive: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }


  async findOne(userId: string, id: string) {
    const provider = await this.prisma.aIProvider.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!provider) {
      throw new NotFoundException('AI provider not found');
    }

    return provider;
  }

  
  async update(userId: string, id: string, dto: UpdateAiProviderDto) {
    await this.findOne(userId, id);

    return this.prisma.aIProvider.update({
      where: { id },
      data: dto,
    });
  }

  async remove(userId: string, id: string) {
    await this.findOne(userId, id);

    await this.prisma.aIProvider.delete({
      where: { id },
    });

    return {
      message: 'AI provider deleted successfully',
    };
  }

  
  async getByName(userId: string, name: string) {
    return this.prisma.aIProvider.findFirst({
      where: {
        userId,
        name,
      },
    });
  }

  async getDefaultProvider(userId: string) {
    return this.prisma.aIProvider.findFirst({
      where: {
        userId,
        isActive: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}