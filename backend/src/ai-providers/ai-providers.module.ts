import { Module } from '@nestjs/common';
import { AiProvidersController } from './ai-providers.controller';
import { AiProvidersService } from './ai-providers.service';
import { PrismaService } from '../database/prisma.service';

@Module({
  controllers: [AiProvidersController],
  providers: [AiProvidersService, PrismaService],
  exports: [AiProvidersService],
})
export class AiProvidersModule {}