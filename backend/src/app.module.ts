import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { VisitorsModule } from './modules/visitors/visitors.module';
import { MemberModule } from './modules/members/members.module';
import { AttendeeModule } from './modules/attendee/attendee.module';
import { FeedbackModule } from './modules/feedback/feedback.module';
import { FilesModule } from './modules/files/files.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './utils/jwt-auth.guard';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UserModule, VisitorsModule, MemberModule, AttendeeModule, FeedbackModule, FilesModule, PrismaModule, AuthModule],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
