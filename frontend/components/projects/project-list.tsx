import { deleteProject } from "@/lib/projects";

type Project = {
  id: string;
  name: string;
  createdAt: string;
};

export function ProjectList({
  projects,
  activeId,
  onSelect,
  onChanged,
}: {
  projects: Project[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onChanged: () => void;
}) {
  const handleDelete = async (id: string) => {
    await deleteProject(id);
    onChanged();
  };

  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-2 space-y-2">

      <div className="px-2 py-2 border-b border-zinc-800 mb-2">
        <h3 className="text-sm font-semibold text-zinc-200">Projects</h3>
      </div>

      {projects.map((project) => {
        const isActive = activeId === project.id;

        return (
          <div
            key={project.id}
            onClick={() => onSelect(project.id)}
            className={`
              flex items-center justify-between
              px-3 py-3 rounded-xl cursor-pointer
              border transition
              ${
                isActive
                  ? "bg-blue-500/10 border-blue-500/30"
                  : "border-transparent hover:bg-zinc-900"
              }
            `}
          >
            <div>
              <h3 className="text-sm font-medium text-zinc-200">
                {project.name}
              </h3>
              <p className="text-xs text-zinc-500">
                Created {project.createdAt}
              </p>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(project.id);
              }}
              className="text-xs px-2 py-1 border border-zinc-800 text-zinc-400 hover:text-red-400"
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}