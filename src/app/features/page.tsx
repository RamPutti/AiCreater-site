import React from 'react';
import Link from 'next/link';
import {
  Wand2,
  FileText,
  FileAudio,
  Image as ImageIcon,
  Tags,
  Calendar,
  Layers,
  ArrowRight,
  Sparkles,
  Zap,
  Sliders,
  CheckCircle2,
} from 'lucide-react';
import { Button, Badge } from '@/components/ui';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata = {
  title: 'Features — CreatorAI Studio',
  description: 'Explore the full suite of AI tools and production features built for YouTubers and video creators.',
};

export default function FeaturesPage() {
  const featureList = [
    {
      id: 'thumbnail',
      name: '16:9 Thumbnail Generator & Studio Canvas',
      tag: 'Standout Feature',
      desc: 'The only AI thumbnail editor built strictly around the 16:9 video ratio. Generate 4 high-contrast concepts, edit bold typography directly on the canvas, test mobile feed visibility, and export directly in 1080p.',
      icon: ImageIcon,
      bullets: [
        'Exact 16:9 safe zone bounding with YouTube timestamp simulation',
        'Real-time design heuristic scores: Composition, Contrast & Readability',
        '12 viral layout presets: Split contrast, reaction, cinematic & tech',
        'Instant PNG download with custom color grading and drop-shadows',
      ],
      href: '/tools/thumbnail',
    },
    {
      id: 'script',
      name: 'AI Retention Scriptwriting Engine',
      tag: 'Psychological Hooks',
      desc: 'Formulate scripts that hold viewer attention beyond the 30-second cliff. Features 7 distinct pacing tones and visual cues for B-roll transitions.',
      icon: FileText,
      bullets: [
        '3-part hook architecture: Curiosity + Stakes + Proof',
        '7 tone modes: Professional, Educational, Energetic, Storytelling, Funny, Cinematic, Conversational',
        'Integrated B-roll visual cues and sound design markers',
        '1-click rewrite, expand, or condense script sections',
      ],
      href: '/tools/script',
    },
    {
      id: 'transcript',
      name: 'Intelligent Transcript Summarizer',
      tag: 'Timecode Automation',
      desc: 'Turn sprawling video recordings into crisp YouTube chapters, key moments, action checklists, and SEO descriptions.',
      icon: FileAudio,
      bullets: [
        'Quick, Standard, and Detailed compression levels',
        'Auto-generated timecodes ready to paste into YouTube descriptions',
        'Key quotes extraction and editorial takeaways',
        'Direct text upload or sample transcript testing',
      ],
      href: '/tools/transcript',
    },
    {
      id: 'prompt',
      name: 'Cinematic Image Prompt Studio',
      tag: 'Midjourney & Flux',
      desc: 'Stop guessing AI visual prompts. Generate camera-calibrated prompts with ARRI Alexa specs, 85mm prime lenses, and negative prompt protection.',
      icon: Wand2,
      bullets: [
        'Aspect ratios: 16:9, 9:16, 1:1, 4:5, 21:9',
        'Lighting controls: Volumetric neon, rim lighting, golden hour & cyberpunk',
        'Negative prompt generator to eliminate blurry artifacts and distorted faces',
        '1-click "Improve Prompt" photorealism booster',
      ],
      href: '/tools/prompt',
    },
    {
      id: 'metadata',
      name: 'YouTube SEO & CTR Metadata Optimizer',
      tag: 'Algorithm Alignment',
      desc: 'Predict high-performing YouTube titles with character count counters, search-volume tags, description templates, and engagement pinned comments.',
      icon: Tags,
      bullets: [
        '5 unique title variations with estimated CTR prediction scores',
        'High-converting video description templates with links & timestamps',
        'Hashtag bundles and keyword research tags',
        'Pinned comment engagement hooks',
      ],
      href: '/tools/metadata',
    },
    {
      id: 'calendar',
      name: 'Multi-Platform Content Planner',
      tag: 'Visual Pipeline',
      desc: 'Keep your release cadence disciplined across YouTube, TikTok, Instagram Reels, LinkedIn, and Video Podcasts.',
      icon: Calendar,
      bullets: [
        'Month, Week, and List calendar views',
        '7 production statuses: Idea, Script, Recording, Editing, Ready, Scheduled, Published',
        'Linked project workspaces for instant asset retrieval',
        'Drag and drop scheduling workflow',
      ],
      href: '/calendar',
    },
  ];

  return (
    <div className="min-h-screen bg-[#080B11] text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <Badge variant="purple">Product Capabilities</Badge>
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
            Engineered for High-Velocity Creators
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Every feature in CreatorAI Studio is tuned specifically for video production, audience retention, and publishing consistency.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="space-y-12">
          {featureList.map((f, i) => {
            const Icon = f.icon;
            const isReversed = i % 2 === 1;
            return (
              <div
                key={f.id}
                className={`p-8 sm:p-10 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col lg:flex-row items-center gap-8 ${
                  isReversed ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <Badge variant="purple">{f.tag}</Badge>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white">{f.name}</h2>
                  <p className="text-sm sm:text-base text-slate-400 leading-relaxed">{f.desc}</p>
                  <ul className="space-y-2 pt-2">
                    {f.bullets.map((b, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4">
                    <Link href={f.href}>
                      <Button variant="primary" size="md">
                        <span>Launch {f.name.split(' ')[0]} Tool</span>
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="w-full lg:w-1/2 p-6 rounded-2xl bg-slate-950 border border-slate-800/80 shadow-2xl relative overflow-hidden flex flex-col justify-center min-h-[260px]">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                    <span className="text-xs font-mono text-slate-400">Preview: {f.name}</span>
                    <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      Active
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 italic mb-4">
                    &quot;Integrated seamlessly into CreatorAI project workspaces with instant autosave and cloud sync.&quot;
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400">
                    <div className="p-2 rounded bg-slate-900 border border-slate-800">
                      <span className="font-bold text-white block">Speed:</span> &lt; 1.2s Generation
                    </div>
                    <div className="p-2 rounded bg-slate-900 border border-slate-800">
                      <span className="font-bold text-white block">Export:</span> 1-Click Clipboard &amp; PNG
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
