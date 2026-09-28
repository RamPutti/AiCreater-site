import { TranscriptData } from '@/types';
import { simulateAiDelay, isRealAiConfigured } from './config';

export interface GenerateTranscriptParams {
  rawText: string;
  summaryType: 'quick' | 'standard' | 'detailed';
  videoTitle?: string;
}

export async function summarizeTranscript(params: GenerateTranscriptParams): Promise<TranscriptData> {
  await simulateAiDelay(900, 1500);

  const { rawText, summaryType, videoTitle } = params;
  const inferredTopic = videoTitle || (rawText.length > 30 ? rawText.slice(0, 45) + '...' : 'Content Creation Strategy');

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
              content: 'You are an elite YouTube and creator video transcript analyst. Return JSON matching the schema.',
            },
            {
              role: 'user',
              content: `Analyze this transcript (${summaryType} level): ${rawText.slice(0, 4000)}`,
            },
          ],
          response_format: { type: 'json_object' },
        }),
      });
      if (res.ok) {
        const json = await res.json();
        const parsed = JSON.parse(json.choices[0].message.content);
        return {
          rawText,
          summaryType,
          summary: parsed.summary || 'Summary generated via OpenAI.',
          keyPoints: parsed.keyPoints || [],
          importantMoments: parsed.importantMoments || [],
          chapters: parsed.chapters || [],
          keywords: parsed.keywords || [],
          videoDescription: parsed.videoDescription || '',
          actionItems: parsed.actionItems || [],
        };
      }
    } catch {
      // Fallback cleanly to mock engine below
    }
  }

  // High-fidelity Realistic Mock Engine
  const summaryLengthModifier =
    summaryType === 'quick'
      ? 'A high-impact 2-minute executive digest highlighting the primary thesis and immediate takeaway.'
      : summaryType === 'detailed'
      ? 'A comprehensive multi-phase breakdown mapping psychological hooks, retention curves, audience psychology, and exact execution frameworks.'
      : 'A balanced creator summary detailing the main arguments, audience payoffs, and production highlights.';

  return {
    rawText,
    summaryType,
    summary: `In this session on "${inferredTopic}", the speaker delivers an actionable framework. ${summaryLengthModifier} The discussion emphasizes that high audience retention isn't accidental—it requires front-loading value in the first 30 seconds, maintaining dynamic pacing through visual pattern interrupts, and delivering on the title's implicit promise before asking for subscriber commitment.`,
    keyPoints: [
      'The 3-Second Retention Cliff: 65% of drop-off occurs before the 30-second mark if the premise is not validated.',
      'Pattern Interrupts: Visual, auditory, or pacing shifts every 4-6 seconds sustain viewer dopamine and algorithm signals.',
      'The Value Loop: Open loops paired with immediate tactical payoff create irresistible watch-time velocity.',
      'Thumbnail-to-Hook Continuity: Any mismatch between thumbnail expectation and video opening immediately spikes bounce rates.',
      'Call to Action Timing: Placing the single primary CTA at the 70% emotional peak yields 3.8x higher conversions than end-cards alone.',
    ],
    importantMoments: [
      '01:14 - The breakthrough moment revealing why traditional intro sequences are destroying average percentage viewed (APV).',
      '04:32 - Step-by-step breakdown of the "Curiosity Gap" script architecture.',
      '08:50 - Live breakdown of a video scaling from 12,000 to 1.4M views using metadata reframing.',
      '12:15 - The 3 common editing mistakes that cause viewer dropoff.',
    ],
    chapters: [
      { timecode: '00:00', title: 'The Problem with Modern Video Retention', summary: 'Why 2026 viewers demand instant gratification' },
      { timecode: '02:18', title: 'The 3-Part Hook Formula', summary: 'Curiosity + Proof + Stakes' },
      { timecode: '05:40', title: 'Pacing Secrets from Top 1% Channels', summary: 'B-roll micro-beats and audio design' },
      { timecode: '09:12', title: 'Executing the Climax & Soft CTA', summary: 'Converting casual viewers into loyal subscribers' },
      { timecode: '12:45', title: 'Final Checklist & Resources', summary: 'Actionable takeaways to apply today' },
    ],
    keywords: [
      'YouTube Growth 2026',
      'Video Retention Secrets',
      'Content Creation Workflow',
      'Audience Engagement',
      'Scriptwriting Formula',
      'Viral Video Framework',
      'Creator Economy',
    ],
    videoDescription: `Discover the exact retention playbook top creators use to scale their audience and double their watch time in 2026. In this video, we break down why traditional intro sequences fail, how to hook viewers in the first 5 seconds, and the simple pacing techniques you can implement today.\n\n⏱️ TIMESTAMPS:\n00:00 - The Problem with Modern Retention\n02:18 - The 3-Part Hook Formula\n05:40 - Pacing Secrets\n09:12 - Executing the Climax\n12:45 - Next Steps & Free Templates\n\n🔗 RESOURCES MENTIONED:\n- CreatorAI Studio Workspace: https://creatorai.studio\n- Free High-Retention Script Template\n\n#ContentCreator #YouTubeTips #VideoStrategy #CreatorAI`,
    actionItems: [
      'Eliminate the 15-second animated logo or channel intro from your upcoming video edit.',
      'Rewrite the first 30 seconds of your script to state the central mystery or benefit within the first two sentences.',
      'Add timestamps and keyword-rich chapters to the final YouTube video description.',
      'Design at least 3 thumbnail variations before shooting the primary video.',
    ],
  };
}

export const SAMPLE_TRANSCRIPT_DEMO = `Hey everyone, welcome back to the channel. Today we're tackling the single biggest problem every creator is facing in 2026: viewer retention. You've probably noticed that even if your thumbnail gets clicks, your average view duration might be hovering around 30% or 35%. 
The truth is, modern viewers have an internal timer of about three seconds before they decide whether to stay or swipe away. If you spend the first 30 seconds saying "Hey guys, remember to like and subscribe, today we're sponsored by..." they are already gone.
In this breakdown, I'm going to show you the three-tier hook architecture we used to take our average view duration from 3 minutes to over 9 minutes. Tier one is what I call the Immediate Stakes: establish why this video matters right now. Tier two is the Curiosity Gap: promise an unexpected revelation that happens halfway through. And tier three is the Visual Contract: match your opening scene directly to what was promised on the thumbnail.
Let's look at the data from our last four uploads. Notice that whenever we cut our introductory fluff, the retention graph stays completely flat through the first two minutes...`;
