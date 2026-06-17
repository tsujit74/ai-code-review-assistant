import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { FilesModule } from './files/files.module';
import { AiProvidersModule } from './ai-providers/ai-providers.module';

@Module({
  imports: [AuthModule, ProjectsModule, FilesModule, AiProvidersModule],
})
export class AppModule {}