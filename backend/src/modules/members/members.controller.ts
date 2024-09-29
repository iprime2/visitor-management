import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { MemberService } from './members.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage, excelFileFilter } from '../../common/file-upload.config';

@Controller('members')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { storage, fileFilter: excelFileFilter }))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      return { status: 400, message: 'No file uploaded!' };
    }

    const filePath = file.path;
    return this.memberService.createMembersFromExcel(filePath);
  } 

  // Create a new member
  @Post()
  async create(@Body() createMemberDto: CreateMemberDto) {
    return this.memberService.create(createMemberDto);
  }

  // Get all members
  @Get()
  async findAll() {
    return this.memberService.findAll();
  }

  // Get a single member by ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.memberService.findOne(id);
  }

  // Update a member by ID
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMemberDto: UpdateMemberDto,
  ) {
    return this.memberService.update(id, updateMemberDto);
  }

  // Delete a member by ID
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.memberService.remove(id);
  }

   // DELETE /members/delete-all
   @Delete('delete-all')
   async deleteAllMembers() {
     try {
       await this.memberService.deleteAllMembers();
       return { message: 'All member data has been deleted successfully' };
     } catch (error) {
       return { status: 500, message: 'Internal error: Could not delete members' };
     }
   }
}
