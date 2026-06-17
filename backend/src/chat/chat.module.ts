import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { PrismaService } from '../database/prisma.service';
import { AiProvidersModule } from '../ai-providers/ai-providers.module';

@Module({
  imports: [AiProvidersModule],
  controllers: [ChatController],
  providers: [ChatService, PrismaService],
})
export class ChatModule {}