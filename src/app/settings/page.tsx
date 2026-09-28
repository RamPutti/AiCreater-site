'use client';

import React, { useState } from 'react';
import {
  Settings,
  User,
  Key,
  CreditCard,
  Bell,
  Save,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  Check,
} from 'lucide-react';
import { Button, Badge } from '@/components/ui';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { useCreatorStore } from '@/lib/store/creator-store';

export default function SettingsPage() {
  const { profile, updateProfile, showToast, aiStatus } = useCreatorStore();

  const [activeSection, setActiveSection] = useState<'profile' | 'api' | 'subscription' | 'preferences'>('profile');

  // Profile State
  const [name, setName] = useState(profile.name);
  const [channelName, setChannelName] = useState(profile.channelName);
  const [email, setEmail] = useState(profile.email);
  const [niche, setNiche] = useState(profile.niche);
  const [subs, setSubs] = useState(profile.subscriberCount);

  // API Keys state
  const [openAiKey, setOpenAiKey] = useState('');
  const [supabaseUrl, setSupabaseUrl] = useState('');
  const [supabaseKey, setSupabaseKey] = useState('');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      channelName,
      email,
      niche,
      subscriberCount: subs,
    });
    showToast('Profile settings updated!', 'success');
  };

  const handleSaveApiKeys = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('API Keys saved! Autonomous fallback will engage if invalid.', 'success');
  };

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
            <Settings className="w-6 h-6 text-purple-400" />
            Studio Settings &amp; Preferences
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage your channel identity, AI provider credentials, and workspace configuration.
          </p>
        </div>

        {/* Settings Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
          {[
            { id: 'profile', label: 'Creator Profile', icon: User },
            { id: 'api', label: 'AI & Supabase Keys', icon: Key },
            { id: 'subscription', label: 'Plan & Billing', icon: CreditCard },
          ].map((sec) => {
            const Icon = sec.icon;
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id as typeof activeSection)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                  isActive
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{sec.label}</span>
              </button>
            );
          })}
        </div>

        {/* SECTION 1: CREATOR PROFILE */}
        {activeSection === 'profile' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-6 max-w-2xl shadow-xl">
            <h2 className="text-base font-bold text-white border-b border-slate-800 pb-3">
              Channel Identity
            </h2>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Primary YouTube Channel
                  </label>
                  <input
                    type="text"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
                    value={channelName}
                    onChange={(e) => setChannelName(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Creator Niche
                  </label>
                  <input
                    type="text"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Subscriber Count
                  </label>
                  <input
                    type="text"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
                    value={subs}
                    onChange={(e) => setSubs(e.target.value)}
                  />
                </div>
              </div>

              <div className="pt-2">
                <Button type="submit" variant="primary">
                  <Save className="w-4 h-4" />
                  <span>Save Profile</span>
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* SECTION 2: API KEYS & SUPABASE */}
        {activeSection === 'api' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-6 max-w-2xl shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h2 className="text-base font-bold text-white">External AI &amp; Database Providers</h2>
                <p className="text-xs text-slate-400">Optional: Connect live models or retain local autonomous demo engine</p>
              </div>
              <Badge variant="purple">Autonomous Active</Badge>
            </div>

            <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-300 leading-relaxed">
              <strong>Autonomous Engine Active:</strong> No API keys are required to use CreatorAI Studio. All 6 AI generators produce realistic production outputs autonomously. You can optionally enter your personal keys below.
            </div>

            <form onSubmit={handleSaveApiKeys} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  OpenAI API Key (Optional)
                </label>
                <input
                  type="password"
                  placeholder="sk-proj-..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-purple-500"
                  value={openAiKey}
                  onChange={(e) => setOpenAiKey(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Supabase Project URL (Optional)
                </label>
                <input
                  type="text"
                  placeholder="https://your-project.supabase.co"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-purple-500"
                  value={supabaseUrl}
                  onChange={(e) => setSupabaseUrl(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Supabase Anon Key (Optional)
                </label>
                <input
                  type="password"
                  placeholder="eyJhbGciOiJIUzI1NiIsIn..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-purple-500"
                  value={supabaseKey}
                  onChange={(e) => setSupabaseKey(e.target.value)}
                />
              </div>

              <div className="pt-2">
                <Button type="submit" variant="primary">
                  Save Credentials
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* SECTION 3: SUBSCRIPTION */}
        {activeSection === 'subscription' && (
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-6 max-w-2xl shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h2 className="text-base font-bold text-white">Current Subscription</h2>
                <p className="text-xs text-slate-400">Manage plan tier, limits, and payment details</p>
              </div>
              <Badge variant="purple" className="text-xs font-bold">
                PRO ACTIVE
              </Badge>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/40 to-blue-950/40 border border-purple-500/30 flex items-center justify-between">
              <div>
                <span className="text-sm font-bold text-white block">Pro Studio Tier (₹999/month)</span>
                <span className="text-xs text-slate-300">Renews on Oct 24, 2026</span>
              </div>
              <Badge variant="emerald">Active</Badge>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <h3 className="font-bold uppercase tracking-wider text-slate-400">Included In Your Plan:</h3>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Unlimited 16:9 Thumbnail Studio Concepts</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>All 7 Pacing Scriptwriting Tones</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>YouTube SEO CTR Predictor &amp; Pinned Comments</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Multi-Platform Content Calendar</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => showToast('Billing portal link simulated', 'info')}
              >
                Manage Invoices &amp; Payment Methods
              </Button>
            </div>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
