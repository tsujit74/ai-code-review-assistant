import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [AuthModule, ProjectsModule, FilesModule],
})
export class AppModule {}