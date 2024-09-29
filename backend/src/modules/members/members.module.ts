import { Module } from '@nestjs/common';
import { MemberService } from './members.service';
import { MemberController } from './members.controller';

@Module({
  providers: [MemberService],
  controllers: [MemberController]
})
export class MemberModule {}
