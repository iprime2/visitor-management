import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, HttpCode, HttpStatus, Query, OnApplicationBootstrap } from '@nestjs/common';
import { CreateVisitorDto } from './dto/create-visitor.dto';
import { VisitorsService } from './visitors.service';
import { CronJobManager } from 'src/managers/cronjob-manager';
import { Public } from 'src/utils/public.decorator';

@Controller('visitors')
export class VisitorsController extends CronJobManager implements OnApplicationBootstrap {
  constructor(
    @Inject(VisitorsService) private readonly visitorService: VisitorsService
  ) {
    super();
  }

  onApplicationBootstrap() {
    this.createCronJob(
      "visitor-status-closed",
      "*/5 * * * *",
      async () => {
        await this.visitorService.updateVisitorStatus();
      }
    )
  }

  // Create a new visitor
  @Post()
  @Public() 
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createVisitorDto: CreateVisitorDto) {
    return await this.visitorService.create(createVisitorDto);
  }

  // Get all visitors
  @Get()
  async findAll() {
    return await this.visitorService.findAll();
  }

  // Get a single visitor by ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.visitorService.findOne(id);
  }
 
  // Get a single visitor by ID
  @Get('/remark/:id')
  async findVisitorRemark(@Param('id') id: string) {
    return await this.visitorService.getVisitorRemark(id);
  }

  // Update remark single visitor by ID
  @Patch('/remark/:id')
  async updateVisitorRemark(@Param('id') id: string,@Body() payload: any) {
    return await this.visitorService.updateVisitorRemark(id, payload);
  }
 
  // close status for visitors
  @Patch('/closeall')
  async closeVisitorStatus(@Body() payload: any) {
    return await this.visitorService.closeVisitorStatus(payload);
  }
  
  // update some close status for visitors
  @Patch('/closesome')
  async closeSomeVisitorStatus(@Body() payload: any) {
    return await this.visitorService.closeSomeVisitorStatus(payload);
  }

  // Get a visitor by date
  @Post('/search')
  async findByDate(@Body() payload: any) {
    return await this.visitorService.findByDate(payload);
  }

  // Update a visitor by ID attendee
  @Patch('/updateattendee/:visitorId')
  async update(
    @Param('visitorId') visitorId: string,
    @Body() payload: any,
  ) {
    return await this.visitorService.updateAttendee(visitorId, payload);
  }

  // Update a visitor by ID
  // @Patch(':id')
  // async update(
  //   @Param('id') id: string,
  //   @Body() updateVisitorDto: UpdateVisitorDto,
  // ) {
  //   return this.visitorService.update(id, updateVisitorDto);
  // }

  // Delete a visitor by ID
  // @Delete(':id')
  // async remove(@Param('id') id: string) {
  //   return this.visitorService.remove(id);
  // }
}
