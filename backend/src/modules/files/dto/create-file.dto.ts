import { IsString, IsNotEmpty } from 'class-validator';

export class CreateFileDto {
  @IsString()
  @IsNotEmpty()
  fileName: string;

  @IsString()
  @IsNotEmpty()
  visitorId: string;

  filePath: string;
}
