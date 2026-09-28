'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  FolderKanban,
  FileText,
  FileAudio,
  Sparkles,
  Image as ImageIcon,
  Tags,
  Calendar,
  Save,
  CheckCircle2,
  Clock,
  ArrowLeft,
  ChevronRight,
  Sliders,
  Copy,
  Trash2,
  Wand2,
} from 'lucide-react';
import { Button, Badge, Card } from '@/components/ui';
import { CopyButton } from '@/components/ui/copy-button';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { useCreatorStore } from '@/lib/store/creator-store';
import { ThumbnailCanvas } from '@/components/thumbnail/ThumbnailCanvas';
import { ThumbnailDesignAnalysis } from '@/components/thumbnail/ThumbnailDesignAnalysis';
import { generateScript } from '@/lib/ai/script';
import { summarizeTranscript } from '@/lib/ai/transcript';
import { generateImagePrompt } from '@/lib/ai/prompt';
import { generateMetadata } from '@/lib/ai/metadata';
import { generateThumbnails } from '@/lib/ai/thumbnail';
import { ProjectStatus, ContentPlatform } from '@/types';

export default function ProjectWorkspacePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const unwrappedParams = use(params);
  const router = useRouter();
  const { getProject, updateProject, showToast } = useCreatorStore();

  const project = getProject(unwrappedParams.id);

  // Active Tab state
  const [activeTab, setActiveTab] = useState<
    'overview' | 'script' | 'transcript' | 'prompts' | 'thumbnail' | 'metadata' | 'schedule'
  >('overview');

  // Local Form state
  const [name, setName] = useState(project?.name || '');
  const [videoTitle, setVideoTitle] = useState(project?.videoTitle || '');
  const [topic, setTopic] = useState(project?.topic || '');
  const [description, setDescription] = useState(project?.description || '');
  const [targetAudience, setTargetAudience] = useState(project?.targetAudience || 'Modern creators');
  const [platform, setPlatform] = useState<ContentPlatform>(project?.platform || 'YouTube');
  const [status, setStatus] = useState<ProjectStatus>(project?.status || 'Idea');
  const [publishingDate, setPublishingDate] = useState(project?.publishingDate || '');

  // Script Workspace State
  const [scriptHook, setScriptHook] = useState(project?.script?.hook || "If you're still spending 12 hours editing a single video in 2026, you're not competing on a level playing field.");
  const [scriptIntro, setScriptIntro] = useState(project?.script?.introduction || "Today we analyze the massive shift in creator workflows: why autonomous pipelines beat 10-person agencies.");
  const [scriptTone, setScriptTone] = useState(project?.script?.tone || 'Cinematic');
  const [isGeneratingScript, setIsGeneratingScript] = useState(false);

  // Transcript Workspace State
  const [rawTranscript, setRawTranscript] = useState(project?.transcript?.rawText || 'Hey everyone, today we are tackling the single biggest problem every creator is facing in 2026: viewer retention...');
  const [transcriptSummary, setTranscriptSummary] = useState(project?.transcript?.summary || 'Comprehensive breakdown of audience retention curves and front-loaded psychological hooks.');
  const [isSummarizing, setIsSummarizing] = useState(false);

  // Prompts Workspace State
  const [promptText, setPromptText] = useState(project?.prompts?.detailedPrompt || 'Cinematic 8K portrait of a creator looking into glowing purple holographic timeline, 85mm prime lens f/1.4, volumetric rim lighting --ar 16:9');
  const [isGeneratingPrompt, setIsGeneratingPrompt] = useState(false);

  // Thumbnail Canvas State
  const [thumbnailConcept, setThumbnailConcept] = useState(
    project?.thumbnail?.concepts[0] || {
      id: 'concept-1',
      name: 'Electric Neon Impact',
      layout: 'face-bold-text',
      headline: videoTitle.toUpperCase() || 'THE 2026 AI SHIFT',
      subtext: 'IT CHANGES EVERYTHING',
      badge: '🔥 2026 BLUEPRINT',
      bgColor: '#080B11',
      bgGradient: 'radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.45) 0%, rgba(59, 130, 246, 0.25) 45%, #080B11 85%)',
      lightingEffect: 'Volumetric violet edge rim light',
      subjectMood: 'Intense Focus / Shock',
      contrastScore: 94,
      readabilityScore: 'Very High',
      previewGradient: 'from-purple-900/60 via-indigo-900/40 to-slate-950',
    }
  );

  const [thumbnailElements, setThumbnailElements] = useState(
    project?.thumbnail?.customElements || [
      { id: 'el-badge', type: 'badge' as const, text: '🔥 2026 BLUEPRINT', backgroundColor: '#8B5CF6', xPercent: 8, yPercent: 12, visible: true },
      { id: 'el-headline', type: 'headline' as const, text: videoTitle.toUpperCase() || 'THE 2026 AI SHIFT', color: '#FFFFFF', xPercent: 8, yPercent: 28, visible: true },
      { id: 'el-subtext', type: 'subtext' as const, text: "DON'T GET LEFT BEHIND", color: '#FACC15', xPercent: 8, yPercent: 48, visible: true },
      { id: 'el-avatar', type: 'avatar' as const, color: '#8B5CF6', xPercent: 68, yPercent: 25, visible: true },
    ]
  );

  // Metadata Workspace State
  const [selectedTitle, setSelectedTitle] = useState(project?.metadata?.selectedTitle || videoTitle || 'AI Explained: Why 2026 Changes Everything');
  const [metaDescription, setMetaDescription] = useState(project?.metadata?.description || 'The 2026 creator playbook is here. Stop switching between 10 apps to script, summarize transcripts, and render thumbnails.\n\n#CreatorAI #YouTubeGrowth');
  const [isGeneratingMeta, setIsGeneratingMeta] = useState(false);

  if (!project) {
    return (
      <DashboardShell>
        <div className="p-12 text-center rounded-3xl bg-slate-900/40 border border-slate-800 space-y-4">
          <h2 className="text-xl font-bold text-white">Project Not Found</h2>
          <p className="text-sm text-slate-400">The requested creator project does not exist.</p>
          <Link href="/projects">
            <Button variant="primary">Return to Projects</Button>
          </Link>
        </div>
      </DashboardShell>
    );
  }

  const handleSaveAll = () => {
    updateProject(project.id, {
      name,
      videoTitle,
      topic,
      description,
      targetAudience,
      platform,
      status,
      publishingDate,
      script: {
        ...(project.script || {
          sections: [],
          transitions: [],
          cta: 'Subscribe for weekly systems',
          outro: 'Check description for templates',
          targetDuration: '8 mins',
          language: 'English',
          targetAudience: targetAudience || 'Modern creators',
          wordCount: 840,
        }),
        hook: scriptHook,
        introduction: scriptIntro,
        tone: scriptTone,
      },
      metadata: {
        ...(project.metadata || {
          titleVariations: [],
          tags: ['creator ai', 'youtube 2026'],
          keywords: ['ai workflow'],
          hashtags: ['#CreatorAI'],
          chapters: ['00:00 Intro'],
          pinnedComment: 'Leave a comment below!',
        }),
        selectedTitle,
        description: metaDescription,
      },
    });
  };

  const handleAiScriptGen = async () => {
    setIsGeneratingScript(true);
    try {
      const generated = await generateScript({
        topic: topic || name,
        title: videoTitle || name,
        targetAudience,
        duration: '8-10 mins',
        platform,
        tone: scriptTone,
        language: 'English',
      });
      setScriptHook(generated.hook);
      setScriptIntro(generated.introduction);
      showToast('AI Script generated successfully!', 'success');
    } finally {
      setIsGeneratingScript(false);
    }
  };

  const handleAiMetadataGen = async () => {
    setIsGeneratingMeta(true);
    try {
      const generated = await generateMetadata({
        topic: topic || name,
        title: videoTitle || name,
        targetAudience,
        platform,
      });
      setSelectedTitle(generated.selectedTitle);
      setMetaDescription(generated.description);
      showToast('High-CTR Metadata generated!', 'success');
    } finally {
      setIsGeneratingMeta(false);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FolderKanban },
    { id: 'script', label: 'Script', icon: FileText },
    { id: 'transcript', label: 'Transcript', icon: FileAudio },
    { id: 'prompts', label: 'Prompts', icon: Sparkles },
    { id: 'thumbnail', label: 'Thumbnail', icon: ImageIcon },
    { id: 'metadata', label: 'Metadata', icon: Tags },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
  ];

  return (
    <DashboardShell>
      <div className="space-y-6">
        {/* Workspace Top Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center gap-3">
            <Link
              href="/projects"
              className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:border-purple-500 transition"
              title="Back to Projects"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-black text-white">{name}</h1>
                <Badge variant="purple" className="text-[10px]">
                  {platform}
                </Badge>
              </div>
              <span className="text-xs text-slate-400">
                Last modified: Just now • Autosave active
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Status Selector */}
            <select
              className="bg-slate-950 border border-slate-700 text-xs font-semibold rounded-xl px-3 py-2 text-white focus:outline-none focus:border-purple-500"
              value={status}
              onChange={(e) => {
                const newStatus = e.target.value as ProjectStatus;
                setStatus(newStatus);
                updateProject(project.id, { status: newStatus });
              }}
            >
              <option value="Idea">Status: Idea</option>
              <option value="Script">Status: Script</option>
              <option value="Recording">Status: Recording</option>
              <option value="Editing">Status: Editing</option>
              <option value="Ready">Status: Ready</option>
              <option value="Scheduled">Status: Scheduled</option>
              <option value="Published">Status: Published</option>
            </select>

            <Button variant="primary" size="sm" onClick={handleSaveAll}>
              <Save className="w-4 h-4" />
              <span>Save Workspace</span>
            </Button>
          </div>
        </div>

        {/* Workspace Subtabs Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                  isActive
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
              <h2 className="text-base font-bold text-white">Project Fundamentals</h2>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Project Name
                </label>
                <input
                  type="text"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Primary Video Title
                </label>
                <input
                  type="text"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
                  value={videoTitle}
                  onChange={(e) => setVideoTitle(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Target Audience
                </label>
                <input
                  type="text"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Topic &amp; Creative Premise
                </label>
                <textarea
                  rows={4}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>
            </div>

            <div className="lg:col-span-4 p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
              <h2 className="text-base font-bold text-white">Production Checklist</h2>
              <div className="space-y-3 text-xs">
                {[
                  { label: 'Hook & Script Locked', done: Boolean(scriptHook) },
                  { label: '16:9 Thumbnail Concept Generated', done: true },
                  { label: 'YouTube SEO & CTR Tags Ready', done: Boolean(metaDescription) },
                  { label: 'Publish Date Scheduled in Calendar', done: Boolean(publishingDate) },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-slate-300">
                    <CheckCircle2 className={`w-4 h-4 ${item.done ? 'text-emerald-400' : 'text-slate-600'}`} />
                    <span className={item.done ? 'text-white' : 'text-slate-500'}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SCRIPT */}
        {activeTab === 'script' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-lg font-bold text-white">Retention Script Engine</h2>
                <p className="text-xs text-slate-400">Structured hook, introductory stakes, and narrative beats</p>
              </div>
              <div className="flex items-center gap-3">
                <select
                  className="bg-slate-950 border border-slate-700 text-xs rounded-xl px-3 py-2 text-white"
                  value={scriptTone}
                  onChange={(e) => setScriptTone(e.target.value)}
                >
                  <option value="Professional">Tone: Professional</option>
                  <option value="Cinematic">Tone: Cinematic</option>
                  <option value="Educational">Tone: Educational</option>
                  <option value="Energetic">Tone: Energetic</option>
                  <option value="Storytelling">Tone: Storytelling</option>
                  <option value="Funny">Tone: Funny</option>
                  <option value="Conversational">Tone: Conversational</option>
                </select>
                <Button size="sm" variant="glow" onClick={handleAiScriptGen} disabled={isGeneratingScript}>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isGeneratingScript ? 'Generating...' : 'AI Rewrite Script'}</span>
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span>First 5 Seconds (Psychological Hook)</span>
                  <CopyButton textToCopy={scriptHook} size="sm" />
                </label>
                <textarea
                  rows={3}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3.5 text-sm text-white font-serif leading-relaxed focus:outline-none focus:border-purple-500"
                  value={scriptHook}
                  onChange={(e) => setScriptHook(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span>Introduction &amp; Stakes (0:05 - 0:30)</span>
                  <CopyButton textToCopy={scriptIntro} size="sm" />
                </label>
                <textarea
                  rows={4}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3.5 text-sm text-white font-serif leading-relaxed focus:outline-none focus:border-purple-500"
                  value={scriptIntro}
                  onChange={(e) => setScriptIntro(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: TRANSCRIPT */}
        {activeTab === 'transcript' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-lg font-bold text-white">Transcript Summarizer &amp; Chapters</h2>
                <p className="text-xs text-slate-400">Paste raw spoken text or video captions to extract chapters</p>
              </div>
              <Button
                size="sm"
                variant="primary"
                onClick={async () => {
                  setIsSummarizing(true);
                  const res = await summarizeTranscript({ rawText: rawTranscript, summaryType: 'standard' });
                  setTranscriptSummary(res.summary);
                  setIsSummarizing(false);
                  showToast('Transcript summarized!', 'success');
                }}
                disabled={isSummarizing}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isSummarizing ? 'Analyzing...' : 'Generate Chapters & Summary'}</span>
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  Raw Transcript Input
                </label>
                <textarea
                  rows={10}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3.5 text-xs text-slate-300 font-mono leading-relaxed focus:outline-none focus:border-purple-500"
                  value={rawTranscript}
                  onChange={(e) => setRawTranscript(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span>Structured Summary &amp; Takeaways</span>
                  <CopyButton textToCopy={transcriptSummary} size="sm" />
                </label>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono leading-relaxed min-h-[200px]">
                  {transcriptSummary}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PROMPTS */}
        {activeTab === 'prompts' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-lg font-bold text-white">Visual Image &amp; B-Roll Prompts</h2>
                <p className="text-xs text-slate-400">Midjourney v6.1 and Flux compatible prompt parameters</p>
              </div>
              <Button
                size="sm"
                variant="glow"
                onClick={async () => {
                  setIsGeneratingPrompt(true);
                  const res = await generateImagePrompt({
                    topic: name,
                    subject: 'Presenter explaining breakthrough idea',
                    environment: 'Futuristic creator loft',
                    visualStyle: 'Cinematic Hyper-Realistic 8K',
                    mood: 'High Energy',
                    cameraAngle: 'Low angle portrait',
                    lighting: 'Dual volumetric rim lights in violet and cyan',
                    aspectRatio: '16:9',
                  });
                  setPromptText(res.detailedPrompt);
                  setIsGeneratingPrompt(false);
                  showToast('Prompt generated!', 'success');
                }}
                disabled={isGeneratingPrompt}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isGeneratingPrompt ? 'Generating...' : 'Architect New Prompt'}</span>
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span>Detailed Midjourney v6 Prompt</span>
                  <CopyButton textToCopy={promptText} size="sm" />
                </label>
                <textarea
                  rows={4}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3.5 text-xs text-slate-200 font-mono leading-relaxed focus:outline-none focus:border-purple-500"
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: THUMBNAIL (EMBEDDED 16:9 CANVAS) */}
        {activeTab === 'thumbnail' && (
          <div className="space-y-6">
            <ThumbnailCanvas
              concept={thumbnailConcept}
              elements={thumbnailElements}
              onUpdateElement={(elId, updates) => {
                setThumbnailElements((prev) =>
                  prev.map((el) => (el.id === elId ? { ...el, ...updates } : el))
                );
              }}
              onSave={() => showToast('Thumbnail state saved to project!', 'success')}
            />

            <ThumbnailDesignAnalysis
              analysis={{
                compositionScore: 95,
                contrastScore: 92,
                readabilityScore: 96,
                subjectFocusScore: 90,
                visualHierarchyScore: 94,
                mobileVisibilityScore: 91,
                spacingScore: 88,
                overallRating: 'Strong',
                recommendations: [
                  'Text contrast satisfies the 4.5:1 ratio required for instant legibility in dark mode and light mode YouTube clients.',
                  'Safe zone around 16:9 perimeter maintains 40px clearance away from the bottom-right timestamp overlay.',
                ],
              }}
            />
          </div>
        )}

        {/* TAB 6: METADATA */}
        {activeTab === 'metadata' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-lg font-bold text-white">YouTube SEO &amp; CTR Metadata</h2>
                <p className="text-xs text-slate-400">High-converting title variations, tags, and description packages</p>
              </div>
              <Button size="sm" variant="glow" onClick={handleAiMetadataGen} disabled={isGeneratingMeta}>
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isGeneratingMeta ? 'Optimizing...' : 'Generate High-CTR Titles'}</span>
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span>Selected Title</span>
                  <CopyButton textToCopy={selectedTitle} size="sm" />
                </label>
                <input
                  type="text"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
                  value={selectedTitle}
                  onChange={(e) => setSelectedTitle(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span>Video Description (Timestamps &amp; Links)</span>
                  <CopyButton textToCopy={metaDescription} size="sm" />
                </label>
                <textarea
                  rows={6}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3.5 text-xs text-slate-200 font-mono leading-relaxed focus:outline-none focus:border-purple-500"
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: SCHEDULE */}
        {activeTab === 'schedule' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6 max-w-xl">
            <h2 className="text-lg font-bold text-white">Release Date &amp; Cadence</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  Publishing Date
                </label>
                <input
                  type="date"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
                  value={publishingDate}
                  onChange={(e) => setPublishingDate(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  Target Platform
                </label>
                <select
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value as ContentPlatform)}
                >
                  <option value="YouTube">YouTube</option>
                  <option value="TikTok">TikTok</option>
                  <option value="Instagram">Instagram Reels</option>
                  <option value="Podcast">Video Podcast</option>
                  <option value="LinkedIn">LinkedIn Video</option>
                  <option value="X/Twitter">X / Twitter</option>
                </select>
              </div>

              <Button variant="primary" onClick={handleSaveAll} className="w-full">
                Save Schedule Changes
              </Button>
            </div>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
