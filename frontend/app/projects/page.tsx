"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { auth } from "@/lib/auth";
import { fetchProjects } from "@/lib/projects";
import { fetchFileTree, fetchFileById } from "@/lib/files";
import { fetchProjectReviews, fetchReview } from "@/lib/reviews";
import { getAiProviders } from "@/lib/aiprovider";

import { CreateProjectForm } from "@/components/projects/create-project-form";
import { ProjectList } from "@/components/projects/project-list";
import { FileUploadForm } from "@/components/files/file-upload-form";
import { FileExplorer } from "@/components/files/file-tree";
import { FilePreview } from "@/components/files/file-preview";
import { ReviewTrigger } from "@/components/reviews/review-trigger";
import { ReviewHistory } from "@/components/reviews/review-history";
import { ReviewDetails } from "@/components/reviews/review-details";
import { ChatPanel } from "@/components/chat/chat-panel";
import { ReviewCenterModal } from "@/components/reviews/review-center-modal";
import { LogOut, Plus } from "lucide-react";
import { AiProviderSelector } from "@/components/aiproviders/AIProviderSelector";

export default function ProjectsPage() {
  const router = useRouter();

  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const [tree, setTree] = useState([]);
  const [selectedFile, setSelectedFile] = useState<any>(null);

  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState<any>(null);

  const [chatOpen, setChatOpen] = useState(false);

  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  const [loadingProjects, setLoadingProjects] = useState(true);

  const [selectedProvider, setSelectedProvider] = useState<any>(null);
  const [providers, setProviders] = useState<any[]>([]);

  const loadProjects = async () => {
    setLoadingProjects(true);
    try {
      const data = await fetchProjects();
      setProjects(data);

      if (data.length > 0) {
        setSelectedProject(data[0]);
      } else {
        setSelectedProject(null);
      }
    } finally {
      setLoadingProjects(false);
    }
  };

  const loadProviders = async () => {
    const data = await getAiProviders();
    setProviders(data);

    if (!selectedProvider && data.length > 0) {
      setSelectedProvider(data[0]);
    }
  };

  const loadTree = async (projectId: string) => {
    const data = await fetchFileTree(projectId);
    setTree(data);
  };

  const loadReviews = async (projectId: string) => {
    const data = await fetchProjectReviews(projectId);
    setReviews(data);
  };

  const handleSelectFile = async (fileId: string) => {
    if (!selectedProject) return;
    const data = await fetchFileById(selectedProject.id, fileId);
    setSelectedFile(data);
  };

  const handleSelectReview = async (reviewId: string) => {
    const data = await fetchReview(reviewId);
    setSelectedReview(data);
  };

  const handleLogout = () => {
    auth.logout();
    router.replace("/auth/login");
  };

  useEffect(() => {
    if (!auth.isAuthenticated()) {
      router.push("/auth/login");
      return;
    }
    loadProjects();
    loadProviders();
  }, []);

  useEffect(() => {
    if (selectedProject) {
      loadTree(selectedProject.id);
      loadReviews(selectedProject.id);
    }
  }, [selectedProject]);

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 p-4 space-y-4">
      <header className="sticky top-0 z-50 bg-[#18181b] border-b-2 border-zinc-400">
        <div className="flex items-center justify-between px-5 py-3">
          {/* Left */}
          <div className="flex items-center gap-5 min-w-0">
            <div>
              <h1 className="text-sm font-semibold tracking-wide text-zinc-100">
                AI Code Command Center
              </h1>

              <p className="text-[11px] text-zinc-300">
                Project Intelligence Workspace
              </p>
            </div>

            <div className="h-8 w-px bg-zinc-800" />

            <div className="flex items-center gap-2">
              <select
                value={selectedProject?.id || ""}
                onChange={(e) => {
                  const project = projects.find(
                    (p: any) => p.id === e.target.value,
                  );
                  setSelectedProject(project);
                }}
                className="
      min-w-[220px]
      bg-zinc-900
      border border-zinc-400
      px-3 py-2
      text-sm text-zinc-200
      outline-none
      focus:border-zinc-500
    "
              >
                {projects.map((p: any) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>

              <button
                onClick={() => setProjectModalOpen(true)}
                className="
      h-[38px] w-[38px]
      flex items-center justify-center
      border border-zinc-400
      bg-zinc-900
      text-zinc-300
      hover:bg-zinc-800
      hover:border-zinc-600
      transition
    "
                title="Create Project"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Right */}
          <div className="flex justify-center gap-2">
            <button
            onClick={() => setChatOpen(true)}
            className="
        group
        relative
        overflow-hidden
        border border-zinc-400
        bg-zinc-900
        px-4 py-2
        text-sm font-medium
        text-zinc-200
        transition-all
        hover:border-zinc-500
        hover:bg-zinc-800
      "
          >
            <span className="relative z-10 flex items-center gap-2">
              <span className="animate-pulse text-green-200">✦</span> AI
              Assistant
            </span>

            <div
              className="
          absolute inset-0 opacity-0
          bg-gradient-to-r
          from-zinc-800
          via-zinc-700
          to-zinc-800
          transition-opacity
          group-hover:opacity-100
        "
            />
          </button>

          <button
  onClick={handleLogout}
  className="
    h-[38px]
    px-4
    flex items-center gap-2
    border border-red-400
    bg-zinc-900
    text-red-200
    text-sm
    hover:bg-red-800
    hover:border-red-300
    transition-all
  "
>
  <LogOut size={15} />
  Logout
</button>
          </div>
        </div>
      </header>

      {loadingProjects ? (
        <div className="flex items-center justify-center h-[70vh] text-zinc-400">
          Loading projects...
        </div>
      ) : !selectedProject ? (
        <div className="flex flex-col items-center justify-center h-[70vh] text-zinc-400 gap-3">
          <p>No project found</p>
          <button
            onClick={() => setProjectModalOpen(true)}
            className="px-4 py-2 border border-zinc-400 bg-zinc-900"
          >
            + Create First Project
          </button>
        </div>
      ) : (
        <section className="grid grid-cols-12 gap-4 h-[calc(100vh-100px)]">
          <aside className="col-span-3 flex flex-col h-full min-h-0">
            <div className="flex flex-col flex-1 min-h-0  border border-zinc-400 bg-zinc-900/40 overflow-hidden">
              {/* Explorer */}
              <div className="flex-1 min-h-0 overflow-hidden">
                {selectedProject?.id && (
                  <FileExplorer
                    projectId={selectedProject.id}
                    nodes={tree as any}
                    onSelectFile={handleSelectFile}
                    onUploaded={() => loadTree(selectedProject.id)}
                  />
                )}
              </div>
            </div>
          </aside>

          {/* CENTER */}
          <section className="col-span-6 flex flex-col min-h-0">
            <div className="border border-zinc-400 bg-zinc-900/40 flex flex-col flex-1 overflow-hidden">
              <div className="px-4 py-3 border-b border-zinc-400 flex items-center justify-between">
                <h2 className="text-sm font-medium text-zinc-200">
                  Code Preview
                </h2>

                <span className="text-xs text-zinc-400">
                  {selectedFile?.name || "No file selected"}
                </span>
              </div>

              <div className="flex-1 min-h-0">
                <FilePreview file={selectedFile} />
              </div>
            </div>
          </section>

          {/* RIGHT SIDEBAR */}
          <aside className="col-span-3 flex flex-col gap-4">
            {/* KPIs */}
            <div className="grid grid-cols-3 gap-2">
              <div className="border border-zinc-400 bg-zinc-900/40 p-3">
                <div className="text-[12px] text-zinc-300">Files</div>
                <div className="text-lg font-semibold">{tree.length}</div>
              </div>

              <div className="border border-zinc-400 bg-zinc-900/40 p-3">
                <div className="text-[12px] text-zinc-300">Reviews</div>
                <div className="text-lg font-semibold">{reviews.length}</div>
              </div>

              <div className="border border-zinc-400 bg-zinc-900/40 p-3">
                <div className="text-[12px] text-zinc-300">Status</div>
                <div className="text-lg font-semibold text-green-400">
                  Active
                </div>
              </div>
            </div>

            <AiProviderSelector
              providers={providers}
              selected={selectedProvider}
              onChange={setSelectedProvider}
              onCreated={async () => {
                await loadProviders();
              }}
            />

            {/* AI REVIEW */}
            <div className=" border border-zinc-400 bg-zinc-900/40 p-3">
              <ReviewTrigger
                projectId={selectedProject.id}
                provider={selectedProvider}
                onCreated={async () => {
                  await loadReviews(selectedProject.id);
                  setReviewModalOpen(true);
                }}
              />
            </div>

            <button
              onClick={() => setReviewModalOpen(true)}
              className="
    group
    border border-zinc-400
    bg-zinc-900

    px-4 py-2

    flex items-center gap-3

    text-zinc-100
    text-sm font-medium

    hover:bg-zinc-800
    hover:border-zinc-300

    transition-all
  "
            >
              <div className="flex h-7 w-7 items-center justify-center border border-zinc-700 bg-zinc-950">
                🤖
              </div>

              <div className="text-left">
                <div className="leading-none">AI Review Center</div>

                <div className="text-[10px] text-zinc-500 mt-1">
                  Reports & Analysis
                </div>
              </div>
            </button>

            {/* <div className=" border border-zinc-800 bg-zinc-900/40 overflow-hidden h-[220px]">
              <div className="px-4 py-3 border-b border-zinc-800">
                <h2 className="text-sm font-medium text-zinc-200">
                  Review History
                </h2>
              </div>

              <ReviewHistory
                reviews={reviews as any}
                onSelect={handleSelectReview}
              />
            </div>

            <div className=" border border-zinc-800 bg-zinc-900/40 flex-1 overflow-hidden">
              <div className="px-4 py-3 border-b border-zinc-800">
                <h2 className="text-sm font-medium text-zinc-200">AI Report</h2>
              </div>

              <ReviewDetails review={selectedReview} />
            </div> */}
          </aside>
        </section>
      )}

      <ReviewCenterModal
        open={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        reviews={reviews}
        selectedReview={selectedReview}
        onSelectReview={handleSelectReview}
      />

      {chatOpen && (
        <div className="fixed right-0 top-0 h-full w-[820px] bg-zinc-950 border-l border-zinc-800 shadow-2xl z-50 flex flex-col">
          <div className="p-3 border-b border-zinc-400 flex justify-between">
            <span className="text-sm font-medium text-zinc-200">AI Chat</span>
            <button
              onClick={() => setChatOpen(false)}
              className="text-zinc-400 px-3 py-1 border border-zinc-400 bg-zinc-900 hover:bg-zinc-700"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-hidden">
            <ChatPanel
              projectId={selectedProject?.id}
              provider={selectedProvider}
            />
          </div>
        </div>
      )}

      {projectModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setProjectModalOpen(false)}
          />

          {/* Modal */}
          <div
            className="
          relative
          w-full
          max-w-md
          border
          border-zinc-400
          bg-zinc-950
          shadow-2xl
          p-6
        "
          >
            <CreateProjectForm
              onCreated={loadProjects}
              onClose={() => setProjectModalOpen(false)}
            />
          </div>
        </div>
      )}
    </main>
  );
}

function KPI({ label, value }: any) {
  return (
    <div className=" border border-zinc-800 bg-zinc-900/40 p-3">
      <div className="text-xs text-zinc-500">{label}</div>
      <div className="text-lg font-semibold text-zinc-200">{value}</div>
    </div>
  );
}

function Panel({ title, children }: any) {
  return (
    <div className=" border border-zinc-800 bg-zinc-900/40 p-3 space-y-2">
      <div className="text-xs text-zinc-500 border-b border-zinc-800 pb-1">
        {title}
      </div>
      {children}
    </div>
  );
}
