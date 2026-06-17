import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
const AdmZip = require('adm-zip');
import * as fs from 'fs';
import * as path from 'path';
import { Prisma } from '@prisma/client';

@Injectable()
export class FilesService {
  constructor(private readonly prisma: PrismaService) {}

  async uploadZip(userId: string, projectId: string, file: Express.Multer.File) {
    const project = await this.prisma.project.findFirst({
      where: { id: projectId, userId },
    });

    if (!project) throw new NotFoundException('Project not found');

    if (!file) throw new BadRequestException('ZIP file is required');

    const zip = new AdmZip(file.path);
    const entries = zip.getEntries();

    const filesToCreate: Prisma.FileCreateManyInput[] = [];

    for (const entry of entries) {
      if (entry.isDirectory) continue;

      const content = entry.getData().toString('utf8');
      const normalizedPath = entry.entryName.replace(/\\/g, '/');
      const fileName = path.basename(normalizedPath);
      const language = this.detectLanguage(fileName);

      filesToCreate.push({
        projectId,
        path: normalizedPath,
        name: fileName,
        content,
        language,
      });
    }

    await this.prisma.file.createMany({
      data: filesToCreate,
    });

    fs.unlinkSync(file.path);

    return {
      message: 'Files uploaded successfully',
      count: filesToCreate.length,
    };
  }

  async findByProject(userId: string, projectId: string) {
    const project = await this.prisma.project.findFirst({
      where: { id: projectId, userId },
    });

    if (!project) throw new NotFoundException('Project not found');

    return this.prisma.file.findMany({
      where: { projectId },
      orderBy: { path: 'asc' },
    });
  }

  async findOne(userId: string, projectId: string, fileId: string) {
    const project = await this.prisma.project.findFirst({
      where: { id: projectId, userId },
    });

    if (!project) throw new NotFoundException('Project not found');

    const file = await this.prisma.file.findFirst({
      where: { id: fileId, projectId },
    });

    if (!file) throw new NotFoundException('File not found');

    return file;
  }

  private detectLanguage(fileName: string): string {
    const ext = path.extname(fileName).toLowerCase();

    const map: Record<string, string> = {
      '.ts': 'TypeScript',
      '.tsx': 'TSX',
      '.js': 'JavaScript',
      '.jsx': 'JSX',
      '.json': 'JSON',
      '.css': 'CSS',
      '.html': 'HTML',
      '.md': 'Markdown',
      '.prisma': 'Prisma',
      '.sql': 'SQL',
    };

    return map[ext] || 'PlainText';
  }
}