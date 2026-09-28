# CreatorAI Studio ⚡

> **The All-In-One AI-Powered Workspace for Modern Creators**  
> Go from: **IDEA → SCRIPT → TRANSCRIPT → PROMPT → THUMBNAIL → METADATA → SCHEDULE → PUBLISH**

CreatorAI Studio brings the complete creator production pipeline into one unified, high-velocity SaaS application. It combines deep psychological video retention scripting, a strict 16:9 thumbnail design studio with mobile heuristics, automatic transcript chapters, cinematic Midjourney/Flux prompt engineering, high-CTR YouTube metadata, and a multi-platform content calendar.

---

## 🚀 Key Features & Highlights

### 1. Main WOW Feature: 16:9 AI Thumbnail Studio (`/tools/thumbnail`)
- **Strict 16:9 Canvas Ratio**: Calibrated for YouTube desktop & mobile video cards.
- **12 Curated Viral Layout Presets**: Face + Bold Text, Problem vs Solution, Before vs After, Product Focus, Cinematic, Shock & Reaction, Technology, Minimal, Education, Gaming, Business, and Storytelling.
- **4 Distinct Concept Variations**: Instant generation of 4 concepts with contrast ratings and lighting separations.
- **Real-Time Canvas Overrides**: Live editing of bold headlines, subtext badges, layer visibility, and color moods.
- **AI Design Analysis Panel**: Heuristic scores for Composition (95%), Contrast (92%), Text Readability (96%), Subject Focus, Visual Hierarchy, and Spacing.
- **Mobile Feed Simulator**: Previews how the thumbnail appears inside a 360px mobile YouTube client with duration stamp.
- **Instant 1080p PNG Export**: Offscreen HTML5 canvas rendering to download full-resolution thumbnail files.

### 2. Retention Script Generator (`/tools/script`)
- 3-tier hook framework: Curiosity + Stakes + Proof.
- 7 distinct tone engines: Professional, Educational, Energetic, Storytelling, Funny, Cinematic, Conversational.
- Visual B-roll cues and sound design markers embedded directly in the script editor.
- 1-click Rewrite, Expand, and Shorten controls.

### 3. Transcript Summarizer & Chapters (`/tools/transcript`)
- Paste raw transcript or upload `.txt`, `.vtt`, `.srt` files.
- Quick, Standard, and Detailed summary compression levels.
- Auto-calculated timestamps ready to paste into YouTube video descriptions.
- Key takeaways and production action checklists.

### 4. Cinematic Image Prompt Studio (`/tools/prompt`)
- Calibrated for Midjourney v6.1 and Flux.
- Camera optics: 85mm prime lens f/1.4, ARRI Alexa Mini LF sensor, volumetric rim lighting, depth of field.
- Negative prompt filtering to suppress distortions, plastic skin, and watermarks.
- 1-click "Improve Prompt" boost.

### 5. YouTube SEO & CTR Metadata Optimizer (`/tools/metadata`)
- 5 unique title variations with predicted CTR ratings and character count validation.
- Keyword-rich descriptions with chapters, resource links, and hashtags.
- Pinned comment engagement hooks.

### 6. Multi-Platform Content Planner (`/calendar`)
- Month, Week, and List calendar views.
- Track 7 production statuses: *Idea, Script, Recording, Editing, Ready, Scheduled, Published*.
- Linked directly to project workspaces.

### 7. Creator Project Vault (`/projects` & `/projects/[id]`)
- Centralized project folders containing all scripts, transcripts, thumbnails, prompts, and metadata.
- Autosave with localStorage persistence and Supabase PostgreSQL readiness.

---

## 🛠 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI & Styling**: React 19, Tailwind CSS, Lucide React icons
- **State Management**: Centralized React context store with offline/localStorage persistence
- **Database & Auth**: Supabase PostgreSQL architecture with Row Level Security (RLS)
- **AI Architecture**: Pluggable AI service modules with built-in Autonomous Studio Demo Engine (zero setup required to test)

---

## 📦 Getting Started

### 1. Clone & Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Configure your credentials (optional — autonomous demo mode works immediately if left blank):
```env
# Optional: Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Optional: OpenAI API Key
OPENAI_API_KEY=sk-proj-...
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗄 Database Setup (Supabase)

To link your own Supabase project:
1. Create a new Supabase project at [supabase.com](https://supabase.com).
2. Go to the SQL Editor in Supabase.
3. Paste and run the entire SQL script from `src/lib/supabase/schema.sql`.
4. Copy your project URL and anon public key into `.env.local`.

---

## 🌐 Deploy to Vercel

CreatorAI Studio is 100% Vercel-ready with zero server-side state lock-in:
```bash
npx vercel
```
Or import the repository directly into the Vercel dashboard.

---

## 📄 License
MIT License. Built for modern content creators.
