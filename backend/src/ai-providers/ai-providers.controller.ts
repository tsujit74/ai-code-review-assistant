import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AiProvidersService } from './ai-providers.service';
import { CreateAiProviderDto } from './dto/create-ai-provider.dto';
import { UpdateAiProviderDto } from './dto/update-ai-provider.dto';

@Controller('ai-providers')
export class AiProvidersController {
  constructor(private readonly aiProvidersService: AiProvidersService) {}

  @Post()
  create(@Body() dto: CreateAiProviderDto) {
    return this.aiProvidersService.create(dto);
  }

  @Get()
  findAll() {
    return this.aiProvidersService.findAll();
  }

  @Get('active')
  findActive() {
    return this.aiProvidersService.findActive();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aiProvidersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAiProviderDto) {
    return this.aiProvidersService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aiProvidersService.remove(id);
  }
}