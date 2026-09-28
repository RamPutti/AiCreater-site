import { ThumbnailConcept, ThumbnailData, ThumbnailDesignAnalysis } from '@/types';
import { simulateAiDelay } from './config';

export interface GenerateThumbnailParams {
  title: string;
  topic: string;
  niche: string;
  targetAudience: string;
  visualStyle: string;
  emotion: string;
  colorMood: string;
  layoutPreset: string;
}

export const THUMBNAIL_LAYOUT_PRESETS = [
  { id: 'face-bold-text', name: 'Face + Bold Text', icon: 'User', desc: 'High-contrast presenter face with heavy uppercase typography' },
  { id: 'problem-solution', name: 'Problem vs Solution', icon: 'Split', desc: 'Split dual composition showing the struggle and the breakthrough' },
  { id: 'before-after', name: 'Before vs After', icon: 'Sliders', desc: 'Dramatic transformation comparison with visual demarcation' },
  { id: 'product-focus', name: 'Product Focus', icon: 'Package', desc: 'Central hero product with glowing backlight and feature callouts' },
  { id: 'cinematic', name: 'Cinematic', icon: 'Film', desc: 'Moody 2.39:1 lighting, rich color grading and film grain texture' },
  { id: 'reaction', name: 'Shock & Reaction', icon: 'Smile', desc: 'Expressive reaction portrait with explosive directional arrows or badges' },
  { id: 'technology', name: 'Tech & Futuristic', icon: 'Cpu', desc: 'Cyber neon glow, holographic HUD elements and circuit aesthetics' },
  { id: 'minimal', name: 'Modern Minimal', icon: 'Layout', desc: 'Ultra-clean negative space with surgical typography and subtle drop-shadow' },
  { id: 'education', name: 'Educational Breakdown', icon: 'GraduationCap', desc: 'Structured diagrammatic layout with badge pill and metric stat' },
  { id: 'gaming', name: 'Gaming High-Octane', icon: 'Gamepad2', desc: 'Vibrant RGB lighting, motion blur streaks and bold 3D outline text' },
  { id: 'business', name: 'Business & Finance', icon: 'TrendingUp', desc: 'Sleek corporate dark mode with green/gold growth trajectory visual' },
  { id: 'storytelling', name: 'Storytelling Narrative', icon: 'BookOpen', desc: 'Intriguing atmospheric mystery scene that begs to be clicked' },
];

