import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateFeedbackDto {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsString()
  @IsNotEmpty()
  rating: string;

  @IsUUID()
  visitorId: string;
}
