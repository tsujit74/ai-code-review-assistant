import { IsBoolean, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateAiProviderDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsString()
  @IsNotEmpty()
  baseUrl: string;

  @IsString()
  @IsNotEmpty()
  apiKey: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  modelName: string;

  @IsBoolean()
  isActive: boolean;
}