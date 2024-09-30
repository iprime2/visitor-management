import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsDateString } from 'class-validator';

export class CreateVisitorDto {
  @IsString()
  @IsOptional()
  visitorName?: string | null;

  @IsString()
  @IsOptional()
  visitorPrn?: string;

  @IsString()
  @IsOptional()
  mobile?: string;

  @IsString()
  @IsNotEmpty()
  attendeeId: string;

  @IsString()
  @IsNotEmpty()
  query: string;
}
