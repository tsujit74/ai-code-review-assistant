import { Module } from '@nestjs/common';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { PrismaService } from '../database/prisma.service';
import { AiProvidersModule } from '../ai-providers/ai-providers.module';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [AiProvidersModule, FilesModule],
  controllers: [ReviewsController],
  providers: [ReviewsService, PrismaService],
})
export class ReviewsModule {}