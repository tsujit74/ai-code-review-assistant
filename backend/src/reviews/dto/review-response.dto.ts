export class ReviewIssueDto {
  file: string;
  line: number;
  message: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO';
}

export class ReviewRecommendationDto {
  file?: string;
  message: string;
  priority?: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO';
}

export class ReviewResponseDto {
  id: string;
  projectId: string;
  userId: string;
  type: string;
  summary: string;
  issues: ReviewIssueDto[];
  recommendations: ReviewRecommendationDto[];
  severity: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}