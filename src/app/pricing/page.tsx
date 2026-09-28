'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Check, X, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';
import { Button, Badge } from '@/components/ui';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const comparisonFeatures = [
    { name: 'AI Script Generator (7 Tones)', free: 'Limited (3/mo)', creator: '50 scripts/mo', pro: 'Unlimited' },
    { name: '16:9 Thumbnail Studio & Canvas', free: 'Basic Presets', creator: '4 Concepts + Export', pro: 'Priority 8K + Team Presets' },
    { name: 'Transcript Summarizer & Chapters', free: 'Quick mode only', creator: 'Standard + Timestamps', pro: 'Detailed + Action Plans' },
    { name: 'Midjourney & Flux Prompt Studio', free: '5 prompts/mo', creator: 'Unlimited', pro: 'Unlimited + Negative Filtering' },
    { name: 'YouTube SEO & CTR Predictor', free: false, creator: 'Full Suite', pro: 'Full Suite + A/B Suggestions' },
    { name: 'Multi-Platform Content Calendar', free: 'Single channel', creator: 'All Platforms', pro: 'All Platforms + Team Sync' },
    { name: 'Active Project Workspaces', free: '3 Projects', creator: 'Unlimited', pro: 'Unlimited' },
    { name: 'Design Heuristic Analysis', free: 'Basic', creator: 'Complete 7-Point', pro: 'Complete + Mobile Simulator' },
    { name: 'Creator Analytics Dashboard', free: false, creator: false, pro: 'Full Velocity Metrics' },
    { name: 'Team Collaboration Seats', free: false, creator: false, pro: 'Up to 5 Creators' },
    { name: 'Processing Queue Priority', free: 'Standard', creator: 'Fast', pro: 'Ultra-Fast Priority Edge' },
  ];

  return (
    <div className="min-h-screen bg-[#080B11] text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-1 py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <Badge variant="purple">Simple &amp; Predictable Pricing</Badge>
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
            Invest in Velocity. Double Your Output.
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Transparent pricing calibrated in Indian Rupees (₹). Cancel or change your subscription at any time.
          </p>

          {/* Duration Toggle */}
          <div className="flex items-center justify-center gap-3 pt-4">
            <span className={`text-sm font-semibold ${billingPeriod === 'monthly' ? 'text-white' : 'text-slate-400'}`}>
              Monthly Billing
            </span>
            <button
              onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
              className="w-14 h-8 rounded-full bg-slate-800 p-1 relative transition border border-slate-700"
              aria-label="Toggle billing duration"
            >
              <div
                className={`w-6 h-6 rounded-full bg-purple-500 transition-transform ${
                  billingPeriod === 'yearly' ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
            <div className="flex items-center gap-1.5">
              <span className={`text-sm font-semibold ${billingPeriod === 'yearly' ? 'text-white' : 'text-slate-400'}`}>
                Yearly Billing
              </span>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                SAVE 20%
              </span>
            </div>
          </div>
        </div>

        {/* 3 Pricing Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* FREE */}
          <div className="rounded-3xl p-8 bg-slate-900/60 border border-slate-800 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <Badge variant="slate">FREE</Badge>
              <div>
                <span className="text-4xl font-black text-white">₹0</span>
                <span className="text-slate-400 text-sm"> / month</span>
              </div>
              <p className="text-xs text-slate-400">For beginners exploring creator workflows.</p>
              <div className="pt-4 border-t border-slate-800 space-y-3 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Basic AI generations</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Basic transcript summaries</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Basic prompts</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Limited thumbnails</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Basic content planner</span>
                </div>
              </div>
            </div>
            <Link href="/signup">
              <Button variant="secondary" className="w-full">
                Get Started Free
              </Button>
            </Link>
          </div>

          {/* CREATOR */}
          <div className="rounded-3xl p-8 bg-slate-900 border-2 border-purple-500 flex flex-col justify-between space-y-6 relative shadow-2xl shadow-purple-600/20">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-[11px] font-black uppercase px-3.5 py-0.5 rounded-full shadow-lg">
              Most Popular
            </div>
            <div className="space-y-4">
              <Badge variant="purple">CREATOR</Badge>
              <div>
                <span className="text-4xl font-black text-white">
                  {billingPeriod === 'monthly' ? '₹499' : '₹399'}
                </span>
                <span className="text-slate-400 text-sm"> / month</span>
              </div>
              <p className="text-xs text-purple-300">For serious creators uploading weekly content.</p>
              <div className="pt-4 border-t border-slate-800 space-y-3 text-xs text-slate-200">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>More AI generations (50/month)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Advanced summaries &amp; chapters</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Advanced image prompts</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Script generator (7 pacing tones)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Metadata generator &amp; CTR prediction</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>More thumbnail concepts</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Unlimited projects</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Content calendar</span>
                </div>
              </div>
            </div>
            <Link href="/signup?plan=creator">
              <Button variant="glow" className="w-full">
                Upgrade to Creator
              </Button>
            </Link>
          </div>

          {/* PRO */}
          <div className="rounded-3xl p-8 bg-slate-900/60 border border-slate-800 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <Badge variant="blue">PRO</Badge>
              <div>
                <span className="text-4xl font-black text-white">
                  {billingPeriod === 'monthly' ? '₹999' : '₹799'}
                </span>
                <span className="text-slate-400 text-sm"> / month</span>
              </div>
              <p className="text-xs text-slate-400">For agencies, high-volume teams &amp; daily uploaders.</p>
              <div className="pt-4 border-t border-slate-800 space-y-3 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Higher usage limits</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Advanced AI tools</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Premium thumbnail workflows</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Advanced prompts</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Advanced metadata</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Team collaboration (5 seats)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Analytics dashboard</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Priority processing</span>
                </div>
              </div>
            </div>
            <Link href="/signup?plan=pro">
              <Button variant="secondary" className="w-full">
                Get Pro Studio
              </Button>
            </Link>
          </div>
        </div>

        {/* Feature Comparison Table */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
          <h2 className="text-2xl font-bold text-white tracking-tight">Full Plan Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="py-3 px-4">Feature</th>
                  <th className="py-3 px-4">Free (₹0)</th>
                  <th className="py-3 px-4 text-purple-400 font-bold">Creator (₹499)</th>
                  <th className="py-3 px-4 text-blue-400 font-bold">Pro (₹999)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {comparisonFeatures.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-800/30 transition">
                    <td className="py-3.5 px-4 font-medium text-white">{row.name}</td>
                    <td className="py-3.5 px-4 text-slate-400">
                      {typeof row.free === 'boolean' ? (
                        row.free ? <Check className="w-4 h-4 text-emerald-400" /> : <X className="w-4 h-4 text-slate-600" />
                      ) : (
                        row.free
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-purple-300 font-semibold">
                      {typeof row.creator === 'boolean' ? (
                        row.creator ? <Check className="w-4 h-4 text-emerald-400" /> : <X className="w-4 h-4 text-slate-600" />
                      ) : (
                        row.creator
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-blue-300 font-semibold">
                      {typeof row.pro === 'boolean' ? (
                        row.pro ? <Check className="w-4 h-4 text-emerald-400" /> : <X className="w-4 h-4 text-slate-600" />
                      ) : (
                        row.pro
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
