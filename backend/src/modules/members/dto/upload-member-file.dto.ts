import { IsNotEmpty } from 'class-validator';

export class UploadMemberFileDto {
  @IsNotEmpty()
  file: any;
}
