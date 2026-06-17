import { IsNotEmpty, IsString } from 'class-validator';

export class CreateChatSessionDto {
  @IsString()
  @IsNotEmpty()
  projectId: string;
}