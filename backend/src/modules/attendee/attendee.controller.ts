import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AttendeeService } from './attendee.service';
import { CreateAttendeeDto } from './dto/create-attendee.dto';
import { UpdateAttendeeDto } from './dto/update-attendee.dto';
import { JwtAuthGuard } from 'src/utils/jwt-auth.guard';

@Controller('attendees')
@UseGuards(JwtAuthGuard)
export class AttendeeController {
  constructor(private readonly attendeeService: AttendeeService) {}

  // Create a new attendee
  @Post()
  async create(@Body() createAttendeeDto: CreateAttendeeDto) {
    return this.attendeeService.create(createAttendeeDto);
  }

  // Get all attendees
  @Get()
  async findAll() {
    return this.attendeeService.findAll();
  }

  // Get a single attendee by ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.attendeeService.findOne(id);
  }

  // Update an attendee by ID
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAttendeeDto: UpdateAttendeeDto,
  ) {
    return this.attendeeService.update(id, updateAttendeeDto);
  }

  // Delete an attendee by ID
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.attendeeService.remove(id);
  }
}
