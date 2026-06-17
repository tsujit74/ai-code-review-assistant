import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum ReviewType {
  SECURITY = 'SECURITY',
  PERFORMANCE = 'PERFORMANCE',
  CODE_QUALITY = 'CODE_QUALITY',
}

export class CreateReviewDto {
  @IsString()
  @IsNotEmpty()
  projectId: string;

  @IsEnum(ReviewType)
  type: ReviewType;
}