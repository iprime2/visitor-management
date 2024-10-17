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
  @IsOptional()
  // @IsNotEmpty()
  attendeeId?: string;
  
  @IsString()
  @IsOptional()
  // @IsNotEmpty()
  query?: string;
}
