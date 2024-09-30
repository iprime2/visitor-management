import { IsString, IsOptional } from 'class-validator';

export class UpdateFileDto {
  @IsString()
  @IsOptional()
  fileName?: string;

  @IsString()
  @IsOptional()
  visitorId?: string;
}
