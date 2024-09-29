import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';

@Injectable()
export class FeedbackService {
  constructor(private readonly prisma: PrismaService) {}

  // Create a new feedback
  async create(createFeedbackDto: CreateFeedbackDto) {
    const { message, rating, visitorId } = createFeedbackDto;

    // Ensure visitor exists before creating feedback
    const visitorExists = await this.prisma.visitors.findUnique({
      where: { id: visitorId },
    });

    if (!visitorExists) {
      throw new NotFoundException('Visitor not found');
    }

    return this.prisma.feedback.create({
      data: {
        message,
        rating,
        visitorId,
      },
    });
  }

  // Get all feedbacks
  async findAll() {
    return this.prisma.feedback.findMany({
      include: {
        visitor: true,  // Optionally include visitor details
      },
    });
  }

  // Get a single feedback by ID
  async findOne(id: string) {
    const feedback = await this.prisma.feedback.findUnique({
      where: { id },
      include: {
        visitor: true,
      },
    });

    if (!feedback) {
      throw new NotFoundException('Feedback not found');
    }

    return feedback;
  }

  // Update a feedback by ID
  async update(id: string, updateFeedbackDto: UpdateFeedbackDto) {
    const feedback = await this.prisma.feedback.findUnique({
      where: { id },
    });

    if (!feedback) {
      throw new NotFoundException('Feedback not found');
    }

    return this.prisma.feedback.update({
      where: { id },
      data: updateFeedbackDto,
    });
  }

  // Delete a feedback by ID
  async remove(id: string) {
    const feedback = await this.prisma.feedback.findUnique({
      where: { id },
    });

    if (!feedback) {
      throw new NotFoundException('Feedback not found');
    }

    return this.prisma.feedback.delete({
      where: { id },
    });
  }
}
