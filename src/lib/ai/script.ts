import { ScriptData, ContentPlatform } from '@/types';
import { simulateAiDelay, isRealAiConfigured } from './config';

export interface GenerateScriptParams {
  topic: string;
  title: string;
  targetAudience: string;
  duration: string; // e.g. "8-10 mins", "60s (Shorts)", "15 mins"
  platform: ContentPlatform;
  tone: string; // 'Professional' | 'Educational' | 'Energetic' | 'Storytelling' | 'Funny' | 'Cinematic' | 'Conversational'
  language: string;
  action?: 'generate' | 'rewrite' | 'expand' | 'shorten';
}

export async function generateScript(params: GenerateScriptParams): Promise<ScriptData> {
  await simulateAiDelay(1000, 1600);

  const { topic, title, targetAudience, duration, platform, tone, language, action = 'generate' } = params;
  const cleanTitle = title || topic || 'How to Master AI Workflow in 2026';

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
              content: 'You are an award-winning YouTube scriptwriter and video strategist. Generate a structured script in JSON matching the requested schema.',
            },
            {
              role: 'user',
              content: `Write a script for ${platform}. Title: "${cleanTitle}". Topic: ${topic}. Audience: ${targetAudience}. Duration: ${duration}. Tone: ${tone}. Language: ${language}. Action: ${action}`,
            },
          ],
          response_format: { type: 'json_object' },
        }),
      });
      if (res.ok) {
        const json = await res.json();
        const parsed = JSON.parse(json.choices[0].message.content);
        return {
          hook: parsed.hook,
          introduction: parsed.introduction,
          sections: parsed.sections || [],
          transitions: parsed.transitions || [],
          cta: parsed.cta,
          outro: parsed.outro,
          targetDuration: duration,
          tone,
          language,
          targetAudience,
          wordCount: parsed.wordCount || 1250,
        };
      }
    } catch {
      // Fallback cleanly to mock engine
    }
  }

  // Realistic Studio Mock Engine
  const isShortForm = duration.includes('60s') || duration.includes('Short') || platform === 'TikTok' || platform === 'Instagram';

  if (isShortForm) {
    return {
      hook: `Stop scrolling if you want to save 10 hours this week. Most creators are doing "${topic || 'content creation'}" completely backwards.`,
      introduction: `Here is the exact 3-step workflow that took me from burn-out to publishing 3 videos a day with zero friction.`,
      sections: [
        {
          id: 's1',
          name: 'Step 1: The Automated Idea Sandbox',
          durationEst: '15s',
          content: 'Instead of starting from a blank page, build a centralized idea vault where every spontaneous thought turns into a structured outline within seconds.',
          visualCue: '[Fast zoom-in to laptop screen showing CreatorAI workflow, kinetic text highlighting key metrics]',
        },
        {
          id: 's2',
          name: 'Step 2: The Batch-Scripting Secret',
          durationEst: '20s',
          content: 'Never write one script at a time. Group by thematic hooks and write in batches of three while your creative state is peaked.',
          visualCue: '[Split screen: old frustrating method vs modern 1-click batch workflow with smooth motion graphics]',
        },
        {
          id: 's3',
          name: 'Step 3: Instant Visual Assets',
          durationEst: '15s',
          content: 'Generate your 16:9 thumbnail concepts and metadata before you hit record. That way you film directly toward the thumbnail promise.',
          visualCue: '[Over-the-shoulder B-roll demonstrating 16:9 canvas editor and instant export]',
        },
      ],
      transitions: [
        'And that brings us directly to the golden rule...',
        'Here is where 90% of beginners get stuck...',
      ],
      cta: 'Save this video right now so you have the blueprint when you sit down to create this weekend.',
      outro: 'Comment "STUDIO" below and I will send you my personal workflow template completely free.',
      targetDuration: duration,
      tone,
      language,
      targetAudience,
      wordCount: 195,
    };
  }

  return {
    hook: `If you are still spending 8 hours editing, writing titles, and struggling over thumbnails for every single video, you are working against yourself. In this video, I'm peeling back the exact architecture behind "${cleanTitle}"—and showing you how top creators produce twice the content in half the time without sacrificing quality.`,
    introduction: `Welcome back to the studio. Over the last 12 months, the creator landscape shifted permanently. It is no longer about grinding 60-hour weeks; it is about building an intelligent production loop. Today, I'm sharing the complete end-to-end framework: from initial spark to locked script, dynamic thumbnail design, and high-retention editing cues. Let's jump straight into phase one.`,
    sections: [
      {
        id: 'sec-1',
        name: 'Phase 1: The High-Concept Foundation',
        durationEst: '2m 15s',
        content: `Before you write a single word of your script, you need to validate whether the premise has natural viral tension. Most creators think of a title at the very end—that is fatal. When you start with the title and the thumbnail concept first, your script becomes laser-focused on delivering the emotional payoff. Notice how in our tests, validating the title first increased average watch-through rates by 27%.`,
        visualCue: '[A-Roll centered camera with warm studio backdrop. Pop-up graph showing CTR vs Watch Time correlation curves.]',
      },
      {
        id: 'sec-2',
        name: 'Phase 2: The Narrative Engine & Retention Pacing',
        durationEst: '3m 30s',
        content: `Now let's talk about the body of the video. The fatal trap is the "Information Dump"—reciting facts with no emotional stakes. Instead, use what I call the Tension-Release Loop. Every time you answer a question for the viewer, immediately introduce a higher-stakes consequence for the next chapter. For example, when demonstrating ${topic}, don't just show the tool—show the catastrophic mistake made when you don't calibrate the output.`,
        visualCue: '[Screen recording with zoom blur transitions, showing real-time prompt generation and script adjustments in CreatorAI Studio.]',
      },
      {
        id: 'sec-3',
        name: 'Phase 3: The Production Acceleration Secret',
        durationEst: '2m 45s',
        content: `Here is the practical secret: decouple your creative thinking from administrative tasks. When you automate transcription summaries, chapter timestamps, and negative prompt generation, you regain the mental bandwidth required to deliver a charismatic on-camera presence. High-performing creators don't work harder; they operate with better leverage.`,
        visualCue: '[B-roll of dual monitor workspace, seamless transitions, sound design riser cue]',
      },
    ],
    transitions: [
      'Now that the core thesis is locked, let us look at the visual execution...',
      'Which brings us to the single biggest leverage point in the whole pipeline...',
      'Before we wrap up, there is one critical caveat you must know...',
    ],
    cta: `If this breakdown gave you clarity, hit the subscribe button and tap the bell icon. We publish deep-dive creator systems every single Tuesday.`,
    outro: `Drop a comment with your biggest bottleneck in your current video workflow, and I will personally reply to help troubleshoot it. Check the links in the description for all the templates shown today. See you in the next breakdown!`,
    targetDuration: duration,
    tone,
    language,
    targetAudience,
    wordCount: 840,
  };
}
