'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, HelpCircle, ArrowRight } from 'lucide-react';
import { Button, Badge } from '@/components/ui';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function FaqPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const faqs = [
    {
      q: 'What is CreatorAI Studio and who is it designed for?',
      category: 'General',
      a: 'CreatorAI Studio is a centralized production platform engineered for YouTubers, short-form creators, video editors, and digital agencies. It eliminates tool-switching by merging scriptwriting, transcript chapters, 16:9 thumbnail design, SEO metadata, and calendar planning in one high-velocity interface.',
    },
    {
      q: 'Do I need my own OpenAI or Supabase keys to test this?',
      category: 'Technical',
      a: 'No! CreatorAI Studio is equipped with an Autonomous Studio Demo Engine. All 6 AI generators produce rich, production-grade outputs out of the box. If you configure your own OPENAI_API_KEY in .env, it automatically connects to live OpenAI models.',
    },
    {
      q: 'Why is the 16:9 ratio so important in the Thumbnail Generator?',
      category: 'Thumbnails',
      a: 'YouTube desktop and mobile video cards strictly display at 16:9 (1920x1080 resolution). Standard square AI image generators crop out crucial headline text. Our editor enforces the 16:9 safe zone and simulates YouTube timestamp badges so your text is never obscured.',
    },
    {
      q: 'Can I export the generated thumbnails directly as image files?',
      category: 'Thumbnails',
      a: 'Yes! The canvas has a direct "Export 1080p PNG" button that renders full-resolution images with your custom typography, gradient lighting, and safe zone borders.',
    },
    {
      q: 'What are the 7 pacing tones in the Script Generator?',
      category: 'Scripting',
      a: 'You can choose between Professional, Educational, Energetic, Storytelling, Funny, Cinematic, and Conversational. Each tone changes the hook velocity, vocabulary, and visual B-roll cues.',
    },
    {
      q: 'How does the content calendar integrate with my projects?',
      category: 'Workflow',
      a: 'Every calendar event can be directly linked to a Project Workspace. When you click an event, you can jump straight into its script, thumbnail concepts, or SEO metadata.',
    },
    {
      q: 'Can I use this for TikTok, Instagram Reels, and Podcasts?',
      category: 'General',
      a: 'Yes! When creating a project, you can designate the platform as YouTube, TikTok, Instagram, Podcast, LinkedIn, or X.',
    },
    {
      q: 'What payment methods are supported for Indian Creators?',
      category: 'Billing',
      a: 'All plans are denominated in Indian Rupees (₹) and support UPI, credit/debit cards, Net Banking, and international cards via Stripe / Razorpay.',
    },
  ];

  const filteredFaqs = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.a.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#080B11] text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 py-16 md:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4">
          <Badge variant="purple">Knowledge Base</Badge>
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-base sm:text-lg text-slate-300">
            Everything you need to know about CreatorAI Studio features, workflows, and technology.
          </p>

          {/* Search bar */}
          <div className="relative max-w-md mx-auto pt-4">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search questions by keyword..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, idx) => (
              <details
                key={idx}
                className="group rounded-2xl bg-slate-900/60 border border-slate-800/80 p-5 transition-all open:bg-slate-900 open:border-purple-500/30"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none font-bold text-base text-white">
                  <div className="flex items-center gap-3">
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-purple-300 font-mono">
                      {faq.category}
                    </span>
                    <span>{faq.q}</span>
                  </div>
                  <span className="transition group-open:rotate-180 text-purple-400 ml-2">▾</span>
                </summary>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed pt-2 border-t border-slate-800/60">
                  {faq.a}
                </p>
              </details>
            ))
          ) : (
            <div className="text-center p-8 rounded-2xl bg-slate-900/30 border border-slate-800">
              <p className="text-sm text-slate-400">No questions found matching &quot;{searchTerm}&quot;.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
