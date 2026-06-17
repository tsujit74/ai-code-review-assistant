'use client';

import { deleteProject } from '@/lib/projects';

type Project = {
  id: string;
  name: string;
  createdAt: string;
};

export function ProjectList({
  projects,
  onChanged,
}: {
  projects: Project[];
  onChanged: () => void;
}) {
  const handleDelete = async (id: string) => {
    await deleteProject(id);
    onChanged();
  };

  return (
    <div className="space-y-3">
      {projects.map((project) => (
        <div key={project.id} className="flex items-center justify-between rounded border p-4">
          <div>
            <h3 className="font-medium">{project.name}</h3>
            <p className="text-sm text-muted-foreground">{project.createdAt}</p>
          </div>
          <button
            onClick={() => handleDelete(project.id)}
            className="rounded border px-3 py-1 text-sm"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}