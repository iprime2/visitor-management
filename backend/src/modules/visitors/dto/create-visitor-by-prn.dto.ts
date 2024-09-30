import { IsNotEmpty, IsString } from 'class-validator';

export class CreateVisitorByPRNDto {
  @IsNotEmpty()
  @IsString()
  visitorPrn: string;

  @IsNotEmpty()
  @IsString()
  attendedBy: string;

  @IsNotEmpty()
  @IsString()
  query: string;
}
