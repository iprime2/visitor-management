import { IsString, IsInt } from 'class-validator';

export class CreateAttendeeDto {
  @IsString()
  name: string;

  @IsInt()
  sequence: number;
}
