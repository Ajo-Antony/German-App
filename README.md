# 🇩🇪 DeutschMeister — German Learning App

A full-featured German language learning web app with:

- 🗣️ **Speaking Practice** — Listen, record, get AI pronunciation feedback
- 📚 **Vocabulary Flashcards** — 300+ built-in words (Basics, Travel, Food, Business, Numbers, Adjectives, Nouns, Sentences) with flip cards and TTS
- 🧠 **AI Quiz Chat** — Chat with "Dieter", your AI German tutor
- 📄 **PDF Word Library** — Upload German PDFs, AI extracts vocabulary, stored permanently
- 🏆 **Milestones** — Track every phrase you practice

---

## 🚀 Deploy to Vercel

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
gh repo create deutschmeister --public --push
```

### 2. Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) → New Project
2. Import your GitHub repo
3. Add environment variable:
   - **Name:** `GROQ_API_KEY`
   - **Value:** Your key from [console.groq.com](https://console.groq.com)
4. Click **Deploy** ✅

### 3. Get Anthropic API Key (Free tier available)
1. Go to [console.groq.com](https://console.groq.com)
2. Sign up / log in
3. Go to API Keys → Create Key
4. Copy and paste into Vercel environment variables

---

## 🛠️ Run Locally

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
# Edit .env.local and add your GROQ_API_KEY

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Features

| Feature | Details |
|---|---|
| Speaking levels | Beginner (A1/A2), Intermediate (B1/B2), Advanced (C1/C2) |
| TTS | Browser Web Speech API — German voice |
| Recording | Browser Speech Recognition API (Chrome recommended) |
| AI Feedback | Claude claude-sonnet-4-6 — warm, encouraging feedback |
| Flashcards | Flip cards with gender colors, pronunciation, examples |
| PDF Upload | Claude extracts all German words from uploaded PDFs |
| Storage | PDF library & milestones saved to localStorage (persists across sessions) |
| Quiz | Full AI chat tutor — grammar, vocabulary, exercises |

## Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Styling:** CSS variables + Tailwind CSS
- **AI:** Groq API (llama-3.3-70b-versatile)
- **TTS:** Web Speech API (free, built-in browser)
- **Storage:** localStorage for PDF docs & milestones
- **Deployment:** Vercel
