import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as fs from 'fs';
import * as path from 'path';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { join } from 'path';
import { existsSync } from 'fs';

@Injectable()
export class FilesService {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  private readonly uploadPath = join('uploads');

  // Create a new file record and save the uploaded file
  async create(createFileDto: CreateFileDto, file: Express.Multer.File) {
    const { fileName, visitorId } = createFileDto;

    // Save file to disk
    const uploadPath = path.join('uploads', fileName);
    fs.writeFileSync(uploadPath, file.buffer);

    // Create the file record in the database
    return this.prisma.files.create({
      data: {
        fileName,
        filePath: uploadPath,
        visitorId,
      },
    });
  }

  async saveFileDetails(payload: CreateFileDto) {
    return await this.prisma.files.create({
      data: {
        fileName: payload.fileName,
        filePath: payload.filePath,
        visitorId: payload.visitorId,
      },
    });
  }

  // Get all files
  async findAll() {
    return this.prisma.files.findMany({
      include: {
        visitors: true,
      },
    });
  }
 
  // Get all files for visitor
  async findVisitorFiles(visitorId: string) {
    return this.prisma.files.findMany({
        where:{
            visitorId
        },
        include: {
            visitors: true,
        },
    });
  }

  // Get file by ID
  async findOne(id: string) {
    const file = await this.prisma.files.findUnique({
      where: { id },
      include: {
        visitors: true,
      },
    });

    if (!file) {
      throw new NotFoundException('File not found');
    }

    return file;
  }

  // Update file record
  async update(id: string, updateFileDto: UpdateFileDto) {
    const file = await this.prisma.files.findUnique({ where: { id } });

    if (!file) {
      throw new NotFoundException('File not found');
    }

    return this.prisma.files.update({
      where: { id },
      data: updateFileDto,
    });
  }

  // Delete file
  async remove(id: string) {
    const file = await this.prisma.files.findUnique({ where: { id } });

    if (!file) {
      throw new NotFoundException('File not found');
    }

    // Delete file from disk
    fs.unlinkSync(file.filePath);

    return this.prisma.files.delete({
      where: { id },
    });
  }

   // Get the full file path
  private getFilePath(filename: string): string {
    return join(this.uploadPath, filename);
  }

  // Handle file download
  async downloadFile(id: string): Promise<any> {
    // Find the file record from the database by ID
    const file = await this.prisma.files.findUnique({
        where: { id },
    });

    if (!file) {
        throw new NotFoundException('File not found');
    }

    // Check if the file path exists on the server
    if (!existsSync(file.filePath)) {
        throw new NotFoundException('File not found on server');
    }

    // Return both the file path and the original file name for downloading
    return { filePath: file.filePath, fileName: file.fileName };
  }

  async viewFile(id: string): Promise<string> {
    try {
      // Find the file record from the database by ID
      const file = await this.prisma.files.findUnique({
        where: { id },
      });

      if (!file) {
        throw new NotFoundException('File not found');
      }

      const filePath = file.filePath;

      // Check if file exists
      if (!existsSync(filePath)) {
        throw new NotFoundException('File not found on disk');
      }

      return filePath;
    } catch (error) {
      console.error('Error in viewFile service:', error);
      throw error;
    }
  }
}
