import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVisitorDto } from './dto/create-visitor.dto';
import { UpdateVisitorDto } from './dto/update-visitor.dto';

@Injectable()
export class VisitorsService {
  constructor(private readonly prisma: PrismaService) {}

  // Create a new visitor
  async create(createVisitorDto: CreateVisitorDto) {
    const { visitorName, visitorPrn, mobile, type, attendedBy, attendeeId, query, status, inTime, outTime } = createVisitorDto;

    return this.prisma.visitors.create({
      data: {
        visitorName,
        visitorPrn,
        mobile,
        type,
        attendedBy,
        attendeeId,
        query,
        status: status || 'open',
        inTime,
        outTime,
      },
    });
  }

  // Get all visitors
  async findAll() {
    return this.prisma.visitors.findMany({
      include: {
        attendee: true,
        feedback: true,
        files: true,
      },
    });
  }

  // Get a single visitor by ID
  async findOne(id: string) {
    const visitor = await this.prisma.visitors.findUnique({
      where: { id },
      include: {
        attendee: true,
        feedback: true,
        files: true,
      },
    });

    if (!visitor) {
      throw new NotFoundException('Visitor not found');
    }

    return visitor;
  }

  // Update a visitor by ID
  async update(id: string, updateVisitorDto: UpdateVisitorDto) {
    const visitor = await this.prisma.visitors.findUnique({
      where: { id },
    });

    if (!visitor) {
      throw new NotFoundException('Visitor not found');
    }

    return this.prisma.visitors.update({
      where: { id },
      data: updateVisitorDto,
    });
  }

  // Delete a visitor by ID
  async remove(id: string) {
    const visitor = await this.prisma.visitors.findUnique({
      where: { id },
    });

    if (!visitor) {
      throw new NotFoundException('Visitor not found');
    }

    return this.prisma.visitors.delete({
      where: { id },
    });
  }
}
