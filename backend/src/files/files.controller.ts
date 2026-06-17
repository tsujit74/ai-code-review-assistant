import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { User } from '../common/decorators/user.decorator';
import { FilesService } from './files.service';

@Controller('files')
@UseGuards(JwtAuthGuard)
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload/:projectId')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          cb(null, `${unique}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.endsWith('.zip')) {
          return cb(new Error('Only ZIP files are allowed'), false);
        }
        cb(null, true);
      },
      limits: { fileSize: 100 * 1024 * 1024 },
    }),
  )
  uploadZip(
    @User() user: any,
    @Param('projectId') projectId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.filesService.uploadZip(user.id, projectId, file);
  }

  @Get('project/:projectId')
  findByProject(@User() user: any, @Param('projectId') projectId: string) {
    return this.filesService.findByProject(user.id, projectId);
  }

  @Get(':projectId/:fileId')
  findOne(
    @User() user: any,
    @Param('projectId') projectId: string,
    @Param('fileId') fileId: string,
  ) {
    return this.filesService.findOne(user.id, projectId, fileId);
  }
}