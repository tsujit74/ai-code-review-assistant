import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../database/prisma.service';
import * as AdmZip from 'adm-zip';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FilesService {
  constructor(private readonly prisma: PrismaService) {}

  // -------------------------
  // UPLOAD ZIP
  // -------------------------
  async uploadZip(userId: string, projectId: string, file: Express.Multer.File) {
    const project = await this.prisma.project.findFirst({
      where: { id: projectId, userId },
    });

    if (!project) throw new NotFoundException('Project not found');
    if (!file) throw new BadRequestException('ZIP file is required');

    const zip = new AdmZip(file.path);
    const entries = zip.getEntries();

    const filesToCreate: any[] = [];

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

    if (filesToCreate.length > 0) {
      await this.prisma.file.createMany({
        data: filesToCreate,
      });
    }

    fs.unlinkSync(file.path);

    return {
      message: 'Files uploaded successfully',
      count: filesToCreate.length,
    };
  }

  // -------------------------
  // GET FILES BY PROJECT
  // -------------------------
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

  // -------------------------
  // GET SINGLE FILE
  // -------------------------
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

  // -------------------------
  // FILE TREE
  // -------------------------
  async getTree(userId: string, projectId: string) {
    const files = await this.findByProject(userId, projectId);

    const root: any[] = [];
    const map = new Map<string, any>();

    for (const file of files) {
      const parts = file.path.split('/').filter(Boolean);
      let currentPath = '';

      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];

        currentPath = currentPath
          ? `${currentPath}/${part}`
          : part;

        if (!map.has(currentPath)) {
          const node = {
            name: part,
            path: currentPath,
            type: i === parts.length - 1 ? 'file' : 'folder',
            children: [],
            fileId: i === parts.length - 1 ? file.id : undefined,
          };

          map.set(currentPath, node);

          if (i === 0) {
            root.push(node);
          } else {
            const parentPath = currentPath
              .split('/')
              .slice(0, -1)
              .join('/');

            const parent = map.get(parentPath);
            if (parent) parent.children.push(node);
          }
        }
      }
    }

    return root;
  }

  // -------------------------
  // LANGUAGE DETECTION
  // -------------------------
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