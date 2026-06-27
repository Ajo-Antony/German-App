# 🇩🇪 DeutschMeister — German Learning App

A full-featured German language learning web app with:

- 🗣️ **Speaking Practice** — Listen, record, get AI pronunciation feedback
- 📚 **Vocabulary Flashcards** — 330+ built-in words with flip cards and TTS
- 🧠 **AI Quiz Chat** — Chat with "Dieter", your AI German tutor
- 🌐 **Translator** — German ↔ English with text-to-speech
- 📄 **PDF Word Library** — Upload German PDFs, AI extracts vocabulary
- 🏆 **Milestones** — Track every phrase you practice

---

## 🚀 Deploy to Vercel (Free)

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
3. Add these environment variables:

| Name | Where to get it |
|---|---|
| `GROQ_API_KEY` | [console.groq.com](https://console.groq.com) → API Keys (free) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase dashboard → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase dashboard → Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase dashboard → Settings → API |

4. Click **Deploy** ✅

---

## 🛠️ Run Locally

```bash
npm install
cp .env.example .env.local
# Fill in your keys in .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Tech Stack
- **Framework:** Next.js 14 (App Router)
- **AI:** Groq API — llama-3.3-70b-versatile (free tier)
- **Database:** Supabase (free tier) — milestones & PDF library
- **TTS / Speech:** Web Speech API (free, built into browser)
- **Deployment:** Vercel (free tier)
