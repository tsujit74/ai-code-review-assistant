import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { AiProvidersService } from './ai-providers.service';
import { CreateAiProviderDto } from './dto/create-ai-provider.dto';
import { UpdateAiProviderDto } from './dto/update-ai-provider.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('ai-providers')
export class AiProvidersController {
  constructor(
    private readonly aiProvidersService: AiProvidersService,
  ) {}

  private getUserId(req: any): string {
    return req.user.id; // now ALWAYS safe
  }

  @Post()
  create(@Req() req: any, @Body() dto: CreateAiProviderDto) {
    return this.aiProvidersService.create(
      this.getUserId(req),
      dto,
    );
  }

  @Get()
  findAll(@Req() req: any) {
    return this.aiProvidersService.findAll(
      this.getUserId(req),
    );
  }

  @Get('active')
  findActive(@Req() req: any) {
    return this.aiProvidersService.findActive(
      this.getUserId(req),
    );
  }

  @Get(':id')
  findOne(@Req() req: any, @Param('id') id: string) {
    return this.aiProvidersService.findOne(
      this.getUserId(req),
      id,
    );
  }

  @Patch(':id')
  update(
    @Req() req: any,
    @Param('id') id: string,
    @Body() dto: UpdateAiProviderDto,
  ) {
    return this.aiProvidersService.update(
      this.getUserId(req),
      id,
      dto,
    );
  }

  @Delete(':id')
  remove(@Req() req: any, @Param('id') id: string) {
    return this.aiProvidersService.remove(
      this.getUserId(req),
      id,
    );
  }
}