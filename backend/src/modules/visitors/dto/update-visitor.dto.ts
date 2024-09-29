import { PartialType } from '@nestjs/mapped-types';
import { CreateVisitorDto } from './create-visitor.dto';

export class UpdateVisitorDto extends PartialType(CreateVisitorDto) {}
