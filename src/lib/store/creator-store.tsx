'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Project, ContentCalendarItem, CreatorProfile, ContentPlatform, ProjectStatus } from '@/types';
import { getAiStatus } from '@/lib/ai/config';

interface CreatorStoreContextType {
  projects: Project[];
  calendarItems: ContentCalendarItem[];
  profile: CreatorProfile;
  aiStatus: ReturnType<typeof getAiStatus>;
  getProject: (id: string) => Project | undefined;
  createProject: (data: Partial<Project>) => Project;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  duplicateProject: (id: string) => Project;
  addCalendarItem: (item: Omit<ContentCalendarItem, 'id'>) => ContentCalendarItem;
  updateCalendarItem: (id: string, updates: Partial<ContentCalendarItem>) => void;
  deleteCalendarItem: (id: string) => void;
  updateProfile: (updates: Partial<CreatorProfile>) => void;
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  toast: { message: string; type: string } | null;
}

const DEFAULT_PROFILE: CreatorProfile = {
  id: 'usr-1',
  name: 'Alex Rivera',
  email: 'alex@creatorai.studio',
  channelName: 'Alex Rivera Tech & AI',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  niche: 'Technology & AI Workflows',
  subscriberCount: '184,000',
  plan: 'pro',
};

const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    name: 'AI Explained 2026',
    videoTitle: 'AI Explained: Why 2026 Changes Everything (No More Grinding)',
    topic: 'Future of Artificial Intelligence in Video & Creative Workflows',
    description: 'A comprehensive documentary-style breakdown examining how multi-agent AI and autonomous creative pipelines are replacing traditional video production friction.',
    targetAudience: 'Content creators, video editors, tech founders, and digital strategists',
    platform: 'YouTube',
    status: 'Ready',
    publishingDate: '2026-10-02',
    thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    createdAt: '2026-09-18T10:00:00Z',
    updatedAt: '2026-09-24T14:30:00Z',
    script: {
      hook: "If you're still spending 12 hours editing a single video in 2026, you're not competing on a level playing field.",
      introduction: "Today we are analyzing the massive shift happening in the creator economy: why autonomous workspaces are outperforming 10-person production agencies.",
      sections: [
        { id: 's1', name: 'The Death of the 40-Hour Edit', durationEst: '2m 30s', content: 'Breakdown of tool fragmentation. Creators used to tab between 6 disparate tools.', visualCue: '[Cinematic desk b-roll, glowing displays]' },
        { id: 's2', name: 'The 3-Second Retention Secret', durationEst: '3m 15s', content: 'Visual contracts between 16:9 thumbnail promises and the opening 15 seconds.', visualCue: '[Split screen comparison]' },
        { id: 's3', name: 'Building Your Autonomous Pipeline', durationEst: '3m 00s', content: 'Step-by-step setup of CreatorAI Studio script-to-metadata workflow.', visualCue: '[Studio dashboard demo screen]' }
      ],
      transitions: ['Now here is the counter-intuitive metric...', 'Before we unveil the exact setup...'],
      cta: 'Subscribe if you want to stay ahead of the next wave of creative tools.',
      outro: 'Download the free script checklist in the description below.',
      targetDuration: '9 mins',
      tone: 'Cinematic',
      language: 'English',
      targetAudience: 'Tech & Video Creators',
      wordCount: 1140
    },
    metadata: {
      titleVariations: [
        { id: 'tv-1', title: 'AI Explained: Why 2026 Changes Everything', score: 96, ctrPrediction: '11.4% CTR', characterCount: 45 },
        { id: 'tv-2', title: 'I Automated My Entire YouTube Studio with AI', score: 92, ctrPrediction: '10.1% CTR', characterCount: 47 },
      ],
      selectedTitle: 'AI Explained: Why 2026 Changes Everything',
      description: 'The 2026 creator playbook is here. Stop switching between 10 apps to script, summarize transcripts, and render thumbnails.',
      tags: ['ai 2026', 'creator ai studio', 'youtube strategy', 'video automation', 'ai workflow'],
      keywords: ['AI Video Workflow', 'Automated Content Creation', 'YouTube Growth 2026'],
      hashtags: ['#AI2026', '#ContentCreator', '#CreatorAI', '#YouTubeGrowth'],
      chapters: ['00:00 Intro', '02:30 The Big Shift', '05:45 Retention Formula', '08:15 Autonomous Pipeline'],
      pinnedComment: 'What is your single biggest bottleneck right now? Drop it below!'
    }
  },
  {
    id: 'proj-2',
    name: 'Habits That Stick',
    videoTitle: 'How to Build Better Habits (The Scientific Framework That Actually Works)',
    topic: 'Neuroscience of Habit Formation & Creator Routine Design',
    description: 'Exploring the psychology of friction reduction and automaticity for creators and entrepreneurs struggling with consistency.',
    targetAudience: 'Productivity seekers, students, and creative freelancers',
    platform: 'YouTube',
    status: 'Scheduled',
    publishingDate: '2026-09-28',
    createdAt: '2026-09-15T09:00:00Z',
    updatedAt: '2026-09-23T11:20:00Z',
  },
  {
    id: 'proj-3',
    name: 'Future of YouTube Algorithm',
    videoTitle: 'The Future of YouTube: What the 2026 Algorithm Wants From You',
    topic: 'Deep dive into APV (Average Percentage Viewed) and Session Time Metrics',
    description: 'Breaking down algorithm patents, viewer satisfaction signals, and how thumbnail visual clarity impacts browse feature impressions.',
    targetAudience: 'YouTubers and digital marketing managers',
    platform: 'YouTube',
    status: 'In Progress',
    publishingDate: '2026-10-06',
    createdAt: '2026-09-20T16:00:00Z',
    updatedAt: '2026-09-24T09:15:00Z',
  },
  {
    id: 'proj-4',
    name: 'AI Tools for Students',
    videoTitle: 'Top 7 AI Tools Every Student Needs to Know in 2026',
    topic: 'Student Research, Video Note-Taking, and Knowledge Compression',
    description: 'Curated list of ethical, high-leverage AI applications for students, researchers, and self-directed learners.',
    targetAudience: 'College students, high schoolers, and lifelong learners',
    platform: 'TikTok',
    status: 'Published',
    publishingDate: '2026-09-21',
    createdAt: '2026-09-10T12:00:00Z',
    updatedAt: '2026-09-21T18:00:00Z',
  },
  {
    id: 'proj-5',
    name: 'Cinematic B-Roll Secrets',
    videoTitle: 'Cinematic B-Roll Secrets: How to Make Boring Videos Look Like Movies',
    topic: 'Lighting, Focal Lengths, and Sound Design for Creator Studios',
    description: 'Practical studio lighting guide using three simple lights and dynamic lens choices to elevate visual production.',
    targetAudience: 'Videographers and content creators',
    platform: 'YouTube',
    status: 'Draft',
    publishingDate: '2026-10-12',
    createdAt: '2026-09-22T14:00:00Z',
    updatedAt: '2026-09-24T13:45:00Z',
  },
  {
    id: 'proj-6',
    name: 'How Creators Can Use AI',
    videoTitle: 'How Creators Can Actually Use AI Without Losing Their Voice',
    topic: 'Authenticity vs AI Efficiency in Modern Storytelling',
    description: 'A candid conversation about preserving personal perspective while leveraging AI for repetitive administrative tasks.',
    targetAudience: 'Solo creators, vloggers, and essayists',
    platform: 'Podcast',
    status: 'Editing',
    publishingDate: '2026-10-04',
    createdAt: '2026-09-19T08:30:00Z',
    updatedAt: '2026-09-24T12:00:00Z',
  }
];

