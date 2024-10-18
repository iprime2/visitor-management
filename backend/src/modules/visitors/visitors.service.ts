import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVisitorDto } from './dto/create-visitor.dto';

@Injectable()
export class VisitorsService {
  constructor(private readonly prisma: PrismaService) {}

  // Create a new visitor
  async create(createVisitorDto: CreateVisitorDto) {
    const { visitorPrn, visitorName, mobile, attendeeId, query } = createVisitorDto;

    const attendee = await this.prisma.attendee.findUnique({where:{id:attendeeId}});

    // if(!attendee){
    //   throw new BadRequestException("Attendee doesn't exists");
    // }

    // Check if the visitor is already checked in using PRN
    if (visitorPrn) {
      const member = await this.prisma.members.findFirst({
        where:{
          prn:visitorPrn
        }
      });

      if(!member){
        throw new BadRequestException("PRN doesn't exists");
      }

      

      return await this.prisma.visitors.create({
        data: {
          visitorPrn,
          dataId: member.id,
          visitorName: member.name,
          mobile: member.mobile,
          type: member.type,
          attendedBy: attendee?.name  || "NAN",
          attendeeId: attendeeId || null,
          query,
          status: 'open',
          remark: '',
          out: false,
          outTime: null,
        },
      });       
    }

    if(visitorName){
      return await this.prisma.visitors.create({
        data: {
          visitorName,
          mobile: mobile || '',
          type: 'visitor',
          attendedBy: attendee?.name || "NAN",
          attendeeId: attendeeId || null,
          query,
          status: 'open',
          remark: '',
          out: false,
          outTime: null,
        },
      });  
    }
  }

  // find by date
  async findByDate(payload: any){
    return await this.prisma.visitors.findMany({
      where:{
        inTime: {
          gte: payload.fromDate,
          lte: payload.toDate,
        },
        ...(payload.visitorType !== 'all' && { type: payload.visitorType }),
        ...(payload.statusType !== 'all' && { status: payload.statusType }),
      },
      orderBy:{
        inTime: "desc"
      }
    })
  }

  // update visitor attendee
  async updateAttendee(visitorId: string, payload: any){
    const attendee = await this.prisma.attendee.findFirst({ where: {name:payload.name}});

    if(!attendee){
      throw new BadRequestException("Attendee doesn't exists");
    }

    return await this.prisma.visitors.update({
        where: {id: visitorId},
        data: {
          attendedBy: payload.name,
          attendeeId: attendee?.id,
        }
      }
    )
  }

  // get visitor remarks
  async getVisitorRemark(id: string){
    return await this.prisma.visitors.findUnique({
      where: {id},
      select: {
        remark: true,
      }
    })
  }

  // get visitor remarks
  async updateVisitorRemark(id: string, payload: any){
    await this.prisma.visitors.update({
      where: {id},
      data: {
        remark: payload.remark,
      }
    });

    return ("Visitor Remark Updated!");
  }

  // update status to close for visitor with date range
  async closeVisitorStatus(payload: any){
    await this.prisma.visitors.updateMany({
      where:{
        inTime: {
          gte: payload.fromDate,
          lte: payload.toDate,
        },
        status: {
          not: "closed"
        },
      },
      data:{
        status: "closed",
        out: true,
        outTime: new Date(),
      }
    });

    return "Visitors Status Closed";
  }

  // update status to close for some visitor
  async closeSomeVisitorStatus(payload: any){
    await this.prisma.visitors.updateMany({
      where:{
        inTime: {
          gte: payload.fromDate,
          lte: payload.toDate,
        },
        id: {
          in: payload.closeVisitorIds
        },
        status: {
          not: "closed"
        },
      },
      data:{
        status: "closed",
        out: true,
        outTime: new Date(),
      }
    });

    return "Visitors Status Closed";
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
    if (!id) {
      throw new BadRequestException('Visitor ID is required');
    }

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

  // update visitor status to closed after certain time
  async updateVisitorStatus(){
    await this.prisma.visitors.updateMany({
      where:{
        status : {
          not: "closed"
        }
      },
      data:{
        status: "closed",
        out: true,
        outTime: new Date(),
      }
    })
  }

  // Update a visitor by ID
  // async update(id: string, updateVisitorDto: UpdateVisitorDto) {
  //   if (!id) {
  //     throw new BadRequestException('Visitor ID is required');
  //   }

  //   const visitor = await this.prisma.visitors.findUnique({
  //     where: { id },
  //   });

  //   if (!visitor) {
  //     throw new NotFoundException('Visitor not found');
  //   }

  //   // Validation for updating visitor fields (example: type is required)
  //   if (!updateVisitorDto.type) {
  //     throw new BadRequestException('Visitor type is required.');
  //   }

  //   return this.prisma.visitors.update({
  //     where: { id },
  //     data: updateVisitorDto,
  //   });
  // }

  // Delete a visitor by ID
  // async remove(id: string) {
  //   if (!id) {
  //     throw new BadRequestException('Visitor ID is required');
  //   }

  //   const visitor = await this.prisma.visitors.findUnique({
  //     where: { id },
  //   });

  //   if (!visitor) {
  //     throw new NotFoundException('Visitor not found');
  //   }

  //   return this.prisma.visitors.delete({
  //     where: { id },
  //   });
  // }
}
