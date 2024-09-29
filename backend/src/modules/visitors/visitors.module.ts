import { Module } from '@nestjs/common';
import { VisitorsService } from './visitors.service';
import { VisitorsController } from './visitors.controller';

@Module({
  providers: [VisitorsService],
  controllers: [VisitorsController]
})
export class VisitorsModule {}
