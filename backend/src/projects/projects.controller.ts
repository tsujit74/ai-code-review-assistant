import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { User } from '../common/decorators/user.decorator';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';

@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@User() user: any, @Body() dto: CreateProjectDto) {
    return this.projectsService.create(user.id, dto);
  }

  @Get()
  findAll(@User() user: any) {
    return this.projectsService.findAll(user.id);
  }

  @Get(':id')
  findOne(@User() user: any, @Param('id') id: string) {
    return this.projectsService.findOne(user.id, id);
  }

  @Delete(':id')
  remove(@User() user: any, @Param('id') id: string) {
    return this.projectsService.remove(user.id, id);
  }
}