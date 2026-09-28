'use client';

import React from 'react';
import { CheckCircle2, AlertCircle, Info, Sparkles, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui';
import { ThumbnailDesignAnalysis as AnalysisType } from '@/types';

interface Props {
  analysis: AnalysisType;
}

export const ThumbnailDesignAnalysis: React.FC<Props> = ({ analysis }) => {
  const metrics = [
    { label: 'Composition', score: analysis.compositionScore, status: 'Strong' as const },
    { label: 'Contrast Separation', score: analysis.contrastScore, status: 'Strong' as const },
    { label: 'Text Readability', score: analysis.readabilityScore, status: 'Strong' as const },
    { label: 'Subject Focus', score: analysis.subjectFocusScore, status: 'Good' as const },
    { label: 'Visual Hierarchy', score: analysis.visualHierarchyScore, status: 'Strong' as const },
    { label: 'Mobile Visibility', score: analysis.mobileVisibilityScore, status: 'Good' as const },
    { label: 'Spacing & Safe Zones', score: analysis.spacingScore, status: 'Good' as const },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Strong':
        return <Badge variant="emerald">Strong</Badge>;
      case 'Good':
        return <Badge variant="blue">Good</Badge>;
      case 'Needs improvement':
        return <Badge variant="rose">Needs improvement</Badge>;
      default:
        return <Badge variant="amber">Review</Badge>;
    }
  };

  return (
    <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-5 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              AI Design Analysis
              <span className="text-[10px] font-normal uppercase tracking-wider text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
                Design Guidance
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Heuristic visual quality check based on top YouTube design standards
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs text-slate-400 block">Overall Assessment</span>
          <span className="text-sm font-extrabold text-emerald-400 flex items-center gap-1 justify-end">
            <ShieldCheck className="w-4 h-4" /> {analysis.overallRating}
          </span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/60 flex items-center justify-between"
          >
            <div>
              <span className="text-xs text-slate-300 font-medium block">{m.label}</span>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-500"
                    style={{ width: `${m.score}%` }}
                  />
                </div>
                <span className="text-[11px] font-bold text-slate-400">{m.score}%</span>
              </div>
            </div>
            {getStatusBadge(m.status)}
          </div>
        ))}
      </div>

      {/* Recommendations & Feedback */}
      <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 space-y-2.5">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5" />
          Heuristic Recommendations
        </h4>
        <ul className="space-y-2">
          {analysis.recommendations.map((rec, i) => (
            <li key={i} className="text-xs text-slate-300 flex items-start gap-2 leading-relaxed">
              <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 flex-shrink-0 mt-0.5" />
              <span>{rec}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Disclosure disclaimer */}
      <p className="text-[11px] text-slate-500 italic text-center">
        Note: Analysis scores represent aesthetic alignment and readability heuristics; click-through rate ultimately depends on audience affinity and topic relevance.
      </p>
    </div>
  );
};
