import { IsNotEmpty, IsString } from 'class-validator';

export class CreateVisitorByNameDto {
  @IsNotEmpty()
  @IsString()
  visitorName: string;

  @IsNotEmpty()
  @IsString()
  mobile: string;

  @IsNotEmpty()
  @IsString()
  attendedBy: string;

  @IsNotEmpty()
  @IsString()
  query: string;
}
