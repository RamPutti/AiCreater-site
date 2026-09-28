import React from 'react';
import { LucideIcon, Sparkles } from 'lucide-react';
import { Button } from './index';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = Sparkles,
  title,
  description,
  actionLabel,
  onAction,
  className,
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-8 md:p-12 rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 ${
        className || ''
      }`}
    >
      <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4 shadow-[0_0_20px_rgba(139,92,246,0.15)]">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-lg font-semibold text-white tracking-tight">{title}</h3>
      <p className="text-sm text-slate-400 max-w-sm mt-1.5 mb-6">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="primary" size="md">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export const LoadingSkeleton: React.FC<{ rows?: number; message?: string }> = ({
  rows = 4,
  message = 'AI is analyzing and generating...',
}) => {
  return (
    <div className="space-y-4 p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 animate-pulse">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-6 h-6 rounded-full bg-purple-500/30 animate-spin border-2 border-purple-400 border-t-transparent" />
        <span className="text-sm font-medium text-purple-300">{message}</span>
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-slate-800/60 rounded-md"
          style={{ width: `${Math.max(45, 95 - i * 15)}%` }}
        />
      ))}
    </div>
  );
};
