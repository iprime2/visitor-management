import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import * as XLSX from 'xlsx';

@Injectable()
export class MemberService {
  constructor(private readonly prisma: PrismaService) {}

  // Create a new member
  async create(createMemberDto: CreateMemberDto) {
    return this.prisma.members.create({
      data: createMemberDto,
    });
  }

  // Get all members
  async findAll() {
    return this.prisma.members.findMany();
  }

  // Get a single member by ID
  async findOne(id: string) {
    const member = await this.prisma.members.findUnique({
      where: { id },
    });

    if (!member) {
      throw new NotFoundException('Member not found');
    }

    return member;
  }

  // Update a member by ID
  async update(id: string, updateMemberDto: UpdateMemberDto) {
    const member = await this.prisma.members.findUnique({
      where: { id },
    });

    if (!member) {
      throw new NotFoundException('Member not found');
    }

    return this.prisma.members.update({
      where: { id },
      data: updateMemberDto,
    });
  }

  // Delete a member by ID
  async remove(id: string) {
    const member = await this.prisma.members.findUnique({
      where: { id },
    });

    if (!member) {
      throw new NotFoundException('Member not found');
    }

    return this.prisma.members.delete({
      where: { id },
    });
  }

  // Method to process Excel file and create members
  async createMembersFromExcel(filePath: string) {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0]; // Assuming we are working with the first sheet
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    const members = jsonData.map((row: any) => {
      return {
        name: row['name'],
        prn: `${row['prn']}`,
        mobile: `${row['mobile']}`,
        type: row['type'],
      };
    });

    // Insert members into database
    await this.prisma.members.createMany({
      data: members,
      skipDuplicates: true, // This ensures it won't fail for duplicate PRNs
    });

    return { message: 'Members created successfully!' };
  }

  // Delete all members from the database
  async deleteAllMembers() {
    try {
      return await this.prisma.members.deleteMany(); // This deletes all member records
    } catch (error) {
      console.log('Error deleting all members:', error);
      throw new Error('Failed to delete all members');
    }
  }
}
