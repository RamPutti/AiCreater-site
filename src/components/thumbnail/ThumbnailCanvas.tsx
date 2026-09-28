'use client';

import React, { useRef, useState } from 'react';
import { Download, Sparkles, Eye, Move, Maximize2 } from 'lucide-react';
import { Button, Badge } from '@/components/ui';
import { ThumbnailConcept, ThumbnailElement } from '@/types';

interface ThumbnailCanvasProps {
  concept: ThumbnailConcept;
  elements: ThumbnailElement[];
  onUpdateElement?: (id: string, updates: Partial<ThumbnailElement>) => void;
  accentColor?: string;
  onSave?: () => void;
}

export const ThumbnailCanvas: React.FC<ThumbnailCanvasProps> = ({
  concept,
  elements,
  onUpdateElement,
  accentColor = '#8B5CF6',
  onSave,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeElementId, setActiveElementId] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [showMobileSimulator, setShowMobileSimulator] = useState(false);

  // High-Resolution 1920x1080 Canvas Export
  const handleExportPng = () => {
    setIsExporting(true);
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 1920;
      canvas.height = 1080;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Draw Background
      const bgGrad = ctx.createLinearGradient(0, 0, 1920, 1080);
      bgGrad.addColorStop(0, '#090B10');
      bgGrad.addColorStop(0.5, '#121829');
      bgGrad.addColorStop(1, '#05070B');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 1920, 1080);

      // Radial Glow
      const glowGrad = ctx.createRadialGradient(1500, 300, 100, 1500, 300, 800);
      glowGrad.addColorStop(0, 'rgba(139, 92, 246, 0.45)');
      glowGrad.addColorStop(0.6, 'rgba(59, 130, 246, 0.2)');
      glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, 1920, 1080);

      // Draw Grid / Tech Lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 2;
      for (let x = 0; x < 1920; x += 120) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 1080);
        ctx.stroke();
      }

      // Draw Elements
      elements.forEach((el) => {
        if (!el.visible) return;
        const x = (el.xPercent / 100) * 1920;
        const y = (el.yPercent / 100) * 1080;

        if (el.type === 'badge' && el.text) {
          ctx.save();
          ctx.font = 'bold 36px "Inter", sans-serif';
          const textWidth = ctx.measureText(el.text).width;
          ctx.fillStyle = el.backgroundColor || '#8B5CF6';
          ctx.beginPath();
          ctx.roundRect(x, y - 40, textWidth + 50, 64, 16);
          ctx.fill();
          ctx.fillStyle = '#FFFFFF';
          ctx.fillText(el.text, x + 25, y + 6);
          ctx.restore();
        }

        if (el.type === 'headline' && el.text) {
          ctx.save();
          ctx.font = '900 110px "Inter", sans-serif';
          ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
          ctx.shadowBlur = 30;
          ctx.shadowOffsetX = 8;
          ctx.shadowOffsetY = 8;
          ctx.fillStyle = el.color || '#FFFFFF';
          ctx.fillText(el.text, x, y + 80);
          ctx.restore();
        }

        if (el.type === 'subtext' && el.text) {
          ctx.save();
          ctx.font = 'bold 64px "Inter", sans-serif';
          ctx.fillStyle = el.color || '#FACC15';
          ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
          ctx.shadowBlur = 20;
          ctx.fillText(el.text, x, y + 60);
          ctx.restore();
        }

        if (el.type === 'avatar') {
          // Draw Subject Silhouette with Halo
          ctx.save();
          ctx.shadowColor = '#8B5CF6';
          ctx.shadowBlur = 50;
          ctx.fillStyle = '#1E293B';
          ctx.beginPath();
          ctx.arc(x + 180, y + 180, 180, 0, Math.PI * 2);
          ctx.fill();
          ctx.lineWidth = 12;
          ctx.strokeStyle = '#8B5CF6';
          ctx.stroke();
          ctx.restore();
        }
      });

      // YouTube timestamp simulator in bottom right (16:9 safe zone)
      ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
      ctx.beginPath();
      ctx.roundRect(1740, 1000, 150, 56, 8);
      ctx.fill();
      ctx.font = 'bold 30px sans-serif';
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText('12:45', 1780, 1040);

      // Download
      const link = document.createElement('a');
      link.download = `creatorai-thumbnail-1920x1080-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (e) {
      console.error('Export error:', e);
    } finally {
      setIsExporting(false);
    }
  };

  const badgeEl = elements.find((e) => e.type === 'badge');
  const headlineEl = elements.find((e) => e.type === 'headline');
  const subtextEl = elements.find((e) => e.type === 'subtext');
  const avatarEl = elements.find((e) => e.type === 'avatar');

  return (
    <div className="space-y-4">
      {/* Canvas Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
        <div className="flex items-center gap-2">
          <Badge variant="purple" className="font-semibold">
            16:9 Studio Canvas (1920 × 1080 Safe)
          </Badge>
          <span className="text-xs text-slate-400 hidden sm:inline">
            Active: <strong className="text-slate-200">{concept.name}</strong>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowMobileSimulator(!showMobileSimulator)}
            title="Toggle YouTube mobile feed preview"
          >
            <Eye className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-xs">Mobile View</span>
          </Button>
          {onSave && (
            <Button size="sm" variant="secondary" onClick={onSave}>
              Save Preset
            </Button>
          )}
          <Button
            size="sm"
            variant="primary"
            onClick={handleExportPng}
            disabled={isExporting}
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isExporting ? 'Rendering 8K...' : 'Export 1080p PNG'}</span>
          </Button>
        </div>
      </div>

      {/* Main 16:9 Interactive Canvas */}
      <div
        ref={containerRef}
        className="relative w-full aspect-16-9 rounded-2xl overflow-hidden shadow-2xl border-2 border-slate-800 group select-none transition-all duration-300"
        style={{
          background: concept.bgGradient || '#090B10',
          boxShadow: `0 25px 60px -15px ${accentColor}33`,
        }}
      >
        {/* Background Grid Accent */}
        <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />

        {/* Ambient Volumetric Lighting Glows */}
        <div
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-40 animate-pulse"
          style={{ background: accentColor }}
        />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-30 bg-blue-600" />

        {/* Avatar / Subject Element */}
        {avatarEl && avatarEl.visible && (
          <div
            className="absolute bottom-0 right-[6%] md:right-[10%] w-[38%] h-[85%] flex items-end justify-center pointer-events-auto transition-transform duration-200"
            style={{
              filter: 'drop-shadow(0 15px 35px rgba(0,0,0,0.8))',
            }}
          >
            <div className="relative w-full h-full flex items-end justify-center">
              {/* Rim light effect around subject */}
              <div
                className="absolute inset-x-8 bottom-0 top-12 rounded-t-full blur-xl opacity-60"
                style={{ background: accentColor }}
              />
              {/* Realistic 3D Presenter Mock Graphic */}
              <div className="relative z-10 w-full h-full flex flex-col items-center justify-end">
                <div
                  className="w-36 h-36 md:w-48 md:h-48 rounded-full border-4 border-purple-400/50 shadow-2xl flex items-center justify-center relative overflow-hidden"
                  style={{
                    background: 'linear-gradient(135deg, #1E293B, #0F172A)',
                    boxShadow: '0 0 45px rgba(139, 92, 246, 0.4)',
                  }}
                >
                  <div className="text-center p-3">
                    <span className="text-4xl md:text-6xl select-none">⚡</span>
                    <p className="text-[10px] md:text-xs font-black tracking-widest uppercase text-purple-300 mt-1">
                      {concept.subjectMood}
                    </p>
                  </div>
                  {/* Subtle edge highlight */}
                  <div className="absolute inset-0 rounded-full border-2 border-white/20 pointer-events-none" />
                </div>
                {/* Presenter Body Shape */}
                <div className="w-52 md:w-72 h-32 md:h-44 bg-gradient-to-t from-slate-950 via-slate-900 to-slate-800 rounded-t-[50px] border-t-2 border-purple-500/30 flex items-center justify-center shadow-2xl">
                  <span className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">
                    Creator Focus
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Text Layer / Left Side Hierarchy */}
        <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-center items-start max-w-[65%] z-20 space-y-3 pointer-events-none">
          {/* Badge Pill */}
          {badgeEl && badgeEl.visible && (
            <div
              className="pointer-events-auto inline-flex items-center gap-1.5 px-3 py-1 md:px-4 md:py-1.5 rounded-full text-xs md:text-sm font-extrabold tracking-wider uppercase text-white shadow-lg backdrop-blur-md cursor-pointer hover:scale-105 transition"
              style={{
                backgroundColor: badgeEl.backgroundColor || '#8B5CF6',
                boxShadow: '0 4px 20px rgba(139, 92, 246, 0.5)',
              }}
              onClick={() => setActiveElementId('badge')}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{badgeEl.text || concept.badge || '🔥 2026 BLUEPRINT'}</span>
            </div>
          )}

          {/* Bold Main Headline */}
          {headlineEl && headlineEl.visible && (
            <div
              className="pointer-events-auto cursor-pointer group/headline relative"
              onClick={() => setActiveElementId('headline')}
            >
              <h1
                className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-none transition-all drop-shadow-[0_8px_16px_rgba(0,0,0,0.9)]"
                style={{
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                }}
              >
                {headlineEl.text || concept.headline}
              </h1>
              <div className="absolute -top-6 left-0 opacity-0 group-hover/headline:opacity-100 transition text-[10px] bg-purple-600 text-white px-2 py-0.5 rounded flex items-center gap-1">
                <Move className="w-2.5 h-2.5" /> Click to Edit
              </div>
            </div>
          )}

          {/* High-Contrast Subtext Banner */}
          {subtextEl && subtextEl.visible && (
            <div
              className="pointer-events-auto cursor-pointer"
              onClick={() => setActiveElementId('subtext')}
            >
              <span
                className="inline-block px-3 py-1 md:px-4 md:py-2 rounded-lg text-sm sm:text-lg md:text-2xl font-black uppercase tracking-wide text-amber-300 bg-black/75 border border-amber-400/40 shadow-xl backdrop-blur-md"
              >
                {subtextEl.text || concept.subtext || "IT CHANGES EVERYTHING"}
              </span>
            </div>
          )}
        </div>

        {/* YouTube Safe Zone: Duration Stamp (16:9 safe preview) */}
        <div className="absolute bottom-4 right-4 bg-black/85 text-white text-xs font-bold px-2 py-0.5 rounded tracking-wider border border-white/10 z-20 pointer-events-none">
          14:32
        </div>

        {/* Subtle Frame Glow */}
        <div className="absolute inset-0 border border-white/10 rounded-2xl pointer-events-none" />
      </div>

      {/* In-Place Quick Text Editor when an element is active */}
      {activeElementId && (
        <div className="p-3 bg-slate-900 border border-purple-500/30 rounded-xl flex items-center gap-3 animate-in fade-in duration-150">
          <span className="text-xs font-semibold text-purple-300 uppercase tracking-wider">
            Edit {activeElementId}:
          </span>
          <input
            type="text"
            className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-purple-500"
            value={
              activeElementId === 'headline'
                ? headlineEl?.text || ''
                : activeElementId === 'subtext'
                ? subtextEl?.text || ''
                : badgeEl?.text || ''
            }
            onChange={(e) => {
              const val = e.target.value;
              if (onUpdateElement) {
                if (activeElementId === 'headline' && headlineEl) {
                  onUpdateElement(headlineEl.id, { text: val });
                } else if (activeElementId === 'subtext' && subtextEl) {
                  onUpdateElement(subtextEl.id, { text: val });
                } else if (activeElementId === 'badge' && badgeEl) {
                  onUpdateElement(badgeEl.id, { text: val });
                }
              }
            }}
          />
          <Button size="sm" variant="ghost" onClick={() => setActiveElementId(null)}>
            Done
          </Button>
        </div>
      )}

      {/* Mobile YouTube Simulator Modal */}
      {showMobileSimulator && (
        <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Eye className="w-4 h-4 text-blue-400" />
              YouTube Mobile Feed Simulation (360px Width)
            </span>
            <button
              onClick={() => setShowMobileSimulator(false)}
              className="text-xs text-slate-400 hover:text-white"
            >
              Close
            </button>
          </div>
          <div className="max-w-[340px] mx-auto bg-black p-3 rounded-2xl border border-slate-700 shadow-xl">
            {/* Simulated Mobile Card */}
            <div className="w-full aspect-16-9 rounded-lg overflow-hidden relative" style={{ background: concept.bgGradient }}>
              <div className="absolute inset-0 p-2 flex flex-col justify-center max-w-[70%]">
                <span className="text-[10px] font-black text-white leading-tight uppercase line-clamp-2 drop-shadow">
                  {headlineEl?.text || concept.headline}
                </span>
                <span className="text-[8px] font-bold text-amber-300 mt-0.5 line-clamp-1">
                  {subtextEl?.text || concept.subtext}
                </span>
              </div>
              <div className="absolute bottom-1 right-1 bg-black/90 text-white text-[9px] font-bold px-1 rounded">
                14:32
              </div>
            </div>
            <div className="flex gap-2 mt-2 items-start">
              <div className="w-7 h-7 rounded-full bg-purple-600 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-white leading-tight">
                  {concept.headline}
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">Alex Rivera • 42K views • 2 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
