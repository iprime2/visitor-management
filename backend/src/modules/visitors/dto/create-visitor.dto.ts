import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsDateString } from 'class-validator';

export class CreateVisitorDto {
  @IsString()
  @IsNotEmpty()
  visitorName: string;

  @IsString()
  @IsOptional()
  visitorPrn?: string;

  @IsString()
  @IsNotEmpty()
  mobile: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  attendedBy: string;

  @IsString()
  attendeeId: string;

  @IsString()
  query: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsBoolean()
  @IsOptional()
  in?: boolean;

  @IsBoolean()
  @IsOptional()
  out?: boolean;

  @IsDateString()
  @IsOptional()
  inTime?: Date;

  @IsDateString()
  @IsOptional()
  outTime?: Date;
}
