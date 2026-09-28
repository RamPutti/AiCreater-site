import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Target, Users, Zap, ShieldCheck } from 'lucide-react';
import { Button, Badge } from '@/components/ui';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata = {
  title: 'About Us — CreatorAI Studio',
  description: 'Our mission to empower content creators with an all-in-one AI workspace.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#080B11] text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 py-16 md:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <Badge variant="purple">Our Mission</Badge>
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
            Built by Creators, for Creators.
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            We believe creators should spend 90% of their energy on storytelling and human connection—not wrestling with tool fatigue and fragmented production pipelines.
          </p>
        </div>

        {/* Story Section */}
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">The CreatorAI Studio Story</h2>
          <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            <p>
              In 2024, our founding team ran multiple YouTube channels and content agencies. Every single week, our creators experienced the exact same friction: an idea sparked in Apple Notes, scripts were written in Google Docs, transcripts sat in Descript, thumbnail prompts were tested in Discord bots, final thumbnails were rendered in Photoshop, and titles were tracked across Google Sheets.
            </p>
            <p>
              Every tool switch resulted in lost context, inconsistent styling, and creative burnout. We knew there had to be a better way.
            </p>
            <p>
              We designed <strong>CreatorAI Studio</strong> from the ground up to unify the complete creator lifecycle: from the first spontaneous idea to the locked retention script, 16:9 thumbnail design, SEO tags, and scheduled publishing date.
            </p>
          </div>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Velocity Over Busywork</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We automate repetitive administrative tasks so you can focus on camera presence, directing, and high-impact ideas.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Retention-First Design</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every AI prompt and script outline in our engine is grounded in real YouTube retention metrics and audience psychology.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Creator Ownership</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              You own 100% of the intellectual property, scripts, prompts, and exported media generated within your workspace.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/30 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black text-white">Experience the Workspace Today</h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Test the live studio workspace with our autonomous mock engine. No credit card required.
          </p>
          <div className="pt-2">
            <Link href="/dashboard">
              <Button size="lg" variant="glow">
                <span>Open CreatorAI Studio</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
