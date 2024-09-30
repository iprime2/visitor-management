import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, Res } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { diskStorage } from 'multer';
import { join } from 'path';
import * as fs from 'fs/promises'; 
import { Response } from 'express';
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  // Create a new file record
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(@Body() createFileDto: CreateFileDto, @UploadedFile() file: Express.Multer.File) {
    return this.filesService.create(createFileDto, file);
  }

  // Get all files
  @Get()
  async findAll() {
    return this.filesService.findAll();
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: join('uploads'),
        filename: (req, file, cb) => {
          const tempFileName = `temp-${Date.now()}-${file.originalname}`; // Use a temporary name
          cb(null, tempFileName);
        },
      }),
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() createFileDto: CreateFileDto,
  ) {
    try {
      const newFileName = createFileDto.fileName || file.originalname; // Use the filename from DTO or default to original
      const newFilePath = join('uploads', newFileName);

      // Rename the file to the desired name
      await fs.rename(join('uploads', file.filename), newFilePath);

      // Set the new file path in the DTO
      createFileDto.filePath = newFilePath;

      // Save file details in the database
      const savedFile = await this.filesService.saveFileDetails(createFileDto);

      return { message: 'File uploaded and renamed successfully', savedFile };
    } catch (error) {
      console.error('Error saving file details:', error);
      return { message: 'Error uploading file', error };
    }
  }

  @Get('download/:id')
  async downloadFile(@Param('id') id: string, @Res() res: Response) {
    const filePath = await this.filesService.downloadFile(id);
    return res.download(filePath);
  }

  @Get('view/:filename')
  async viewFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = await this.filesService.viewFile(filename);
    return res.sendFile(filePath);
  }

  // Get file for visitors
  @Get('/visitors/:visitorId')
  async findVisitorFile(@Param('visitorId') visitorId: string) {
    return this.filesService.findVisitorFiles(visitorId);
  }

  // Get file by ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.filesService.findOne(id);
  }

  // Update file record
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.filesService.update(id, updateFileDto);
  }

  // Delete file
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.filesService.remove(id);
  }
}
