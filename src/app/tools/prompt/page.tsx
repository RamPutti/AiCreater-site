'use client';

import React, { useState } from 'react';
import {
  Wand2,
  Sparkles,
  Copy,
  RefreshCw,
  Camera,
  Layers,
  Bookmark,
  Check,
  Zap,
  Sliders,
} from 'lucide-react';
import { Button, Badge } from '@/components/ui';
import { CopyButton } from '@/components/ui/copy-button';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { generateImagePrompt } from '@/lib/ai/prompt';
import { useCreatorStore } from '@/lib/store/creator-store';
import { ImagePromptData } from '@/types';

export default function ImagePromptStudioPage() {
  const { showToast } = useCreatorStore();

  const [topic, setTopic] = useState('High-Tech Creator Desk Setup');
  const [subject, setSubject] = useState('Futuristic content creator at holographic editing desk');
  const [environment, setEnvironment] = useState('Cyber-sleek studio loft overlooking a glowing metropolis at dusk');
  const [visualStyle, setVisualStyle] = useState('Cinematic Hyper-Realistic 8K');
  const [mood, setMood] = useState('Inspiring, electric, high-energy');
  const [cameraAngle, setCameraAngle] = useState('Low angle heroic portrait with slight dynamic tilt');
  const [lighting, setLighting] = useState('Volumetric dual rim lighting in neon electric purple and cyan blue');
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16' | '1:1' | '4:5' | '21:9'>('16:9');

  const [isGenerating, setIsGenerating] = useState(false);
  const [promptData, setPromptData] = useState<ImagePromptData | null>(null);

  const handleGenerate = async (isImprove = false) => {
    setIsGenerating(true);
    try {
      const result = await generateImagePrompt({
        topic,
        subject,
        environment,
        visualStyle,
        mood,
        cameraAngle,
        lighting,
        aspectRatio,
        isImproveAction: isImprove,
      });
      setPromptData(result);
      showToast(isImprove ? 'Prompt enhanced with optical details!' : 'Prompt generated!', 'success');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-pink-500/20 text-pink-400 border border-pink-500/30">
              <Wand2 className="w-5 h-5" />
            </span>
            AI Image Prompt Studio
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Formulate camera-calibrated Midjourney v6 and Flux prompts with 85mm prime lens specs and negative filtering.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT: Inputs */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-xl">
            <h2 className="text-xs font-bold uppercase tracking-wider text-white border-b border-slate-800 pb-3">
              Prompt Parameters
            </h2>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Visual Subject *
              </label>
              <textarea
                rows={2}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-pink-500"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Environment / Background
              </label>
              <input
                type="text"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-pink-500"
                value={environment}
                onChange={(e) => setEnvironment(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Visual Style
                </label>
                <select
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-pink-500"
                  value={visualStyle}
                  onChange={(e) => setVisualStyle(e.target.value)}
                >
                  <option value="Cinematic Hyper-Realistic 8K">Cinematic 8K</option>
                  <option value="Unreal Engine 5.4 Render">Unreal Engine 5.4</option>
                  <option value="Editorial Commercial Photo">Commercial Photo</option>
                  <option value="Moody Film Grain 35mm">35mm Film Grain</option>
                  <option value="Cyberpunk Neon Concept Art">Cyberpunk Concept</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Aspect Ratio
                </label>
                <select
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-pink-500"
                  value={aspectRatio}
                  onChange={(e) => setAspectRatio(e.target.value as any)}
                >
                  <option value="16:9">16:9 (YouTube &amp; Desktop)</option>
                  <option value="9:16">9:16 (Shorts &amp; Reels)</option>
                  <option value="1:1">1:1 (Square)</option>
                  <option value="4:5">4:5 (Instagram Portrait)</option>
                  <option value="21:9">21:9 (Anamorphic Ultrawide)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Camera Angle
                </label>
                <input
                  type="text"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white"
                  value={cameraAngle}
                  onChange={(e) => setCameraAngle(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Lighting Style
                </label>
                <input
                  type="text"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white"
                  value={lighting}
                  onChange={(e) => setLighting(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                variant="glow"
                size="md"
                className="flex-1 justify-center py-3 font-bold"
                onClick={() => handleGenerate(false)}
                disabled={isGenerating}
              >
                <Sparkles className="w-4 h-4" />
                <span>{isGenerating ? 'Synthesizing...' : 'Generate Prompt'}</span>
              </Button>
            </div>
          </div>

          {/* RIGHT: Output */}
          <div className="lg:col-span-7 space-y-4">
            {promptData ? (
              <div className="space-y-4">
                {/* Actions Toolbar */}
                <div className="flex items-center justify-between p-3 bg-slate-900 border border-slate-800 rounded-2xl">
                  <span className="text-xs font-bold text-white">
                    Aspect Ratio: <span className="text-purple-400">{promptData.aspectRatio}</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="glow"
                      onClick={() => handleGenerate(true)}
                      disabled={isGenerating}
                      title="Add photorealism boosts"
                    >
                      <Zap className="w-3.5 h-3.5 text-amber-300" />
                      <span>Improve Prompt</span>
                    </Button>
                    <CopyButton textToCopy={promptData.detailedPrompt} size="sm" />
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => showToast('Saved to project prompts!', 'success')}
                    >
                      <Bookmark className="w-3.5 h-3.5 text-purple-400" />
                      <span>Save</span>
                    </Button>
                  </div>
                </div>

                {/* Master Prompt Card */}
                <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3 shadow-2xl">
                  <span className="text-xs font-bold uppercase tracking-wider text-pink-400 block">
                    Synthesized Midjourney v6.1 &amp; Flux Prompt
                  </span>
                  <p className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-200 font-mono leading-relaxed select-all">
                    {promptData.detailedPrompt}
                  </p>
                </div>

                {/* Technical Optics Breakdown */}
                <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
                    <Camera className="w-4 h-4" /> Optical &amp; Camera Specifications
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
                      <span className="font-bold text-slate-400 block">Focal Lens:</span>
                      <span className="text-white">{promptData.technicalSpecs.lens}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
                      <span className="font-bold text-slate-400 block">Cinema Sensor:</span>
                      <span className="text-white">{promptData.technicalSpecs.camera}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
                      <span className="font-bold text-slate-400 block">Depth of Field:</span>
                      <span className="text-white">{promptData.technicalSpecs.depthOfField}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80">
                      <span className="font-bold text-slate-400 block">Palette &amp; Glows:</span>
                      <span className="text-white">{promptData.technicalSpecs.colors}</span>
                    </div>
                  </div>
                </div>

                {/* Negative Prompt */}
                <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-red-400">
                      Negative Prompt (Artifact Suppression)
                    </span>
                    <CopyButton textToCopy={promptData.negativePrompt} size="sm" />
                  </div>
                  <p className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 font-mono">
                    {promptData.negativePrompt}
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-12 text-center rounded-3xl bg-slate-900/40 border border-dashed border-slate-800 space-y-3">
                <Wand2 className="w-10 h-10 text-slate-600 mx-auto" />
                <h3 className="text-base font-bold text-white">Your detailed prompt will appear here</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Click &quot;Generate Prompt&quot; to configure camera angles, lenses, volumetric lights, and negative prompts.
                </p>
                <Button size="sm" variant="primary" onClick={() => handleGenerate(false)}>
                  Generate Demo Prompt
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
