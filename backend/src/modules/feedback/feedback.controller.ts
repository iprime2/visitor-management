import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';

@Controller('feedbacks')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  // Create new feedback
  @Post()
  async create(@Body() createFeedbackDto: CreateFeedbackDto) {
    return this.feedbackService.create(createFeedbackDto);
  }

  // Get all feedback
  @Get()
  async findAll() {
    return this.feedbackService.findAll();
  }

  // Get a single feedback by ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.feedbackService.findOne(id);
  }

  // Update a feedback by ID
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateFeedbackDto: UpdateFeedbackDto,
  ) {
    return this.feedbackService.update(id, updateFeedbackDto);
  }

  // Delete a feedback by ID
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.feedbackService.remove(id);
  }
}
