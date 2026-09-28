'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardSidebar } from './DashboardSidebar';
import { DashboardHeader } from './DashboardHeader';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui';
import { useCreatorStore } from '@/lib/store/creator-store';
import { ContentPlatform, ProjectStatus } from '@/types';

export const DashboardShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const { createProject } = useCreatorStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);

  // New Project Form State
  const [projectName, setProjectName] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [topic, setTopic] = useState('');
  const [platform, setPlatform] = useState<ContentPlatform>('YouTube');
  const [status, setStatus] = useState<ProjectStatus>('Idea');

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectName.trim()) return;

    const newProj = createProject({
      name: projectName,
      videoTitle: videoTitle || projectName,
      topic: topic || 'New creator video',
      platform,
      status,
      publishingDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
    });

    setIsNewProjectModalOpen(false);
    setProjectName('');
    setVideoTitle('');
    setTopic('');
    router.push(`/projects/${newProj.id}`);
  };

  return (
    <div className="min-h-screen bg-[#080B11] text-slate-100 flex flex-col antialiased">
      <DashboardSidebar
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
        onNewProjectModal={() => setIsNewProjectModalOpen(true)}
      />

      {/* Main content shifted right on desktop */}
      <div className="lg:pl-64 flex flex-col flex-1 min-w-0">
        <DashboardHeader
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          onNewProjectModal={() => setIsNewProjectModalOpen(true)}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {children}
        </main>
      </div>

      {/* Global New Project Modal */}
      <Modal
        isOpen={isNewProjectModalOpen}
        onClose={() => setIsNewProjectModalOpen(false)}
        title="Create New Creator Project"
        description="Initialize an end-to-end workspace for script, thumbnail, metadata, and schedule."
        maxWidth="lg"
      >
        <form onSubmit={handleCreateProject} className="space-y-4 mt-2">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Project Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. AI Explained 2026"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Working Video Title
            </label>
            <input
              type="text"
              placeholder="e.g. Why AI Changes Everything in 2026"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Core Topic & Angle
            </label>
            <textarea
              rows={2}
              placeholder="What makes this video unique? Key thesis and takeaway..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Target Platform
              </label>
              <select
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
                value={platform}
                onChange={(e) => setPlatform(e.target.value as ContentPlatform)}
              >
                <option value="YouTube">YouTube (Long-form)</option>
                <option value="TikTok">TikTok / Shorts</option>
                <option value="Instagram">Instagram Reels</option>
                <option value="Podcast">Video Podcast</option>
                <option value="LinkedIn">LinkedIn Video</option>
                <option value="X/Twitter">X / Twitter</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Initial Status
              </label>
              <select
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
                value={status}
                onChange={(e) => setStatus(e.target.value as ProjectStatus)}
              >
                <option value="Idea">Idea</option>
                <option value="Script">Script</option>
                <option value="Recording">Recording</option>
                <option value="Editing">Editing</option>
                <option value="Ready">Ready</option>
                <option value="Scheduled">Scheduled</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsNewProjectModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Initialize Project Workspace
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
