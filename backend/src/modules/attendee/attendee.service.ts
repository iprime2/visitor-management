import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAttendeeDto } from './dto/create-attendee.dto';
import { UpdateAttendeeDto } from './dto/update-attendee.dto';

@Injectable()
export class AttendeeService {
  constructor(private readonly prisma: PrismaService) {}

  // Create a new attendee
  async create(createAttendeeDto: CreateAttendeeDto) {
    const { sequence } = createAttendeeDto;

    // Check if the sequence already exists
    const existingAttendee = await this.prisma.attendee.findUnique({
      where: { sequence },
    });

    if (existingAttendee) {
      throw new ConflictException('Sequence already assigned to another attendee');
    }

    // If not exists, proceed with creation
    return this.prisma.attendee.create({
      data: createAttendeeDto,
    });
  }

  // Get all attendees
  async findAll() {
    return this.prisma.attendee.findMany();
  }

  // Get a single attendee by ID
  async findOne(id: string) {
    const attendee = await this.prisma.attendee.findUnique({
      where: { id },
    });

    if (!attendee) {
      throw new NotFoundException('Attendee not found');
    }

    return attendee;
  }

  // Update an attendee by ID
  async update(id: string, updateAttendeeDto: UpdateAttendeeDto) {
    const { sequence } = updateAttendeeDto;

    // Check if the sequence already exists, and it's not the same as the current attendee's sequence
    const existingAttendee = await this.prisma.attendee.findUnique({
      where: { sequence },
    });

    if (existingAttendee && existingAttendee.id !== id) {
      throw new ConflictException('Sequence already assigned to another attendee');
    }

    // Proceed with updating the attendee
    return this.prisma.attendee.update({
      where: { id },
      data: updateAttendeeDto,
    });
  }

  // Delete an attendee by ID
  async remove(id: string) {
    const attendee = await this.prisma.attendee.findUnique({
      where: { id },
    });

    if (!attendee) {
      throw new NotFoundException('Attendee not found');
    }

    return this.prisma.attendee.delete({
      where: { id },
    });
  }
}
