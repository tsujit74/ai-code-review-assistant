import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateAiProviderDto } from './dto/create-ai-provider.dto';
import { UpdateAiProviderDto } from './dto/update-ai-provider.dto';

@Injectable()
export class AiProvidersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateAiProviderDto) {
    const existing = await this.prisma.aIProvider.findUnique({
      where: { name: dto.name },
    });

    if (existing) {
      throw new ConflictException('Provider name already exists');
    }

    return this.prisma.aIProvider.create({
      data: dto,
    });
  }

  async findAll() {
    return this.prisma.aIProvider.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findActive() {
    return this.prisma.aIProvider.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const provider = await this.prisma.aIProvider.findUnique({
      where: { id },
    });

    if (!provider) {
      throw new NotFoundException('AI provider not found');
    }

    return provider;
  }

  async update(id: string, dto: UpdateAiProviderDto) {
    await this.findOne(id);

    return this.prisma.aIProvider.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.prisma.aIProvider.delete({
      where: { id },
    });

    return { message: 'AI provider deleted successfully' };
  }

  async getByName(name: string) {
    return this.prisma.aIProvider.findUnique({
      where: { name },
    });
  }

  async getDefaultProvider() {
    return this.prisma.aIProvider.findFirst({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });
  }
}