import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { User } from '../common/decorators/user.decorator';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('reviews')
@UseGuards(JwtAuthGuard)
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  create(@User() user: any, @Body() dto: CreateReviewDto) {
    return this.reviewsService.createReview(user.id, dto);
  }

  @Get('project/:projectId')
  findByProject(@User() user: any, @Param('projectId') projectId: string) {
    return this.reviewsService.findByProject(user.id, projectId);
  }

  @Get(':reviewId')
  findOne(@User() user: any, @Param('reviewId') reviewId: string) {
    return this.reviewsService.findOne(user.id, reviewId);
  }
}