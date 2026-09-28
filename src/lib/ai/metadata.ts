import { MetadataData, MetadataVariation } from '@/types';
import { simulateAiDelay, isRealAiConfigured } from './config';

export interface GenerateMetadataParams {
  topic: string;
  title: string;
  targetAudience: string;
  platform: string;
  keywords?: string[];
}

export async function generateMetadata(params: GenerateMetadataParams): Promise<MetadataData> {
  await simulateAiDelay(800, 1400);

  const { topic, title, targetAudience, platform } = params;
  const baseIdea = title || topic || 'How to Build an AI-Powered Creator Business in 2026';

  if (isRealAiConfigured()) {
    try {
      const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY || process.env.OPENAI_API_KEY;
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'You are an elite YouTube SEO strategist and metadata optimizer. Respond with JSON matching the metadata schema.',
            },
            {
              role: 'user',
              content: `Generate metadata for: ${baseIdea}, Platform: ${platform}, Target Audience: ${targetAudience}`,
            },
          ],
          response_format: { type: 'json_object' },
        }),
      });
      if (res.ok) {
        const json = await res.json();
        const parsed = JSON.parse(json.choices[0].message.content);
        return {
          titleVariations: parsed.titleVariations || [],
          selectedTitle: parsed.selectedTitle || baseIdea,
          description: parsed.description || '',
          tags: parsed.tags || [],
          keywords: parsed.keywords || [],
          hashtags: parsed.hashtags || [],
          chapters: parsed.chapters || [],
          pinnedComment: parsed.pinnedComment || '',
        };
      }
    } catch {
      // Fallback to mock
    }
  }

  // Realistic Pro Metadata Engine
  const variations: MetadataVariation[] = [
    {
      id: 'v1',
      title: `I Replaced My Entire Content Team with AI (Here's What Happened)`,
      score: 96,
      ctrPrediction: '11.4% Expected CTR',
      characterCount: 65,
    },
    {
      id: 'v2',
      title: `The 2026 Creator Blueprint: How AI Changed Everything`,
      score: 91,
      ctrPrediction: '9.8% Expected CTR',
      characterCount: 52,
    },
    {
      id: 'v3',
      title: `Stop Making Videos the Hard Way: My 1-Hour AI Studio Workflow`,
      score: 89,
      ctrPrediction: '8.9% Expected CTR',
      characterCount: 62,
    },
    {
      id: 'v4',
      title: `Why 99% of Creators Will Fail in 2026 (Unless You Do This)`,
      score: 94,
      ctrPrediction: '10.8% Expected CTR',
      characterCount: 57,
    },
    {
      id: 'v5',
      title: `The Exact AI Stack Behind a 7-Figure YouTube Channel`,
      score: 93,
      ctrPrediction: '10.2% Expected CTR',
      characterCount: 52,
    },
  ];

  return {
    titleVariations: variations,
    selectedTitle: variations[0].title,
    description: `Are you still spending 20+ hours every week scripting, editing, and planning videos from scratch? In this video, I break down the exact modern AI creator workflow that saves over 15 hours per upload while multiplying audience retention.\n\nWe cover the 3-step high-converting thumbnail framework, how to auto-summarize transcripts for maximum SEO, and the prompt structures that generate studio-grade visual assets.\n\n⚡ TRY CREATORAI STUDIO FREE:\n👉 https://creatorai.studio\n\n📌 CHAPTER TIMESTAMPS:\n00:00 - The Harsh Truth About Creator Burnout\n01:45 - The 3-Tier AI Stack Breakdown\n04:30 - How to Write Scripts 5x Faster with AI\n08:15 - Generating High-CTR 16:9 Thumbnails\n12:30 - SEO & Algorithm Optimization Secrets\n15:10 - Complete Creator Checklist\n\n💬 WHAT TO WATCH NEXT:\n- How to Double Your Watch Time in 2026\n- 5 AI Tools Every YouTuber Needs to Know\n\n#ContentCreator #CreatorEconomy #AItools #YouTubeGrowth #VideoStrategy`,
    tags: [
      'creator ai studio',
      'youtube growth 2026',
      'ai tools for creators',
      'video scripting ai',
      'youtube thumbnail generator',
      'content creation workflow',
      'how to get more views',
      'video retention tips',
      'ai prompts for youtube',
      'productivity for creators',
    ],
    keywords: [
      'AI Video Workspace',
      'Thumbnail Design Secrets',
      'High-CTR Titles',
      'YouTube Algorithm 2026',
      'Automated Scriptwriting',
      'Audience Retention',
    ],
    hashtags: ['#CreatorAI', '#YouTubeGrowth', '#AItools', '#ContentStrategy', '#CreatorEconomy'],
    chapters: [
      '00:00 Introduction & The Big Shift',
      '01:45 The 3-Tier Production Loop',
      '04:30 AI Scripting Blueprint',
      '08:15 Designing Viral Thumbnails',
      '12:30 Algorithm & SEO Mastery',
      '15:10 Action Steps',
    ],
    pinnedComment: `🔥 Which part of your video workflow takes the most time right now: scripting, thumbnails, or editing? Drop a comment below and I'll send my personal speed-run template! \n\nGet early access to CreatorAI Studio: https://creatorai.studio 🚀`,
  };
}
