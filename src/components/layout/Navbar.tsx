'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, Menu, X, ArrowRight, Wand2, ChevronDown, Layers, FileText, Image as ImageIcon, Tags, Calendar } from 'lucide-react';
import { Button, Badge } from '@/components/ui';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);

  const navLinks = [
    { label: 'Features', href: '/features' },
    { label: 'AI Tools', href: '/ai-tools', hasDropdown: true },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Resources', href: '/resources' },
    { label: 'About', href: '/about' },
    { label: 'FAQ', href: '/faq' },
  ];

  const toolsList = [
    { label: 'Thumbnail Generator', href: '/tools/thumbnail', icon: ImageIcon, desc: '16:9 viral concepts & studio canvas' },
    { label: 'AI Script Generator', href: '/tools/script', icon: FileText, desc: 'High-retention hooks & full outlines' },
    { label: 'Transcript Summarizer', href: '/tools/transcript', icon: Layers, desc: 'Chapters, key moments & action items' },
    { label: 'Image Prompt Studio', href: '/tools/prompt', icon: Wand2, desc: 'Midjourney & Flux cinematic prompts' },
    { label: 'Metadata & SEO', href: '/tools/metadata', icon: Tags, desc: 'CTR titles, tags & pinned comments' },
    { label: 'Content Planner', href: '/calendar', icon: Calendar, desc: 'Unified multi-platform schedule' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[var(--background)]/80 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#124D95] via-[#2B6FD6] to-[#7DD3FC] flex items-center justify-center text-white shadow-lg shadow-[#124D95]/30 group-hover:scale-105 transition-transform duration-200">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tight text-white flex items-center gap-1.5">
              CreatorAI <span className="text-[#E9F5FF] font-extrabold text-sm px-1.5 py-0.5 rounded bg-[#124D95]/15 border border-[#124D95]/30">Studio</span>
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            if (link.hasDropdown) {
              return (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setToolsDropdownOpen(true)}
                  onMouseLeave={() => setToolsDropdownOpen(false)}
                >
                  <button
                    onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-lg hover:bg-slate-900 transition"
                  >
                    <span>{link.label}</span>
                    <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                  </button>

                  {/* Dropdown Menu */}
                  {toolsDropdownOpen && (
                    <div className="absolute top-full left-0 w-80 p-2 mt-1 rounded-2xl bg-slate-900/95 border border-slate-800 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="grid grid-cols-1 gap-1">
                        {toolsList.map((t) => {
                          const Icon = t.icon;
                          return (
                            <Link
                              key={t.label}
                              href={t.href}
                              onClick={() => setToolsDropdownOpen(false)}
                              className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-800/80 transition group"
                            >
                              <div className="p-2 rounded-lg bg-[#124D95]/15 text-[#E9F5FF] group-hover:bg-[#124D95] group-hover:text-white transition">
                                <Icon className="w-4 h-4" />
                              </div>
                              <div>
                                <span className="text-sm font-semibold text-white block group-hover:text-[#E9F5FF] transition">
                                  {t.label}
                                </span>
                                <span className="text-xs text-slate-400">{t.desc}</span>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition ${
                  isActive
                    ? 'text-white bg-slate-900 border border-slate-800'
                    : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Log In
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="glow" size="sm" className="font-semibold">
              <span>Open Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <Link href="/dashboard">
            <Button variant="primary" size="sm">
              Studio
            </Button>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-900 border border-slate-800"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950 p-4 space-y-3">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 text-sm font-medium text-slate-200 hover:bg-slate-900 rounded-lg transition"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="secondary" className="w-full">
                Log In
              </Button>
            </Link>
            <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="glow" className="w-full">
                Open Studio Workspace
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
