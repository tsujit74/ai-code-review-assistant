import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { FilesModule } from './files/files.module';
import { AiProvidersModule } from './ai-providers/ai-providers.module';
import { ReviewsModule } from './reviews/reviews.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [AuthModule, ProjectsModule, FilesModule, AiProvidersModule, ReviewsModule, ChatModule],
})
export class AppModule {}