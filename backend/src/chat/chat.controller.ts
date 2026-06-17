import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { User } from '../common/decorators/user.decorator';
import { ChatService } from './chat.service';
import { CreateChatSessionDto } from './dto/create-chat-session.dto';
import { SendMessageDto } from './dto/send-message.dto';

@Controller('chat')
@UseGuards(JwtAuthGuard)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('session')
  createSession(@User() user: any, @Body() dto: CreateChatSessionDto) {
    return this.chatService.createSession(user.id, dto.projectId);
  }

  @Get('session/:projectId')
  getSessions(@User() user: any, @Param('projectId') projectId: string) {
    return this.chatService.getSessions(user.id, projectId);
  }

  @Get(':sessionId/messages')
  getMessages(@User() user: any, @Param('sessionId') sessionId: string) {
    return this.chatService.getMessages(user.id, sessionId);
  }

  @Post('message')
  sendMessage(@User() user: any, @Body() dto: SendMessageDto) {
    return this.chatService.sendMessage(user.id, dto.sessionId, dto.message);
  }
}