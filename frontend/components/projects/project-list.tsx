'use client';

import { deleteProject } from '@/lib/projects';
import { useState } from 'react';

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
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    await deleteProject(id);
    onChanged();
  };

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-2 space-y-2">

      {/* Header */}
      <div className="px-2 py-2 border-b border-zinc-800 mb-2">
        <h3 className="text-sm font-semibold text-zinc-200">
          Projects
        </h3>
        <p className="text-xs text-zinc-500">
          Select a workspace
        </p>
      </div>

      {/* List */}
      {projects.map((project) => {
        const isActive = activeId === project.id;

        return (
          <div
            key={project.id}
            onClick={() => setActiveId(project.id)}
            className={`
              flex items-center justify-between
              px-3 py-3 rounded-xl cursor-pointer
              transition border
              ${
                isActive
                  ? 'bg-blue-500/10 border-blue-500/30'
                  : 'border-transparent hover:bg-zinc-900'
              }
            `}
          >
            {/* LEFT */}
            <div>
              <h3 className="text-sm font-medium text-zinc-200">
                {project.name}
              </h3>

              <p className="text-xs text-zinc-500">
                Created {project.createdAt}
              </p>
            </div>

            {/* RIGHT ACTIONS */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(project.id);
              }}
              className="
                text-xs px-2 py-1 rounded-md
                border border-zinc-800
                text-zinc-400 hover:text-red-400 hover:border-red-500/30
                transition
              "
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}