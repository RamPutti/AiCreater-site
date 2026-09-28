export type ContentPlatform = 'YouTube' | 'TikTok' | 'Instagram' | 'X/Twitter' | 'LinkedIn' | 'Podcast';

export type ProjectStatus = 
  | 'Draft'
  | 'In Progress'
  | 'Idea' 
  | 'Script' 
  | 'Recording' 
  | 'Editing' 
  | 'Ready' 
  | 'Scheduled' 
  | 'Published';

export interface ScriptSection {
  id: string;
  name: string;
  durationEst: string;
  content: string;
  visualCue?: string;
}

export interface ScriptData {
  hook: string;
  introduction: string;
  sections: ScriptSection[];
  transitions: string[];
  cta: string;
  outro: string;
  targetDuration: string;
  tone: string;
  language: string;
  targetAudience: string;
  wordCount: number;
}

export interface TranscriptChapter {
  timecode: string;
  title: string;
  summary: string;
}

export interface TranscriptData {
  rawText: string;
  summary: string;
  keyPoints: string[];
  importantMoments: string[];
  chapters: TranscriptChapter[];
  keywords: string[];
  videoDescription: string;
  actionItems: string[];
  summaryType: 'quick' | 'standard' | 'detailed';
}

export interface ImagePromptData {
  topic: string;
  subject: string;
  environment: string;
  visualStyle: string;
  mood: string;
  cameraAngle: string;
  lighting: string;
  aspectRatio: '16:9' | '9:16' | '1:1' | '4:5' | '21:9';
  detailedPrompt: string;
  negativePrompt: string;
  technicalSpecs: {
    lens: string;
    camera: string;
    depthOfField: string;
    textures: string;
    colors: string;
  };
}

export interface ThumbnailElement {
  id: string;
  type: 'headline' | 'subtext' | 'badge' | 'avatar' | 'shape';
  text?: string;
  color?: string;
  backgroundColor?: string;
  fontSize?: number;
  xPercent: number; // 0 to 100
  yPercent: number; // 0 to 100
  visible: boolean;
}

export interface ThumbnailConcept {
  id: string;
  name: string;
  layout: string;
  headline: string;
  subtext?: string;
  badge?: string;
  bgColor: string;
  bgGradient: string;
  lightingEffect: string;
  subjectMood: string;
  contrastScore: number; // e.g. 92%
  readabilityScore: string; // 'High' | 'Very High'
  previewGradient: string;
}

export interface ThumbnailDesignAnalysis {
  compositionScore: number;
  contrastScore: number;
  readabilityScore: number;
  subjectFocusScore: number;
  visualHierarchyScore: number;
  mobileVisibilityScore: number;
  spacingScore: number;
  overallRating: 'Strong' | 'Good' | 'Needs improvement' | 'Review';
  recommendations: string[];
}

export interface ThumbnailData {
  title: string;
  topic: string;
  niche: string;
  targetAudience: string;
  visualStyle: string;
  emotion: string;
  colorMood: string;
  layoutPreset: string;
  activeConceptId: string;
  concepts: ThumbnailConcept[];
  customElements: ThumbnailElement[];
  analysis: ThumbnailDesignAnalysis;
  accentColor: string;
  aspectRatio: '16:9';
}

export interface MetadataVariation {
  id: string;
  title: string;
  score: number;
  ctrPrediction: string;
  characterCount: number;
}

export interface MetadataData {
  titleVariations: MetadataVariation[];
  selectedTitle: string;
  description: string;
  tags: string[];
  keywords: string[];
  hashtags: string[];
  chapters: string[];
  pinnedComment: string;
}

export interface ContentCalendarItem {
  id: string;
  title: string;
  platform: ContentPlatform;
  publishingDate: string; // YYYY-MM-DD
  publishingTime?: string;
  status: ProjectStatus;
  description: string;
  notes?: string;
  projectId?: string;
}

export interface Project {
  id: string;
  name: string;
  videoTitle: string;
  topic: string;
  description: string;
  targetAudience: string;
  platform: ContentPlatform;
  status: ProjectStatus;
  publishingDate: string;
  thumbnailUrl?: string;
  script?: ScriptData;
  transcript?: TranscriptData;
  prompts?: ImagePromptData;
  thumbnail?: ThumbnailData;
  metadata?: MetadataData;
  createdAt: string;
  updatedAt: string;
}

export interface CreatorProfile {
  id: string;
  name: string;
  email: string;
  channelName: string;
  avatarUrl: string;
  niche: string;
  subscriberCount: string;
  plan: 'free' | 'creator' | 'pro';
}
