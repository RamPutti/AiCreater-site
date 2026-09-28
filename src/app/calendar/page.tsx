'use client';

import React, { useState } from 'react';
import {
  CalendarDays,
  Plus,
  Filter,
  CheckCircle2,
  Clock,
  Trash2,
  Edit2,
  Copy,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { Button, Badge } from '@/components/ui';
import { Modal } from '@/components/ui/modal';
import { DashboardShell } from '@/components/layout/DashboardShell';
import { useCreatorStore } from '@/lib/store/creator-store';
import { ContentCalendarItem, ContentPlatform, ProjectStatus } from '@/types';

export default function CalendarPage() {
  const { calendarItems, addCalendarItem, updateCalendarItem, deleteCalendarItem, showToast } =
    useCreatorStore();

  const [viewMode, setViewMode] = useState<'month' | 'week' | 'list'>('month');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ContentCalendarItem | null>(null);

  // Modal Form State
  const [formTitle, setFormTitle] = useState('');
  const [formPlatform, setFormPlatform] = useState<ContentPlatform>('YouTube');
  const [formDate, setFormDate] = useState('2026-10-05');
  const [formStatus, setFormStatus] = useState<ProjectStatus>('Scheduled');
  const [formDescription, setFormDescription] = useState('');
  const [formNotes, setFormNotes] = useState('');

  const statuses = ['All', 'Idea', 'Script', 'Recording', 'Editing', 'Ready', 'Scheduled', 'Published'];

  const filteredItems = calendarItems.filter((item) =>
    selectedStatusFilter === 'All' ? true : item.status === selectedStatusFilter
  );

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setFormTitle('');
    setFormPlatform('YouTube');
    setFormDate(new Date(Date.now() + 5 * 86400000).toISOString().split('T')[0]);
    setFormStatus('Scheduled');
    setFormDescription('');
    setFormNotes('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: ContentCalendarItem) => {
    setEditingItem(item);
    setFormTitle(item.title);
    setFormPlatform(item.platform);
    setFormDate(item.publishingDate);
    setFormStatus(item.status);
    setFormDescription(item.description);
    setFormNotes(item.notes || '');
    setIsModalOpen(true);
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    if (editingItem) {
      updateCalendarItem(editingItem.id, {
        title: formTitle,
        platform: formPlatform,
        publishingDate: formDate,
        status: formStatus,
        description: formDescription,
        notes: formNotes,
      });
    } else {
      addCalendarItem({
        title: formTitle,
        platform: formPlatform,
        publishingDate: formDate,
        status: formStatus,
        description: formDescription,
        notes: formNotes,
      });
    }
    setIsModalOpen(false);
  };

  const handleDuplicate = (item: ContentCalendarItem) => {
    addCalendarItem({
      title: `${item.title} (Follow-Up)`,
      platform: item.platform,
      publishingDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      status: 'Idea',
      description: item.description,
      notes: item.notes,
    });
    showToast('Duplicated release entry!', 'success');
  };

  const getStatusColor = (st: ProjectStatus) => {
    switch (st) {
      case 'Published':
        return 'emerald';
      case 'Scheduled':
        return 'blue';
      case 'Ready':
        return 'purple';
      case 'Editing':
      case 'Recording':
        return 'amber';
      default:
        return 'slate';
    }
  };

  return (
    <DashboardShell>
      <div className="space-y-6">
        {/* Header & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
              <CalendarDays className="w-6 h-6 text-indigo-400" />
              Multi-Platform Content Calendar
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Plan, sequence, and manage publishing deadlines across YouTube, TikTok, Reels, and Podcasts.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* View Switcher */}
            <div className="bg-slate-900 border border-slate-800 p-1 rounded-xl flex items-center gap-1">
              <button
                onClick={() => setViewMode('month')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  viewMode === 'month' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Month
              </button>
              <button
                onClick={() => setViewMode('week')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  viewMode === 'week' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  viewMode === 'list' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                List
              </button>
            </div>

            <Button variant="glow" size="sm" onClick={handleOpenAddModal}>
              <Plus className="w-4 h-4" />
              <span>Schedule Content</span>
            </Button>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider pl-1">
            Status:
          </span>
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatusFilter(st)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition whitespace-nowrap ${
                selectedStatusFilter === st
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* CALENDAR VIEWS */}
        {viewMode === 'month' && (
          <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-base font-bold text-white">October 2026 Production Schedule</span>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" /> Published
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-blue-400" /> Scheduled
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-purple-400" /> Ready
                </span>
              </div>
            </div>

            {/* Grid of Days */}
            <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold text-slate-400 pb-2">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>

            <div className="grid grid-cols-7 gap-2 min-h-[420px]">
              {Array.from({ length: 31 }).map((_, i) => {
                const dayNum = i + 1;
                const dateStr = `2026-10-${dayNum < 10 ? '0' + dayNum : dayNum}`;
                const itemsOnDate = filteredItems.filter(
                  (item) => item.publishingDate === dateStr || item.publishingDate.endsWith(`-${dayNum}`)
                );

                return (
                  <div
                    key={i}
                    className={`p-2 rounded-2xl border text-left flex flex-col justify-between min-h-[90px] transition ${
                      dayNum === 2 || dayNum === 6 || dayNum === 12
                        ? 'bg-slate-900 border-purple-500/40 shadow-sm'
                        : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-[11px] font-bold text-slate-400">{dayNum}</span>
                    <div className="space-y-1 mt-1">
                      {itemsOnDate.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => handleOpenEditModal(item)}
                          className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-purple-400 cursor-pointer transition text-[10px] space-y-0.5"
                        >
                          <span className="font-bold text-white line-clamp-1">{item.title}</span>
                          <div className="flex items-center justify-between text-[9px] text-slate-400">
                            <span>{item.platform}</span>
                            <span className="text-purple-300 font-bold">{item.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {viewMode === 'list' && (
          <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-3 shadow-xl">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:border-purple-500/30 transition"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-purple-400 font-mono">
                      {item.publishingDate}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-900 text-[10px] font-semibold text-slate-300 border border-slate-800">
                      {item.platform}
                    </span>
                    <Badge variant={getStatusColor(item.status)}>{item.status}</Badge>
                  </div>
                  <h3 className="text-sm font-bold text-white group-hover:text-purple-300 transition">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400">{item.description}</p>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <Button size="sm" variant="ghost" onClick={() => handleOpenEditModal(item)}>
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleDuplicate(item)}>
                    <Copy className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="hover:text-red-400"
                    onClick={() => deleteCalendarItem(item.id)}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {viewMode === 'week' && (
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
              <div key={day} className="p-4 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-slate-400 block border-b border-slate-800 pb-2">
                  {day} (Day {idx + 1})
                </span>
                <div className="space-y-2">
                  {filteredItems.slice(idx, idx + 2).map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleOpenEditModal(item)}
                      className="p-3 rounded-2xl bg-slate-950 border border-slate-800 hover:border-purple-400 cursor-pointer space-y-1"
                    >
                      <Badge variant={getStatusColor(item.status)} className="text-[9px]">
                        {item.status}
                      </Badge>
                      <h4 className="text-xs font-bold text-white line-clamp-2">{item.title}</h4>
                      <span className="text-[10px] text-slate-400 block">{item.platform}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Create / Edit Content Item Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingItem ? 'Edit Scheduled Content' : 'Schedule New Video Content'}
          description="Coordinate release dates, target channels, and production readiness."
        >
          <form onSubmit={handleSaveModal} className="space-y-4 mt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Content Title *
              </label>
              <input
                type="text"
                required
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Target Platform
                </label>
                <select
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                  value={formPlatform}
                  onChange={(e) => setFormPlatform(e.target.value as ContentPlatform)}
                >
                  <option value="YouTube">YouTube</option>
                  <option value="TikTok">TikTok</option>
                  <option value="Instagram">Instagram Reels</option>
                  <option value="Podcast">Podcast</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="X/Twitter">X / Twitter</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Release Date
                </label>
                <input
                  type="date"
                  required
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                  value={formDate}
                  onChange={(e) => setFormDate(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Current Production Status
              </label>
              <select
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                value={formStatus}
                onChange={(e) => setFormStatus(e.target.value as ProjectStatus)}
              >
                <option value="Idea">Idea</option>
                <option value="Script">Script</option>
                <option value="Recording">Recording</option>
                <option value="Editing">Editing</option>
                <option value="Ready">Ready</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Published">Published</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Description &amp; Publishing Notes
              </label>
              <textarea
                rows={3}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                {editingItem ? 'Save Changes' : 'Add to Calendar'}
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </DashboardShell>
  );
}