export async function generateThumbnails(params: GenerateThumbnailParams): Promise<ThumbnailData> {
  await simulateAiDelay(1100, 1700);

  const {
    title = 'How AI Changes Everything in 2026',
    topic = 'AI Content Creation',
    niche = 'Technology',
    targetAudience = 'Creators & Developers',
    visualStyle = 'Futuristic Neon',
    emotion = 'Excitement & Shock',
    colorMood = 'Electric Purple & Blue',
    layoutPreset = 'face-bold-text',
  } = params;

  // Generate 4 distinct production-grade concepts based on inputs
  const concepts: ThumbnailConcept[] = [
    {
      id: 'concept-1',
      name: 'Electric Neon Impact',
      layout: layoutPreset,
      headline: 'THE 2026 AI SHIFT',
      subtext: 'IT CHANGES EVERYTHING',
      badge: '98% FASTER',
      bgColor: '#080B11',
      bgGradient: 'radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.45) 0%, rgba(59, 130, 246, 0.25) 45%, #080B11 85%)',
      lightingEffect: 'Volumetric violet edge rim light with dual cyan backfill',
      subjectMood: emotion || 'Shock / Intrigue',
      contrastScore: 94,
      readabilityScore: 'Very High',
      previewGradient: 'from-purple-900/60 via-indigo-900/40 to-slate-950',
    },
    {
      id: 'concept-2',
      name: 'Split Contrast Dilemma',
      layout: 'problem-solution',
      headline: 'DON\'T DO THIS!',
      subtext: 'DO THIS INSTEAD',
      badge: 'NEW METHOD',
      bgColor: '#0A0E17',
      bgGradient: 'linear-gradient(90deg, rgba(239, 68, 68, 0.3) 0%, rgba(10, 14, 23, 0.8) 50%, rgba(16, 185, 129, 0.3) 100%)',
      lightingEffect: 'Dual-toned dramatic split: crimson shadow vs emerald glow',
      subjectMood: 'Comparative reaction',
      contrastScore: 96,
      readabilityScore: 'Very High',
      previewGradient: 'from-red-950/50 via-slate-900 to-emerald-950/50',
    },
    {
      id: 'concept-3',
      name: 'Cinematic Hyper-Minimal',
      layout: 'cinematic',
      headline: 'THE END OF EDITING',
      subtext: 'The 1-Click Studio',
      badge: 'UNRELEASED',
      bgColor: '#05070A',
      bgGradient: 'radial-gradient(ellipse at 50% 50%, rgba(59, 130, 246, 0.3) 0%, rgba(15, 23, 42, 0.6) 50%, #05070A 90%)',
      lightingEffect: 'Cold anamorphic blue streak with soft ambient key light',
      subjectMood: 'Intense focus / Determination',
      contrastScore: 89,
      readabilityScore: 'High',
      previewGradient: 'from-blue-950/60 via-slate-900 to-black',
    },
    {
      id: 'concept-4',
      name: 'High-Stakes Metric Proof',
      layout: 'business',
      headline: '10X YOUR OUTPUT',
      subtext: 'Zero Team Needed',
      badge: 'PROVEN SYSTEM',
      bgColor: '#070A10',
      bgGradient: 'radial-gradient(circle at 20% 80%, rgba(168, 85, 247, 0.4) 0%, rgba(14, 165, 233, 0.2) 60%, #070A10 100%)',
      lightingEffect: 'Gold accent halo glow with sharp rim separation',
      subjectMood: 'Confident victory / Smirk',
      contrastScore: 92,
      readabilityScore: 'Very High',
      previewGradient: 'from-purple-950/50 via-cyan-950/40 to-slate-950',
    },
  ];

  const analysis: ThumbnailDesignAnalysis = {
    compositionScore: 95,
    contrastScore: 92,
    readabilityScore: 96,
    subjectFocusScore: 90,
    visualHierarchyScore: 94,
    mobileVisibilityScore: 91,
    spacingScore: 88,
    overallRating: 'Strong',
    recommendations: [
      'Text typography utilizes heavy sans-serif weight with black drop shadow, ensuring 100% legibility on mobile YouTube app feeds.',
      'Primary focal subject is anchored in the left two-thirds, preserving the bottom-right corner for the YouTube timestamp overlay.',
      'Background and foreground color temperature delta is 42%, creating crisp subject separation without harsh cutouts.',
      'Visual hierarchy leads viewer from high-contrast headline word down to the expressive subject face within 150 milliseconds.',
    ],
  };

  return {
    title,
    topic,
    niche,
    targetAudience,
    visualStyle,
    emotion,
    colorMood,
    layoutPreset,
    activeConceptId: 'concept-1',
    concepts,
    customElements: [
      {
        id: 'el-badge',
        type: 'badge',
        text: '🔥 2026 BLUEPRINT',
        color: '#FFFFFF',
        backgroundColor: '#8B5CF6',
        fontSize: 14,
        xPercent: 8,
        yPercent: 12,
        visible: true,
      },
      {
        id: 'el-headline',
        type: 'headline',
        text: 'THE 2026 AI SHIFT',
        color: '#FFFFFF',
        backgroundColor: 'transparent',
        fontSize: 38,
        xPercent: 8,
        yPercent: 28,
        visible: true,
      },
      {
        id: 'el-subtext',
        type: 'subtext',
        text: 'DON\'T GET LEFT BEHIND',
        color: '#FACC15',
        backgroundColor: 'rgba(0,0,0,0.6)',
        fontSize: 22,
        xPercent: 8,
        yPercent: 48,
        visible: true,
      },
      {
        id: 'el-avatar',
        type: 'avatar',
        color: '#3B82F6',
        xPercent: 68,
        yPercent: 25,
        visible: true,
      },
    ],
    analysis,
    accentColor: '#8B5CF6',
    aspectRatio: '16:9',
  };
}
