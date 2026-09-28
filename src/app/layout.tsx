import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { CreatorStoreProvider } from '@/lib/store/creator-store';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'CreatorAI Studio — The All-In-One AI Workspace for Modern Creators',
  description:
    'Go from Idea → Script → Transcript → Prompt → Thumbnail → Metadata → Schedule → Publish. One intelligent workspace for YouTubers, video editors, and digital creators.',
  keywords: [
    'AI creator studio',
    'YouTube script generator',
    'AI thumbnail generator',
    'video transcript summarizer',
    'content calendar',
    'video SEO metadata',
  ],
  authors: [{ name: 'CreatorAI Studio Team' }],
  openGraph: {
    title: 'CreatorAI Studio — The All-In-One AI Workspace for Modern Creators',
    description: 'Transform your content production workflow with autonomous AI tools in a unified 16:9 creative studio.',
    url: 'https://creatorai.studio',
    siteName: 'CreatorAI Studio',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CreatorAI Studio — Create Smarter. Publish Faster.',
    description: 'Your AI-powered workspace for scripts, transcripts, prompts, thumbnails, metadata, and content planning.',
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-icon.svg', type: 'image/svg+xml' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark antialiased`}
    >
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col font-sans selection:bg-[var(--primary)] selection:text-white">
        <CreatorStoreProvider>{children}</CreatorStoreProvider>
      </body>
    </html>
  );
}
