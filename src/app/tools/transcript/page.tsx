'use client';

import React, { useState } from 'react';
import {
  FileAudio,
  Sparkles,
  Upload,
  Copy,
  Download,
  Bookmark,
  Check,
  Clock,
  Key,
  Layers,
  ListOrdered,
  FileText,
} from 'lucide-react';
import { Button, Badge } from '@/components/ui';
import { CopyButton } from '@/components/ui/copy-button';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { summarizeTranscript, SAMPLE_TRANSCRIPT_DEMO } from '@/lib/ai/transcript';
import { useCreatorStore } from '@/lib/store/creator-store';
import { TranscriptData } from '@/types';

export default function TranscriptSummarizerPage() {
  const { showToast } = useCreatorStore();

  const [rawText, setRawText] = useState(SAMPLE_TRANSCRIPT_DEMO);
  const [summaryType, setSummaryType] = useState<'quick' | 'standard' | 'detailed'>('standard');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<TranscriptData | null>(null);

  const handleSummarize = async () => {
    if (!rawText.trim()) {
      showToast('Please paste or upload a transcript first!', 'warning');
      return;
    }
    setIsGenerating(true);
    try {
      const data = await summarizeTranscript({
        rawText,
        summaryType,
      });
      setResult(data);
      showToast('Transcript summarized with chapters!', 'success');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        if (text) {
          setRawText(text);
          showToast(`Loaded ${file.name}`, 'info');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleExportTxt = () => {
    if (!result) return;
    const textContent = `TRANSCRIPT ANALYSIS - CREATORAI STUDIO\n\nSUMMARY:\n${result.summary}\n\nKEY CHAPTERS:\n${result.chapters
      .map((c) => `${c.timecode} - ${c.title}`)
      .join('\n')}\n\nACTION ITEMS:\n${result.actionItems.join('\n')}\n\nVIDEO DESCRIPTION:\n${result.videoDescription}`;
    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `creatorai-transcript-chapters-${Date.now()}.txt`;
    a.click();
    showToast('Exported chapters TXT!', 'success');
  };

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <FileAudio className="w-5 h-5" />
            </span>
            Transcript Summarizer &amp; Chapter Studio
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Transform raw spoken transcripts into organized YouTube chapters, highlight moments, and actionable edits.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT: Input & Controls */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-white">
                Transcript Input
              </span>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setRawText(SAMPLE_TRANSCRIPT_DEMO)}
                  className="text-[11px] h-7 px-2"
                >
                  Load Demo
                </Button>
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept=".txt,.vtt,.srt"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-purple-400 hover:text-purple-300">
                    <Upload className="w-3 h-3" /> Upload TXT
                  </span>
                </label>
              </div>
            </div>

            <div>
              <textarea
                rows={12}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3.5 text-xs text-slate-300 font-mono leading-relaxed focus:outline-none focus:border-emerald-500"
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                placeholder="Paste video transcript, meeting notes, or podcast recording transcript..."
              />
            </div>

            {/* Summary Type Controls */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Summary Level
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['quick', 'standard', 'detailed'] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setSummaryType(mode)}
                    className={`py-2 rounded-xl text-xs font-bold capitalize transition ${
                      summaryType === mode
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            <Button
              variant="glow"
              size="md"
              className="w-full justify-center py-3 font-bold"
              onClick={handleSummarize}
              disabled={isGenerating}
            >
              <Sparkles className="w-4 h-4" />
              <span>{isGenerating ? 'Analyzing Timestamps...' : 'Generate Chapters & Summary'}</span>
            </Button>
          </div>

          {/* RIGHT: Output Organized Cards */}
          <div className="lg:col-span-7 space-y-4">
            {/* Top Toolbar */}
            {result && (
              <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-900 border border-slate-800 rounded-2xl">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400" />
                  Chapters &amp; Summary Ready
                </span>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" onClick={handleExportTxt}>
                    <Download className="w-3.5 h-3.5" />
                    <span>Export TXT</span>
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => showToast('Saved to project vault!', 'success')}
                  >
                    <Bookmark className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Save</span>
                  </Button>
                </div>
              </div>
            )}

            {result ? (
              <div className="space-y-4">
                {/* 1. Summary Card */}
                <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                      <Layers className="w-4 h-4" />
                      Executive Summary
                    </span>
                    <CopyButton textToCopy={result.summary} size="sm" />
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{result.summary}</p>
                </div>

                {/* 2. YouTube Timestamps & Chapters */}
                <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      YouTube Timestamps &amp; Chapters
                    </span>
                    <CopyButton
                      textToCopy={result.chapters.map((c) => `${c.timecode} ${c.title}`).join('\n')}
                      size="sm"
                      label="Copy Chapters"
                    />
                  </div>
                  <div className="space-y-2">
                    {result.chapters.map((chap, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 font-mono font-bold">
                            {chap.timecode}
                          </span>
                          <span className="font-semibold text-white">{chap.title}</span>
                        </div>
                        <span className="text-[11px] text-slate-400 hidden sm:inline">{chap.summary}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Key Points & Action Items */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                      <ListOrdered className="w-4 h-4" />
                      Key Insights
                    </span>
                    <ul className="space-y-2 text-xs text-slate-300">
                      {result.keyPoints.map((kp, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-blue-400 font-bold">•</span>
                          <span>{kp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                      <Check className="w-4 h-4" />
                      Action Items
                    </span>
                    <ul className="space-y-2 text-xs text-slate-300">
                      {result.actionItems.map((ai, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-amber-400 font-bold">✓</span>
                          <span>{ai}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* 4. Description ready to paste */}
                <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      Ready-to-Paste YouTube Description
                    </span>
                    <CopyButton textToCopy={result.videoDescription} size="sm" />
                  </div>
                  <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-300 font-mono whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
                    {result.videoDescription}
                  </pre>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center rounded-3xl bg-slate-900/40 border border-dashed border-slate-800 space-y-3">
                <FileAudio className="w-10 h-10 text-slate-600 mx-auto" />
                <h3 className="text-base font-bold text-white">Transcript output will appear here</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Click &quot;Generate Chapters &amp; Summary&quot; to test autonomous chapter creation.
                </p>
                <Button size="sm" variant="primary" onClick={handleSummarize}>
                  Run Demo Summary
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
