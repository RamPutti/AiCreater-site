'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FolderKanban,
  Search,
  Plus,
  Filter,
  Copy,
  Trash2,
  ExternalLink,
  Calendar,
  Sparkles,
  ArrowRight,
  MoreVertical,
} from 'lucide-react';
import { Button, Badge } from '@/components/ui';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { useCreatorStore } from '@/lib/store/creator-store';
import { ProjectStatus } from '@/types';

export default function ProjectsPage() {
  const { projects, duplicateProject, deleteProject } = useCreatorStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  const statuses = ['All', 'Draft', 'In Progress', 'Ready', 'Scheduled', 'Published'];

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.videoTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.topic.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      selectedStatus === 'All'
        ? true
        : selectedStatus === 'Draft'
        ? p.status === 'Idea' || p.status === 'Draft'
        : selectedStatus === 'In Progress'
        ? p.status === 'Script' || p.status === 'Recording' || p.status === 'Editing'
        : p.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardShell>
      <div className="space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
              <FolderKanban className="w-6 h-6 text-purple-400" />
              Creator Project Vault
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Manage all your video scripts, transcripts, 16:9 thumbnails, and SEO packages in one place.
            </p>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search projects by title or topic..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-purple-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                  selectedStatus === status
                    ? 'bg-purple-600 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Table / Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((p) => (
              <div
                key={p.id}
                className="rounded-3xl bg-slate-900/70 border border-slate-800/80 hover:border-purple-500/40 transition-all duration-200 overflow-hidden flex flex-col justify-between group shadow-xl"
              >
                {/* 16:9 Thumbnail Header */}
                <div className="relative aspect-16-9 w-full bg-gradient-to-tr from-purple-950 via-slate-900 to-indigo-950 p-4 flex flex-col justify-between border-b border-slate-800">
                  <div className="flex items-center justify-between z-10">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-black/60 text-purple-300 border border-purple-500/30">
                      {p.platform}
                    </span>
                    <Badge
                      variant={
                        p.status === 'Ready'
                          ? 'emerald'
                          : p.status === 'Scheduled'
                          ? 'blue'
                          : p.status === 'Published'
                          ? 'purple'
                          : 'slate'
                      }
                    >
                      {p.status}
                    </Badge>
                  </div>

                  <div className="z-10">
                    <span className="text-xs font-black text-amber-300 uppercase tracking-wide bg-black/75 px-2 py-0.5 rounded">
                      16:9 Studio Asset
                    </span>
                  </div>

                  {/* Ambient Glow */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/30 rounded-full blur-2xl pointer-events-none" />
                </div>

                {/* Body Content */}
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition line-clamp-2">
                      {p.videoTitle || p.name}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2">{p.description}</p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-800/80 text-[11px] text-slate-400">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-purple-400" />
                        Target: {p.publishingDate || 'Unset'}
                      </span>
                      <span>Updated: 2h ago</span>
                    </div>
                  </div>
                </div>

                {/* Actions Footer */}
                <div className="p-4 bg-slate-950/80 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <Link href={`/projects/${p.id}`} className="flex-1">
                    <Button variant="primary" size="sm" className="w-full">
                      <span>Open Workspace</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => duplicateProject(p.id)}
                    title="Duplicate project"
                    className="p-2"
                  >
                    <Copy className="w-4 h-4 text-slate-400 hover:text-white" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteProject(p.id)}
                    title="Delete project"
                    className="p-2 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4 text-slate-400 hover:text-red-400" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-3xl bg-slate-900/40 border border-slate-800 space-y-3">
            <FolderKanban className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-white">No projects found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              No projects match &quot;{searchTerm}&quot; under &quot;{selectedStatus}&quot;. Try adjusting your search or create a new project.
            </p>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
