import React from 'react';
import Link from 'next/link';
import { BookOpen, FileText, Sparkles, ArrowRight, Download, Clock } from 'lucide-react';
import { Button, Badge } from '@/components/ui';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata = {
  title: 'Creator Resources & Guides — CreatorAI Studio',
  description: 'Articles, cheat sheets, and retention frameworks for modern digital video creators.',
};

export default function ResourcesPage() {
  const articles = [
    {
      title: 'How to Optimize YouTube Thumbnails for 2026: The Mobile First Rule',
      category: 'Design & Visuals',
      readTime: '6 min read',
      snippet: 'Over 78% of initial video impressions occur on mobile feeds where thumbnails are viewed at less than 350px width. Here is how to adjust contrast and focal points.',
    },
    {
      title: 'The 3-Part Hook Formula: How to Beat the 30-Second Retention Drop',
      category: 'Scriptwriting',
      readTime: '8 min read',
      snippet: 'Why the traditional intro sequence is costing you 60% of your audience, and how to restructure your video opening for maximum Average Percentage Viewed.',
    },
    {
      title: 'Midjourney v6.1 & Flux Prompts for Cinematic YouTube B-Roll Backgrounds',
      category: 'AI Prompts',
      readTime: '5 min read',
      snippet: 'A curated cheatsheet of camera angles, 85mm prime lens parameters, volumetric lighting styles, and negative prompts to generate crisp studio backdrops.',
    },
    {
      title: 'The 2026 YouTube Algorithm Explained: Session Time vs APV',
      category: 'Algorithm Strategy',
      readTime: '10 min read',
      snippet: 'An analytical deep dive into YouTube browse features, satisfaction surveys, and how thumbnail title harmony affects channel velocity.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#080B11] text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <Badge variant="purple">Creator Academy &amp; Blog</Badge>
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
            Creator Guides &amp; Retention Playbooks
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Data-backed breakdowns on script psychology, 16:9 thumbnail design, and video production systems.
          </p>
        </div>

        {/* Featured Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/40 transition flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <Badge variant="blue">{item.category}</Badge>
                  <span className="text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {item.readTime}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-purple-300 transition">
                  {item.title}
                </h2>
                <p className="text-sm text-slate-400 leading-relaxed">{item.snippet}</p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm" className="text-purple-400 hover:text-purple-300 p-0">
                    <span>Apply in Studio Workspace</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
