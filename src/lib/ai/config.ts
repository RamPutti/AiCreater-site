// AI Engine Configuration & Mode Detection

export const isRealAiConfigured = (): boolean => {
  return typeof process !== 'undefined' && Boolean(process.env.NEXT_PUBLIC_OPENAI_API_KEY || process.env.OPENAI_API_KEY);
};

export const getAiStatus = () => {
  const configured = isRealAiConfigured();
  return {
    isLive: configured,
    mode: configured ? ('Live AI API (OpenAI)' as const) : ('Realistic Studio Mock Engine (Autonomous)' as const),
    provider: configured ? 'GPT-4o / Claude 3.5' : 'CreatorAI Autonomous Neural Engine (Local Demo)',
  };
};

// Simulate realistic streaming or thinking delay
export const simulateAiDelay = async (minMs = 800, maxMs = 1600): Promise<void> => {
  const delay = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
  return new Promise((resolve) => setTimeout(resolve, delay));
};