const INITIAL_CALENDAR: ContentCalendarItem[] = [
  { id: 'cal-1', title: 'Top 7 AI Tools Every Student Needs', platform: 'TikTok', publishingDate: '2026-09-21', status: 'Published', description: 'Short-form tips highlighting prompt hacks.' },
  { id: 'cal-2', title: 'How to Build Better Habits', platform: 'YouTube', publishingDate: '2026-09-28', status: 'Scheduled', description: 'Full breakdown of atomic routines and morning setup.' },
  { id: 'cal-3', title: 'AI Explained: Why 2026 Changes Everything', platform: 'YouTube', publishingDate: '2026-10-02', status: 'Ready', description: 'Hero video release with full thumbnail A/B testing.' },
  { id: 'cal-4', title: 'How Creators Can Actually Use AI', platform: 'Podcast', publishingDate: '2026-10-04', status: 'Editing', description: 'Audio podcast + video companion cut.' },
  { id: 'cal-5', title: 'The Future of YouTube Algorithm', platform: 'YouTube', publishingDate: '2026-10-06', status: 'Script', description: 'Retention curves analysis & data presentation.' },
  { id: 'cal-6', title: 'Cinematic B-Roll Secrets', platform: 'YouTube', publishingDate: '2026-10-12', status: 'Idea', description: 'Studio lighting tour and budget alternatives.' },
  { id: 'cal-7', title: '3 Productivity Prompts for 2026', platform: 'LinkedIn', publishingDate: '2026-09-30', status: 'Scheduled', description: 'Carousel breakdown for creative agency owners.' },
  { id: 'cal-8', title: 'Behind the Scenes of CreatorAI Studio', platform: 'Instagram', publishingDate: '2026-10-08', status: 'Ready', description: 'Reels video walkthrough of the 16:9 thumbnail generator.' },
];

const CreatorStoreContext = createContext<CreatorStoreContextType | undefined>(undefined);

