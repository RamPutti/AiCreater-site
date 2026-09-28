'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Wand2,
  FileText,
  FileAudio,
  Image as ImageIcon,
  Tags,
  Calendar,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Copy,
  Bookmark,
  Check,
} from 'lucide-react';
import { Button, Badge, Card } from '@/components/ui';
import { CopyButton } from '@/components/ui/copy-button';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useCreatorStore } from '@/lib/store/creator-store';

export default function AiToolsPage() {
  const { showToast } = useCreatorStore();

  // Quick state for each interactive tool card
  const [transcriptInput, setTranscriptInput] = useState('In this video, we break down why traditional intro sequences fail and how to double your viewer retention...');
  const [transcriptOutput, setTranscriptOutput] = useState('');
  const [transcriptLoading, setTranscriptLoading] = useState(false);

  const [scriptInput, setScriptInput] = useState('Why AI Changes Everything in 2026');
  const [scriptOutput, setScriptOutput] = useState('');
  const [scriptLoading, setScriptLoading] = useState(false);

  const [promptInput, setPromptInput] = useState('Futuristic creator studio overlooking a cyberpunk metropolis');
  const [promptOutput, setPromptOutput] = useState('');
  const [promptLoading, setPromptLoading] = useState(false);

  const [metadataInput, setMetadataInput] = useState('How Creators Can Actually Use AI');
  const [metadataOutput, setMetadataOutput] = useState('');
  const [metadataLoading, setMetadataLoading] = useState(false);

  const [thumbnailInput, setThumbnailInput] = useState('Stop Editing Like It Is 2020');
  const [thumbnailOutput, setThumbnailOutput] = useState('');
  const [thumbnailLoading, setThumbnailLoading] = useState(false);

  const handleGenTranscript = () => {
    setTranscriptLoading(true);
    setTimeout(() => {
      setTranscriptOutput('SUMMARY: Fast-paced retention framework.\n\nKEY CHAPTERS:\n00:00 - The 3-Second Cliff\n02:40 - The Retention Curve\n06:15 - Soft CTA Placement\n\nACTION ITEM: Eliminate the 15-second animated logo.');
      setTranscriptLoading(false);
      showToast('Transcript summarized!', 'success');
    }, 800);
  };

  const handleGenScript = () => {
    setScriptLoading(true);
    setTimeout(() => {
      setScriptOutput(`HOOK: "If you're still spending 12 hours editing a single video, you're working against yourself."\n\nINTRO (15s): Today we break down how top solo creators produce 3x the output with zero team.\n\nPACING: Fast cuts every 4 seconds with B-roll audio risers.`);
      setScriptLoading(false);
      showToast('Script generated!', 'success');
    }, 800);
  };

  const handleGenPrompt = () => {
    setPromptLoading(true);
    setTimeout(() => {
      setPromptOutput(`Hyper-realistic cinematic photo of ${promptInput}, shot on Hasselblad H6D-100c, 85mm prime lens f/1.4, dual volumetric rim lighting in electric purple and cobalt cyan, soft atmospheric haze, 8K resolution --ar 16:9 --v 6.1 --style raw`);
      setPromptLoading(false);
      showToast('Prompt crafted!', 'success');
    }, 800);
  };

  const handleGenMetadata = () => {
    setMetadataLoading(true);
    setTimeout(() => {
      setMetadataOutput(`TITLE 1 (96 Score): I Replaced My Entire Content Team with AI (Here's What Happened)\nTITLE 2 (91 Score): The 2026 Creator Blueprint\n\nTAGS: #CreatorAI #YouTubeGrowth #ContentWorkflow\n\nPINNED COMMENT: Which part of your process takes the longest? Drop it below!`);
      setMetadataLoading(false);
      showToast('Metadata generated!', 'success');
    }, 800);
  };

  const handleGenThumbnail = () => {
    setThumbnailLoading(true);
    setTimeout(() => {
      setThumbnailOutput(`CONCEPT: High-Contrast Split Visual\nHEADLINE: "${thumbnailInput.toUpperCase()}"\nBADGE: 🔥 2026 METHOD\nCONTRAST SCORE: 94% (Very High)\nSAFE ZONE: Clean right quadrant for YouTube timestamp`);
      setThumbnailLoading(false);
      showToast('Thumbnail concept generated!', 'success');
    }, 800);
  };

  const tools = [
    {
      id: 'thumbnail',
      name: '5. AI Thumbnail Generator',
      badge: 'Main WOW Feature',
      desc: 'Formulate 4 high-contrast 16:9 thumbnail concepts with bold typography and mobile legibility scores.',
      icon: ImageIcon,
      input: thumbnailInput,
      setInput: setThumbnailInput,
      output: thumbnailOutput,
      loading: thumbnailLoading,
      onGenerate: handleGenThumbnail,
      fullHref: '/tools/thumbnail',
    },
    {
      id: 'script',
      name: '2. AI Script Generator',
      badge: '7 Tone Modes',
      desc: 'Formulate retention-optimized hooks, introductions, pacing transitions, and CTAs.',
      icon: FileText,
      input: scriptInput,
      setInput: setScriptInput,
      output: scriptOutput,
      loading: scriptLoading,
      onGenerate: handleGenScript,
      fullHref: '/tools/script',
    },
    {
      id: 'transcript',
      name: '1. Transcript Summarizer',
      badge: 'Instant Chapters',
      desc: 'Extract key moments, auto-generate timestamps, and formulate YouTube descriptions from raw transcripts.',
      icon: FileAudio,
      input: transcriptInput,
      setInput: setTranscriptInput,
      output: transcriptOutput,
      loading: transcriptLoading,
      onGenerate: handleGenTranscript,
      fullHref: '/tools/transcript',
    },
    {
      id: 'prompt',
      name: '3. Image Prompt Generator',
      badge: 'Midjourney & Flux',
      desc: 'Architect hyper-detailed visual prompts with camera angles, 85mm prime lens specs, and volumetric lighting.',
      icon: Wand2,
      input: promptInput,
      setInput: setPromptInput,
      output: promptOutput,
      loading: promptLoading,
      onGenerate: handleGenPrompt,
      fullHref: '/tools/prompt',
    },
    {
      id: 'metadata',
      name: '4. Metadata Generator',
      badge: 'CTR Predictor',
      desc: 'Predict high-CTR YouTube titles, SEO tags, hashtags, and engagement pinned comments.',
      icon: Tags,
      input: metadataInput,
      setInput: setMetadataInput,
      output: metadataOutput,
      loading: metadataLoading,
      onGenerate: handleGenMetadata,
      fullHref: '/tools/metadata',
    },
    {
      id: 'calendar',
      name: '6. Content Planner',
      badge: 'Multi-Platform',
      desc: 'Manage and coordinate publishing dates across YouTube, TikTok, Reels, LinkedIn, and Podcasts.',
      icon: Calendar,
      input: 'Content Release Cadence: 2 YouTube long-form + 4 Shorts weekly',
      setInput: () => {},
      output: 'CONTENT PIPELINE ACTIVE:\n• Sep 28: How to Build Better Habits (YouTube)\n• Oct 02: AI Explained 2026 (YouTube)\n• Oct 04: The Retention Secret (Shorts)\n\nCalendar view available in full workspace.',
      loading: false,
      onGenerate: () => showToast('Calendar synced!', 'info'),
      fullHref: '/calendar',
    },
  ];

  return (
    <div className="min-h-screen bg-[#080B11] text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <Badge variant="purple">Creator AI Engine Hub</Badge>
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
            Specialized AI Tools for Every Step
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Test any of the 6 core engines below with live autonomous generation, copy outputs, or launch into the full dedicated studio workspace.
          </p>
        </div>

        {/* 6 Tool Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.id}
                className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-5 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{tool.name}</h3>
                        <p className="text-xs text-slate-400">{tool.desc}</p>
                      </div>
                    </div>
                    <Badge variant="purple">{tool.badge}</Badge>
                  </div>

                  {/* Input Area */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                      Input Prompt / Topic:
                    </label>
                    <textarea
                      rows={2}
                      className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none focus:border-purple-500"
                      value={tool.input}
                      onChange={(e) => tool.setInput(e.target.value)}
                    />
                  </div>

                  {/* Generate / Action Button */}
                  <div className="flex items-center justify-between gap-3">
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={tool.onGenerate}
                      disabled={tool.loading}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{tool.loading ? 'Generating with AI...' : 'Generate with AI'}</span>
                    </Button>

                    <Link href={tool.fullHref}>
                      <span className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1">
                        Open Full Workspace <ArrowRight className="w-3 h-3" />
                      </span>
                    </Link>
                  </div>

                  {/* Output Area */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                      AI Studio Output:
                    </label>
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300 font-mono min-h-[90px] whitespace-pre-line leading-relaxed">
                      {tool.loading ? (
                        <span className="text-purple-400 animate-pulse">Running autonomous neural engine...</span>
                      ) : tool.output ? (
                        tool.output
                      ) : (
                        <span className="text-slate-600">Click &quot;Generate with AI&quot; to test this tool instantly.</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions: Copy, Save, Regenerate */}
                {tool.output && (
                  <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                    <CopyButton textToCopy={tool.output} size="sm" />
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => showToast('Saved to your project vault!', 'success')}
                      >
                        <Bookmark className="w-3.5 h-3.5 text-purple-400" />
                        <span>Save</span>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={tool.onGenerate}
                        title="Regenerate with another angle"
                      >
                        <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
                        <span>Regenerate</span>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
