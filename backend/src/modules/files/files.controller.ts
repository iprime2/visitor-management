import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, Res, InternalServerErrorException } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import * as fs from 'fs/promises'; 
import { Response } from 'express';
import { createReadStream } from 'fs';
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
            // Extract the original file extension using `extname`
            const fileExtension = extname(file.originalname);

            // If the fileName is provided in DTO, use it, otherwise use the original name
            const newFileName = createFileDto.fileName
            ? `${createFileDto.fileName}${fileExtension}` // Append the file extension
            : file.originalname; // Keep the original name if no custom name provided

            const newFilePath = join('uploads', newFileName);

            // Rename the file to the desired name (with the correct extension)
            await fs.rename(join('uploads', file.filename), newFilePath);

            // Set the new file path in the DTO
            createFileDto.filePath = newFilePath;
            createFileDto.fileName = newFileName;

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
        try {
            const { filePath, fileName } = await this.filesService.downloadFile(id);
      
            // Set headers to prompt download
            res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
            res.setHeader('Content-Type', 'application/octet-stream');
      
            // Create a readable stream and pipe it to the response
            const fileStream = createReadStream(filePath);
            fileStream.pipe(res);
        } catch (error) {
            console.error('Error downloading file:', error);
            res.status(404).send({ message: 'File not found' });
        }
    }

    @Get('view/:id')
    async viewFile(@Param('id') id: string, @Res() res: Response) {
        try {
            // Get the file path from the service
            const filePath = await this.filesService.viewFile(id);

            // Send the file if the path exists
            return res.sendFile(filePath, { root: '.' }, (err) => {
                if (err) {
                console.error('Error sending file:', err);
                throw new InternalServerErrorException('Error sending file');
                }
            });
        } catch (error) {
            console.error('Error in viewFile controller:', error);
            throw new InternalServerErrorException('Could not retrieve file');
        }
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
