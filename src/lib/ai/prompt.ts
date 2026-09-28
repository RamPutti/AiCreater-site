import { ImagePromptData } from '@/types';
import { simulateAiDelay, isRealAiConfigured } from './config';

export interface GeneratePromptParams {
  topic: string;
  subject: string;
  environment: string;
  visualStyle: string;
  mood: string;
  cameraAngle: string;
  lighting: string;
  aspectRatio: '16:9' | '9:16' | '1:1' | '4:5' | '21:9';
  isImproveAction?: boolean;
}

export async function generateImagePrompt(params: GeneratePromptParams): Promise<ImagePromptData> {
  await simulateAiDelay(700, 1300);

  const {
    topic,
    subject = 'Futuristic content creator at holographic editing desk',
    environment = 'Cyber-sleek studio loft overlooking a glowing metropolis at dusk',
    visualStyle = 'Cinematic Hyper-Realistic 8K',
    mood = 'Inspiring, electric, high-energy',
    cameraAngle = 'Low angle heroic portrait with slight dynamic tilt',
    lighting = 'Volumetric dual rim lighting in neon electric purple and cyan blue, soft diffused key light',
    aspectRatio = '16:9',
    isImproveAction = false,
  } = params;

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
              content: 'You are a master Midjourney v6 and Flux prompt engineer specializing in viral YouTube thumbnails and cinematic visuals. Respond with JSON matching the schema.',
            },
            {
              role: 'user',
              content: `Generate detailed prompt for: ${topic}, Subject: ${subject}, Style: ${visualStyle}, Lighting: ${lighting}, Aspect Ratio: ${aspectRatio}. Mode: ${isImproveAction ? 'Maximum photorealism and contrast enhancement' : 'Standard'}`,
            },
          ],
          response_format: { type: 'json_object' },
        }),
      });
      if (res.ok) {
        const json = await res.json();
        const parsed = JSON.parse(json.choices[0].message.content);
        return {
          topic,
          subject,
          environment,
          visualStyle,
          mood,
          cameraAngle,
          lighting,
          aspectRatio,
          detailedPrompt: parsed.detailedPrompt,
          negativePrompt: parsed.negativePrompt,
          technicalSpecs: parsed.technicalSpecs || {
            lens: '85mm f/1.4 prime lens',
            camera: 'ARRI Alexa Mini LF',
            depthOfField: 'Shallow bokeh with crisp focal separation',
            textures: 'Micro-textured matte surfaces and reflective glass',
            colors: 'Deep obsidian, vivid ultraviolet (#8B5CF6), radiant cobalt (#3B82F6)',
          },
        };
      }
    } catch {
      // Fallback cleanly to mock engine
    }
  }

  // Realistic Pro Prompt Engine
  const boostModifier = isImproveAction
    ? 'Photorealistic masterpiece, shot on Hasselblad H6D-100c, Unreal Engine 5.4 render quality, photometrics calibrated for YouTube 16:9 click-through rate, extreme micro-details in facial expressions and ambient particles'
    : 'Award-winning commercial photography, hyper-detailed render, clean visual focal separation for instant mobile recognition';

  const promptBody = `${visualStyle} of ${subject}, positioned centrally within ${environment}. ${cameraAngle}, bathed in ${lighting}. Atmospheric ${mood} mood with floating luminous data points and subtle motion blur on background elements. Precise chromatic calibration, edge-to-edge sharpness on subject with creamy cinematic bokeh. ${boostModifier} --ar ${aspectRatio} --v 6.1 --style raw --q 2 --s 750`;

  return {
    topic: topic || 'High Impact Visual Asset',
    subject,
    environment,
    visualStyle,
    mood,
    cameraAngle,
    lighting,
    aspectRatio,
    detailedPrompt: promptBody,
    negativePrompt:
      'cartoonish, blurry, low resolution, oversaturated plastic skin, distorted anatomy, extra limbs, ugly text artifacts, cluttered background, muddy lighting, watermark, amateur framing',
    technicalSpecs: {
      lens: 'Sony G-Master 50mm f/1.2 at f/1.8 for dramatic cinematic separation',
      camera: 'RED V-Raptor 8K VV cinema sensor with high dynamic range',
      depthOfField: 'Subtle shallow focus isolating the subject sharply against ambient studio bokeh',
      textures: 'Micro-pores on skin, brushed aerospace aluminum, refractive acrylic glass, soft ambient haze',
      colors: 'Obsidian black (#080B11), Electric violet (#8B5CF6), Neon blue (#3B82F6), High-contrast highlights',
    },
  };
}
