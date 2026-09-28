import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Button Component
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'glow';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#124D95]/50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none';

    const variants = {
      primary:
        'bg-gradient-to-r from-[#124D95] to-[#3B82F6] hover:from-[#0F3F7C] hover:to-[#2E70D9] text-white shadow-lg shadow-[#124D95]/25 active:scale-[0.98]',
      secondary:
        'bg-slate-800 hover:bg-slate-700/80 text-slate-100 border border-slate-700 active:scale-[0.98]',
      outline:
        'border border-slate-700/80 hover:border-[#124D95]/60 bg-transparent hover:bg-[#124D95]/10 text-slate-200 active:scale-[0.98]',
      ghost:
        'bg-transparent hover:bg-slate-800/60 text-slate-300 hover:text-white',
      danger:
        'bg-red-600/90 hover:bg-red-500 text-white active:scale-[0.98]',
      glow:
        'bg-gradient-to-r from-[#124D95] via-[#2C7BE5] to-[#7DD3FC] text-white shadow-[0_0_25px_rgba(18,77,149,0.5)] hover:shadow-[0_0_35px_rgba(18,77,149,0.7)] active:scale-[0.98]',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-xs rounded-lg gap-1.5',
      md: 'px-4 py-2.5 text-sm rounded-xl gap-2',
      lg: 'px-6 py-3 text-base rounded-xl gap-2.5 font-semibold',
      icon: 'p-2 rounded-xl text-slate-300 hover:text-white',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

// Badge Component
export const Badge: React.FC<{
  children: React.ReactNode;
  variant?: 'purple' | 'blue' | 'emerald' | 'amber' | 'rose' | 'slate';
  className?: string;
}> = ({ children, variant = 'purple', className }) => {
  const styles = {
    purple: 'bg-[#124D95]/15 text-[#E9F5FF] border-[#124D95]/30',
    blue: 'bg-[#3B82F6]/15 text-[#DBF3FF] border-[#3B82F6]/30',
    emerald: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    amber: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    rose: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
    slate: 'bg-slate-800/80 text-slate-300 border-slate-700/60',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border tracking-wide',
        styles[variant],
        className
      )}
    >
      {children}
    </span>
  );
};

// Card Component
export const Card: React.FC<React.HTMLAttributes<HTMLDivElement> & { glow?: boolean }> = ({
  children,
  className,
  glow,
  ...props
}) => {
  return (
    <div
      className={cn(
        'rounded-2xl bg-[var(--card)] border border-[var(--card-border)] backdrop-blur-md p-6 transition-all duration-200',
        glow && 'hover:border-[#124D95]/40 hover:shadow-[0_0_30px_rgba(18,77,149,0.15)]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