export const CreatorStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [calendarItems, setCalendarItems] = useState<ContentCalendarItem[]>(INITIAL_CALENDAR);
  const [profile, setProfile] = useState<CreatorProfile>(DEFAULT_PROFILE);
  const [toast, setToast] = useState<{ message: string; type: string } | null>(null);
  const [aiStatus] = useState(getAiStatus());

  // Load from localStorage if present
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedProjects = localStorage.getItem('creatorai_projects');
        const savedCal = localStorage.getItem('creatorai_calendar');
        const savedProfile = localStorage.getItem('creatorai_profile');
        if (savedProjects) setProjects(JSON.parse(savedProjects));
        if (savedCal) setCalendarItems(JSON.parse(savedCal));
        if (savedProfile) setProfile(JSON.parse(savedProfile));
      } catch (e) {
        console.error('Error hydrating creator store:', e);
      }
    }
  }, []);

  // Sync to localStorage
  const saveProjects = (newProjects: Project[]) => {
    setProjects(newProjects);
    if (typeof window !== 'undefined') {
      localStorage.setItem('creatorai_projects', JSON.stringify(newProjects));
    }
  };

  const saveCalendar = (newItems: ContentCalendarItem[]) => {
    setCalendarItems(newItems);
    if (typeof window !== 'undefined') {
      localStorage.setItem('creatorai_calendar', JSON.stringify(newItems));
    }
  };

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const getProject = (id: string) => {
    return projects.find((p) => p.id === id);
  };

  const createProject = (data: Partial<Project>): Project => {
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      name: data.name || 'Untitled Project',
      videoTitle: data.videoTitle || data.name || 'Untitled Video Title',
      topic: data.topic || 'General Topic',
      description: data.description || 'New project created in CreatorAI Studio',
      targetAudience: data.targetAudience || 'Modern creators',
      platform: data.platform || 'YouTube',
      status: (data.status as ProjectStatus) || 'Idea',
      publishingDate: data.publishingDate || new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      thumbnailUrl: data.thumbnailUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      script: data.script,
      transcript: data.transcript,
      prompts: data.prompts,
      thumbnail: data.thumbnail,
      metadata: data.metadata,
    };
    const updated = [newProj, ...projects];
    saveProjects(updated);
    showToast(`Project "${newProj.name}" created successfully!`, 'success');
    return newProj;
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    const updated = projects.map((p) => {
      if (p.id === id) {
        return {
          ...p,
          ...updates,
          updatedAt: new Date().toISOString(),
        };
      }
      return p;
    });
    saveProjects(updated);
    showToast('Changes saved to project', 'success');
  };

  const deleteProject = (id: string) => {
    const filtered = projects.filter((p) => p.id !== id);
    saveProjects(filtered);
    showToast('Project removed', 'info');
  };

  const duplicateProject = (id: string): Project => {
    const orig = projects.find((p) => p.id === id);
    if (!orig) throw new Error('Project not found');
    const cloned: Project = {
      ...orig,
      id: `proj-${Date.now()}`,
      name: `${orig.name} (Copy)`,
      videoTitle: `${orig.videoTitle} (Copy)`,
      status: 'Idea',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    saveProjects([cloned, ...projects]);
    showToast(`Duplicated as "${cloned.name}"`, 'success');
    return cloned;
  };

  const addCalendarItem = (item: Omit<ContentCalendarItem, 'id'>): ContentCalendarItem => {
    const newItem: ContentCalendarItem = {
      ...item,
      id: `cal-${Date.now()}`,
    };
    saveCalendar([newItem, ...calendarItems]);
    showToast('Scheduled to content calendar', 'success');
    return newItem;
  };

  const updateCalendarItem = (id: string, updates: Partial<ContentCalendarItem>) => {
    const updated = calendarItems.map((c) => (c.id === id ? { ...c, ...updates } : c));
    saveCalendar(updated);
    showToast('Calendar item updated', 'success');
  };

  const deleteCalendarItem = (id: string) => {
    saveCalendar(calendarItems.filter((c) => c.id !== id));
    showToast('Removed from calendar', 'info');
  };

  const updateProfile = (updates: Partial<CreatorProfile>) => {
    const updated = { ...profile, ...updates };
    setProfile(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('creatorai_profile', JSON.stringify(updated));
    }
    showToast('Profile updated', 'success');
  };

  return (
    <CreatorStoreContext.Provider
      value={{
        projects,
        calendarItems,
        profile,
        aiStatus,
        getProject,
        createProject,
        updateProject,
        deleteProject,
        duplicateProject,
        addCalendarItem,
        updateCalendarItem,
        deleteCalendarItem,
        updateProfile,
        showToast,
        toast,
      }}
    >
      {children}
      {/* Toast Notification Container */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900/95 border border-purple-500/30 text-white shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-pulse" />
          <span className="text-sm font-medium text-slate-200">{toast.message}</span>
        </div>
      )}
    </CreatorStoreContext.Provider>
  );
};

export const useCreatorStore = () => {
  const context = useContext(CreatorStoreContext);
  if (!context) {
    throw new Error('useCreatorStore must be used within a CreatorStoreProvider');
  }
  return context;
};
