'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchProjects } from '@/lib/projects';
import { auth } from '@/lib/auth';
import { CreateProjectForm } from '@/components/projects/create-project-form';
import { ProjectList } from '@/components/projects/project-list';
import { FileUploadForm } from '@/components/files/file-upload-form';
import { fetchFileTree, fetchFileById } from '@/lib/files';
import { FileTree } from '@/components/files/file-tree';
import { FilePreview } from '@/components/files/file-preview';

export default function ProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [tree, setTree] = useState([]);
  const [selectedFile, setSelectedFile] = useState<any>(null);

  const loadProjects = async () => {
    const data = await fetchProjects();
    setProjects(data);
    if (!selectedProject && data.length > 0) setSelectedProject(data[0]);
  };

  const loadTree = async (projectId: string) => {
    const data = await fetchFileTree(projectId);
    setTree(data);
  };

  const handleSelectFile = async (fileId: string) => {
    if (!selectedProject) return;
    const data = await fetchFileById(selectedProject.id, fileId);
    setSelectedFile(data);
  };

  useEffect(() => {
    if (!auth.isAuthenticated()) {
      router.push('/auth/login');
      return;
    }
    loadProjects();
  }, [router]);

  useEffect(() => {
    if (selectedProject) {
      loadTree(selectedProject.id);
    }
  }, [selectedProject]);

  return (
    <main className="mx-auto max-w-6xl space-y-6 p-6">
      <h1 className="text-2xl font-bold">Projects</h1>

      <CreateProjectForm onCreated={loadProjects} />
      <ProjectList projects={projects as any} onChanged={loadProjects} />

      {selectedProject && (
        <div className="space-y-6">
          <FileUploadForm
            projectId={selectedProject.id}
            onUploaded={() => loadTree(selectedProject.id)}
          />
          <div className="grid gap-6 md:grid-cols-2">
            <FileTree nodes={tree as any} onSelectFile={handleSelectFile} />
            <FilePreview file={selectedFile} />
          </div>
        </div>
      )}
    </main>
  );
}