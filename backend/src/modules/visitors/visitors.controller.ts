import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, HttpCode, HttpStatus } from '@nestjs/common';
import { CreateVisitorDto } from './dto/create-visitor.dto';
import { UpdateVisitorDto } from './dto/update-visitor.dto';
import { VisitorsService } from './visitors.service';

@Controller('visitors')
export class VisitorsController {
  constructor(
    @Inject(VisitorsService) private readonly visitorService: VisitorsService
) {}


  // Create a new visitor
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createVisitorDto: CreateVisitorDto) {
    return this.visitorService.create(createVisitorDto);
  }

  // Get all visitors
  @Get()
  async findAll() {
    return this.visitorService.findAll();
  }

  // Get a single visitor by ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.visitorService.findOne(id);
  }

  // Update a visitor by ID
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateVisitorDto: UpdateVisitorDto,
  ) {
    return this.visitorService.update(id, updateVisitorDto);
  }

  // Delete a visitor by ID
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.visitorService.remove(id);
  }
}
