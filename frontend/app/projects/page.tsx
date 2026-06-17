'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchProjects } from '@/lib/projects';
import { auth } from '@/lib/auth';
import { CreateProjectForm } from '@/components/projects/create-project-form';
import { ProjectList } from '@/components/projects/project-list';

export default function ProjectsPage() {
  const router = useRouter();
  const [projects, setProjects] = useState([]);

  const loadProjects = async () => {
    const data = await fetchProjects();
    setProjects(data);
  };

  useEffect(() => {
    if (!auth.isAuthenticated()) {
      router.push('/auth/login');
      return;
    }
    loadProjects();
  }, [router]);

  return (
    <main className="mx-auto max-w-4xl space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Projects</h1>
      </div>

      <CreateProjectForm onCreated={loadProjects} />
      <ProjectList projects={projects as any} onChanged={loadProjects} />
    </main>
  );
}