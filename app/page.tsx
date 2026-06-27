'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Mic, MicOff, Volume2, BookOpen, MessageSquare, Upload, Star,
  ChevronRight, Check, X, RotateCcw, Play, Pause, Square, Trophy, Zap,
  Brain, Globe, Coffee, Briefcase, Hash, Layers, FileText,
  ChevronDown, ChevronUp, Send, Plus, Eye, EyeOff, Home,
  GraduationCap, Target, Loader
} from 'lucide-react';
import { vocabulary, phrases, VocabWord, Phrase, VocabCategory } from '@/data/vocabulary';

// ─── TTS utility ─────────────────────────────────────────────────────────────
function speak(text: string, lang = 'de-DE', rate = 0.85) {
  if (typeof window === 'undefined') return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang;
  u.rate = rate;
  u.pitch = 1;
  const voices = window.speechSynthesis.getVoices();
  const german = voices.find(v => v.lang.startsWith('de'));
  if (german) u.voice = german;
  window.speechSynthesis.speak(u);
}

// ─── Types ────────────────────────────────────────────────────────────────────
type Tab = 'home' | 'speaking' | 'flashcards' | 'quiz' | 'milestones' | 'pdf';
type SpeakLevel = 'Beginner' | 'Intermediate' | 'Advanced';
type ChatMsg = { role: 'user' | 'assistant'; content: string };
interface PdfWord { german: string; english: string; example?: string; exampleTranslation?: string; type?: string; }
interface PdfDoc { id: string; name: string; words: PdfWord[]; date: string; rawText?: string; }
interface Milestone { id: string; phraseId: string; german: string; date: string; score: string; }

// ─── Shared styles ────────────────────────────────────────────────────────────
const S = {
  goldText: { color: 'var(--gold)', fontFamily: 'Georgia, serif' },
  muted:    { color: 'var(--muted)' },
  serif:    { fontFamily: 'Georgia, serif' },
  input: {
    width: '100%',
    padding: '12px 16px',
    background: 'linear-gradient(180deg, #1a0c04 0%, #241208 100%)',
    border: '1px solid var(--border-light)',
    borderRadius: 10,
    color: 'var(--text)',
    fontSize: 15,
    fontFamily: 'Georgia, serif',
    outline: 'none',
    boxShadow: '0 2px 8px rgba(0,0,0,0.5) inset, 0 1px 0 rgba(255,180,80,0.05)',
  } as React.CSSProperties,
} as const;

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState<Tab>('home');
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [pdfDocs, setPdfDocs] = useState<PdfDoc[]>([]);

  useEffect(() => {
    const init = async () => {
      try {
        const [msRes, pdRes] = await Promise.all([
          fetch('/api/milestones-db'),
          fetch('/api/pdf-docs'),
        ]);
        const msData = await msRes.json();
        const pdData = await pdRes.json();
        if (msData.milestones) setMilestones(msData.milestones);
        if (pdData.docs) setPdfDocs(pdData.docs);
      } catch (e) { console.error('Failed to load from DB:', e); }
    };
    init();
  }, []);

  const addMilestone = async (phraseId: string, german: string, score: string) => {
    const m: Milestone = { id: Date.now().toString(), phraseId, german, date: new Date().toISOString(), score };
    setMilestones(prev => [m, ...prev].slice(0, 200));
    try {
      await fetch('/api/milestones-db', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(m),
      });
    } catch (e) { console.error('Failed to save milestone:', e); }
  };

  const refreshPdfDocs = async () => {
    try {
      const res = await fetch('/api/pdf-docs');
      const data = await res.json();
      if (data.docs) setPdfDocs(data.docs);
    } catch (e) {}
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--mahogany)' }}>
      <Header tab={tab} setTab={setTab} milestones={milestones} />
      <main style={{ maxWidth: 960, margin: '0 auto', padding: '24px 16px 100px' }}>
        {tab === 'home'       && <HomeTab setTab={setTab} milestones={milestones} />}
        {tab === 'speaking'   && <SpeakingTab addMilestone={addMilestone} />}
        {tab === 'flashcards' && <FlashcardsTab />}
        {tab === 'quiz'       && <QuizTab />}
        {tab === 'pdf'        && <PdfTab pdfDocs={pdfDocs} setPdfDocs={setPdfDocs} onRefresh={refreshPdfDocs} />}
        {tab === 'milestones' && <MilestonesTab milestones={milestones} />}
      </main>
      <BottomNav tab={tab} setTab={setTab} />
    </div>
  );
}

// ─── HEADER ───────────────────────────────────────────────────────────────────
function Header({ tab, setTab, milestones }: { tab: Tab; setTab: (t: Tab) => void; milestones: Milestone[] }) {
  return (
    <header style={{
      background: 'linear-gradient(180deg, #1a0c04 0%, #120804 100%)',
      borderBottom: '1px solid var(--border)',
      boxShadow: '0 4px 20px rgba(0,0,0,0.6), 0 1px 0 rgba(201,168,76,0.12) inset',
      padding: '14px 16px',
      position: 'sticky', top: 0, zIndex: 50,
    }}>
      <div style={{ maxWidth: 960, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={() => setTab('home')} style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'none', border: 'none', cursor: 'pointer' }}>
          <div style={{
            width: 40, height: 40,
            background: 'linear-gradient(145deg, var(--gold-bright), var(--gold-dim))',
            borderRadius: 11,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20,
            boxShadow: '0 2px 0 rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,200,0.3) inset',
          }}>🇩🇪</div>
          <div>
            <div style={{ color: 'var(--gold-bright)', fontWeight: 800, fontSize: 18, lineHeight: 1, fontFamily: 'Georgia, serif', letterSpacing: '-0.01em' }}>DeutschMeister</div>
            <div style={{ color: 'var(--muted)', fontSize: 11, fontFamily: 'Georgia, serif' }}>German Learning App</div>
          </div>
        </button>
        <button onClick={() => setTab('milestones')} style={{
          display: 'flex', alignItems: 'center', gap: 7,
          background: 'linear-gradient(180deg, #2a1508 0%, #1e0e05 100%)',
          border: '1px solid var(--border-light)',
          borderRadius: 10, padding: '8px 14px', cursor: 'pointer', color: 'var(--gold)',
          boxShadow: '0 2px 6px rgba(0,0,0,0.4), 0 1px 0 rgba(255,180,80,0.08) inset',
          fontFamily: 'Georgia, serif',
        }}>
          <Trophy size={16} />
          <span style={{ fontWeight: 700, fontSize: 14 }}>{milestones.length}</span>
        </button>
      </div>
    </header>
  );
}

// ─── BOTTOM NAV ───────────────────────────────────────────────────────────────
function BottomNav({ tab, setTab }: { tab: Tab; setTab: (t: Tab) => void }) {
  const items: { id: Tab; icon: React.ReactNode; label: string }[] = [
    { id: 'home',       icon: <Home size={20} />,      label: 'Home' },
    { id: 'speaking',   icon: <Mic size={20} />,       label: 'Speaking' },
    { id: 'flashcards', icon: <Layers size={20} />,    label: 'Cards' },
    { id: 'quiz',       icon: <Brain size={20} />,     label: 'Quiz' },
    { id: 'pdf',        icon: <FileText size={20} />,  label: 'PDF' },
  ];
  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      background: 'linear-gradient(0deg, #0d0705 0%, #180c04 100%)',
      borderTop: '1px solid var(--border)',
      boxShadow: '0 -4px 20px rgba(0,0,0,0.6), 0 -1px 0 rgba(201,168,76,0.08) inset',
      display: 'flex', zIndex: 50,
    }}>
      {items.map(item => (
        <button key={item.id} onClick={() => setTab(item.id)} style={{
          flex: 1, padding: '12px 4px 16px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
          background: 'none', border: 'none', cursor: 'pointer',
          color: tab === item.id ? 'var(--gold)' : 'var(--muted)',
          transition: 'color 0.2s',
          fontFamily: 'Georgia, serif',
        }}>
          {item.icon}
          <span style={{ fontSize: 10, fontWeight: tab === item.id ? 700 : 400 }}>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}

// ─── HOME TAB ─────────────────────────────────────────────────────────────────
function HomeTab({ setTab, milestones }: { setTab: (t: Tab) => void; milestones: Milestone[] }) {
  const features = [
    { tab: 'speaking'   as Tab, icon: '🗣️', title: 'Speaking Practice',      desc: 'Record & get AI feedback on your pronunciation',       color: 'var(--red)' },
    { tab: 'flashcards' as Tab, icon: '📚', title: 'Vocabulary Flashcards',  desc: '300+ words with audio, examples, and gender tips',     color: '#7ab8e8' },
    { tab: 'quiz'       as Tab, icon: '🧠', title: 'AI Vocab Quiz',           desc: 'Chat with Dieter — your personal German tutor',        color: 'var(--gold)' },
    { tab: 'pdf'        as Tab, icon: '📄', title: 'PDF Word Library',        desc: 'Upload PDFs, extract words and listen to them aloud',  color: '#5ecb8a' },
  ];
  return (
    <div>
      <div style={{ textAlign: 'center', padding: '32px 0 40px' }}>
        <div style={{ fontSize: 64, marginBottom: 16, filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.6))' }}>🇩🇪</div>
        <h1 style={{ fontSize: 36, fontWeight: 900, color: 'var(--gold-bright)', marginBottom: 8, fontFamily: 'Georgia, serif', textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>Willkommen!</h1>
        <p style={{ color: 'var(--muted)', fontSize: 15, fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>Your journey from Anfänger to Profi starts here</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 32, marginTop: 24 }}>
          <Stat label="Words"   value={vocabulary.length.toString()} />
          <Stat label="Phrases" value={phrases.length.toString()} />
          <Stat label="Done"    value={milestones.length.toString()} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
        {features.map(f => (
          <button key={f.tab} onClick={() => setTab(f.tab)} className="card card-hover"
            style={{ padding: 24, textAlign: 'left', cursor: 'pointer', width: '100%', transition: 'all 0.2s' }}>
            <div style={{ fontSize: 36, marginBottom: 12, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}>{f.icon}</div>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6, color: f.color, fontFamily: 'Georgia, serif' }}>{f.title}</div>
            <div style={{ color: 'var(--muted)', fontSize: 13, lineHeight: 1.5, fontFamily: 'Georgia, serif' }}>{f.desc}</div>
          </button>
        ))}
      </div>

      <div className="card" style={{ marginTop: 28, padding: 24 }}>
        <h2 style={{ fontWeight: 800, marginBottom: 18, fontSize: 18, fontFamily: 'Georgia, serif', color: 'var(--gold)' }}>🚀 A1 → C2 Roadmap</h2>
        {[
          { level: 'A1', label: 'Absolute Beginner',    desc: 'Greetings, numbers, basic phrases' },
          { level: 'A2', label: 'Elementary',           desc: 'Daily routines, shopping, directions' },
          { level: 'B1', label: 'Intermediate',         desc: 'Travel, work, opinions, past tense' },
          { level: 'B2', label: 'Upper Intermediate',   desc: 'Complex topics, subjunctive mood' },
          { level: 'C1', label: 'Advanced',             desc: 'Nuanced expression, formal writing' },
          { level: 'C2', label: 'Mastery',              desc: 'Native-level fluency, idioms, culture' },
        ].map(r => (
          <div key={r.level} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
            <span className={`level-badge badge-${r.level}`}>{r.level}</span>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14, fontFamily: 'Georgia, serif' }}>{r.label}</div>
              <div style={{ color: 'var(--muted)', fontSize: 12, fontFamily: 'Georgia, serif' }}>{r.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: 30, fontWeight: 900, color: 'var(--gold-bright)', fontFamily: 'Georgia, serif', textShadow: '0 2px 6px rgba(0,0,0,0.5)' }}>{value}</div>
      <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'Georgia, serif' }}>{label}</div>
    </div>
  );
}

// ─── SPEAKING TAB ─────────────────────────────────────────────────────────────
function SpeakingTab({ addMilestone }: { addMilestone: (id: string, german: string, score: string) => void }) {
  const [level, setLevel] = useState<SpeakLevel>('Beginner');
  const [idx, setIdx] = useState(0);
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const recogRef = useRef<SpeechRecognition | null>(null);

  const levelPhrases = phrases.filter(p => p.level === level);
  const current = levelPhrases[idx % levelPhrases.length];

  useEffect(() => { setTranscript(''); setFeedback(''); setDone(false); }, [idx, level]);

  const startRecording = () => {
    const SR = (window as any).webkitSpeechRecognition || window.SpeechRecognition;
    if (!SR) { alert('Speech recognition not supported. Try Chrome.'); return; }
    const rec = new SR();
    rec.lang = 'de-DE'; rec.continuous = false; rec.interimResults = false;
    rec.onresult = (e: SpeechRecognitionEvent) => { const t = e.results[0][0].transcript; setTranscript(t); getFeedback(t); };
    rec.onerror = () => setRecording(false);
    rec.onend   = () => setRecording(false);
    rec.start();
    recogRef.current = rec;
    setRecording(true); setTranscript(''); setFeedback('');
  };
  const stopRecording = () => { recogRef.current?.stop(); setRecording(false); };

  const getFeedback = async (attempt: string) => {
    if (!current) return;
    setLoading(true);
    try {
      const res = await fetch('/api/ai', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system: 'You are a warm German tutor. Give concise feedback (2-4 sentences). Rate as Excellent/Good/Fair/Keep Practicing.',
          messages: [{ role: 'user', content: `Student was asked to say: "${current.german}" (${current.english})\nThey said: "${attempt}"\nGive warm, specific feedback.` }]
        })
      });
      const data = await res.json();
      const fb = data.content?.[0]?.text || 'Great effort! Keep practicing!';
      setFeedback(fb);
      const score = fb.toLowerCase().includes('excellent') ? 'Excellent' : fb.toLowerCase().includes('good') ? 'Good' : 'Keep Practicing';
      addMilestone(current.id, current.german, score);
      setDone(true);
    } catch { setFeedback('Great effort! Keep practicing your pronunciation. 🌟'); setDone(true); }
    setLoading(false);
  };

  return (
    <div>
      <SectionHeader icon="🗣️" title="Speaking Practice" subtitle="Listen, record, get AI feedback" />
      <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
        {(['Beginner', 'Intermediate', 'Advanced'] as SpeakLevel[]).map(l => (
          <button key={l} onClick={() => { setLevel(l); setIdx(0); }}
            className={level === l ? 'btn-gold' : 'btn-outline'}
            style={{ flex: 1, fontSize: 13 }}>
            {l === 'Beginner' ? '🟢' : l === 'Intermediate' ? '🟡' : '🔴'} {l}
          </button>
        ))}
      </div>

      {current && (
        <div className="card slide-in" style={{ padding: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
            <span className={`level-badge badge-${level}`}>{level}</span>
            <span style={{ color: 'var(--muted)', fontSize: 13, fontFamily: 'Georgia, serif' }}>{(idx % levelPhrases.length) + 1} / {levelPhrases.length}</span>
          </div>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, lineHeight: 1.3, fontFamily: 'Georgia, serif', color: 'var(--parchment)' }}>{current.german}</div>
            <div style={{ color: 'var(--gold)', fontSize: 16, marginBottom: 6, fontFamily: 'Georgia, serif' }}>{current.english}</div>
            {current.tip && <div style={{ color: 'var(--muted)', fontSize: 13, fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>💡 {current.tip}</div>}
          </div>

          <button onClick={() => speak(current.german)} className="btn-gold" style={{ width: '100%', marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '13px' }}>
            <Volume2 size={17} /> Hear it first
          </button>

          <button onClick={recording ? stopRecording : startRecording} disabled={loading}
            className={recording ? '' : 'btn-outline'}
            style={{
              width: '100%', marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '13px',
              background: recording ? 'var(--red)' : undefined, color: recording ? '#fff' : undefined,
              border: recording ? 'none' : undefined, borderRadius: 10, cursor: 'pointer', fontWeight: 700,
              fontFamily: 'Georgia, serif',
              ...(recording ? { animation: 'pulse-red 1s infinite' } : {})
            }}>
            {recording ? <><MicOff size={17} /> Stop Recording</> : <><Mic size={17} /> Record My Attempt</>}
          </button>

          {transcript && (
            <div className="parchment-panel" style={{ padding: 14, marginBottom: 12 }}>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 4, fontFamily: 'Georgia, serif' }}>You said:</div>
              <div style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif', color: 'var(--parchment)' }}>"{transcript}"</div>
            </div>
          )}
          {loading && <div className="shimmer" style={{ height: 70, borderRadius: 10, marginBottom: 12 }} />}
          {feedback && !loading && (
            <div style={{ background: 'rgba(46,125,82,0.08)', border: '1px solid rgba(46,125,82,0.25)', borderRadius: 12, padding: 16, marginBottom: 12 }}>
              <div style={{ fontSize: 12, color: '#5ecb8a', marginBottom: 6, fontWeight: 700, fontFamily: 'Georgia, serif' }}>🤖 AI Feedback</div>
              <div style={{ lineHeight: 1.7, fontFamily: 'Georgia, serif', color: 'var(--parchment)' }}>{feedback}</div>
            </div>
          )}
          {done && (
            <button onClick={() => speak(current.german, 'de-DE', 0.7)} className="btn-outline"
              style={{ width: '100%', marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '11px' }}>
              <Volume2 size={15} /> Hear Correct Version Again
            </button>
          )}
          <button onClick={() => setIdx(i => i + 1)} className="btn-gold"
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px' }}>
            Next Phrase <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}

// ─── FLASHCARDS TAB ───────────────────────────────────────────────────────────
function FlashcardsTab() {
  const categories: { id: VocabCategory; icon: React.ReactNode; label: string }[] = [
    { id: 'Basics',      icon: <Globe size={15} />,       label: 'Basics' },
    { id: 'Travel',      icon: <Target size={15} />,      label: 'Travel' },
    { id: 'Food & Drink',icon: <Coffee size={15} />,      label: 'Food & Drink' },
    { id: 'Business',    icon: <Briefcase size={15} />,   label: 'Business' },
    { id: 'Numbers',     icon: <Hash size={15} />,        label: 'Numbers' },
    { id: 'Adjectives',  icon: <Star size={15} />,        label: 'Adjectives' },
    { id: 'Nouns',       icon: <BookOpen size={15} />,    label: 'Nouns' },
    { id: 'Sentences',   icon: <MessageSquare size={15} />,label: 'Sentences' },
  ];

  const [cat, setCat] = useState<VocabCategory>('Basics');
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [search, setSearch] = useState('');
  const [showList, setShowList] = useState(false);

  const words = vocabulary.filter(w => w.category === cat);
  const filtered = search
    ? vocabulary.filter(w => w.german.toLowerCase().includes(search.toLowerCase()) || w.english.toLowerCase().includes(search.toLowerCase()))
    : words;
  const current = filtered[idx % Math.max(filtered.length, 1)];

  useEffect(() => { setIdx(0); setFlipped(false); }, [cat, search]);
  const prev = () => { setIdx(i => (i - 1 + filtered.length) % filtered.length); setFlipped(false); };
  const next = () => { setIdx(i => (i + 1) % filtered.length); setFlipped(false); };

  return (
    <div>
      <SectionHeader icon="📚" title="Vocabulary Flashcards" subtitle={`${vocabulary.length}+ words with audio`} />

      <div style={{ position: 'relative', marginBottom: 14 }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search German or English…" style={S.input} />
        {search && <button onClick={() => setSearch('')} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer' }}><X size={15} /></button>}
      </div>

      {!search && (
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', marginBottom: 18, paddingBottom: 4 }} className="scrollbar-hide">
          {categories.map(c => (
            <button key={c.id} onClick={() => setCat(c.id)} style={{
              whiteSpace: 'nowrap', padding: '8px 14px', borderRadius: 20,
              border: `1px solid ${cat === c.id ? 'var(--gold)' : 'var(--border)'}`,
              background: cat === c.id
                ? 'linear-gradient(180deg, var(--gold-bright) 0%, var(--gold-dim) 100%)'
                : 'linear-gradient(180deg, #2a1508 0%, #1e0e05 100%)',
              color: cat === c.id ? '#0a0a0f' : 'var(--text)',
              fontSize: 13, fontWeight: cat === c.id ? 700 : 400,
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
              fontFamily: 'Georgia, serif',
              boxShadow: cat === c.id
                ? '0 2px 6px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,200,0.3) inset'
                : '0 1px 4px rgba(0,0,0,0.3)',
            }}>
              {c.icon} {c.label}
            </button>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <span style={{ color: 'var(--muted)', fontSize: 13, fontFamily: 'Georgia, serif' }}>{filtered.length} words</span>
        <button onClick={() => setShowList(!showList)} style={{ background: 'none', border: 'none', color: 'var(--gold)', cursor: 'pointer', fontSize: 13, display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'Georgia, serif' }}>
          {showList ? <><EyeOff size={14} /> Card View</> : <><Eye size={14} /> List View</>}
        </button>
      </div>

      {current && !showList && (
        <>
          {/* ── Flashcard: shows German + English on front, details on back ── */}
          <div className="flip-card" style={{ width: '100%', height: 280, marginBottom: 16, cursor: 'pointer' }}
            onClick={() => setFlipped(!flipped)}>
            <div className={`flip-card-inner${flipped ? ' flipped' : ''}`} style={{ position: 'relative', width: '100%', height: '100%' }}>

              {/* FRONT: German word + English translation visible */}
              <div className="flip-card-front card" style={{
                position: 'absolute', width: '100%', height: '100%',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 28,
                background: 'linear-gradient(160deg, #2e1608 0%, #1c0d04 100%)',
              }}>
                {current.gender && (
                  <div style={{ fontSize: 13, marginBottom: 8, fontWeight: 700, fontFamily: 'Georgia, serif' }} className={`gender-${current.gender}`}>{current.gender}</div>
                )}
                <div style={{ fontSize: 38, fontWeight: 900, marginBottom: 10, textAlign: 'center', fontFamily: 'Georgia, serif', color: 'var(--parchment)', textShadow: '0 2px 6px rgba(0,0,0,0.5)' }}>
                  {current.german}
                </div>
                {/* English always visible on front */}
                <div style={{
                  fontSize: 18, fontWeight: 600, color: 'var(--gold-bright)', fontFamily: 'Georgia, serif',
                  marginBottom: 10, textAlign: 'center',
                }}>
                  {current.english}
                </div>
                <span className={`level-badge badge-${current.level}`}>{current.level}</span>
                {current.type && <div style={{ color: 'var(--muted)', fontSize: 12, marginTop: 8, fontFamily: 'Georgia, serif' }}>{current.type}</div>}
                <div style={{ color: 'var(--muted)', fontSize: 11, marginTop: 14, fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>Tap for example →</div>
              </div>

              {/* BACK: example sentence + pronunciation */}
              <div className="flip-card-back card" style={{
                position: 'absolute', width: '100%', height: '100%',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 28,
                background: 'linear-gradient(160deg, #1e1008 0%, #140904 100%)',
              }}>
                <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 6, textAlign: 'center', color: 'var(--gold-bright)', fontFamily: 'Georgia, serif' }}>{current.german}</div>
                {current.pronunciation && <div style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 12, fontFamily: 'Georgia, serif' }}>/{current.pronunciation}/</div>}
                {current.example ? (
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontStyle: 'italic', fontSize: 15, marginBottom: 6, fontFamily: 'Georgia, serif', color: 'var(--parchment)' }}>{current.example}</div>
                    <div style={{ color: 'var(--muted)', fontSize: 13, fontFamily: 'Georgia, serif' }}>{current.exampleTranslation}</div>
                    <button onClick={e => { e.stopPropagation(); speak(current.example!); }}
                      style={{ marginTop: 12, background: 'linear-gradient(180deg, #2a1508 0%, #1e0e05 100%)', border: '1px solid var(--border-light)', borderRadius: 8, padding: '5px 12px', color: 'var(--text)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, fontFamily: 'Georgia, serif', boxShadow: '0 2px 4px rgba(0,0,0,0.4)' }}>
                      <Volume2 size={12} /> Hear example
                    </button>
                  </div>
                ) : (
                  <div style={{ color: 'var(--muted)', fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: 14 }}>No example available</div>
                )}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
            <button onClick={prev} className="btn-outline" style={{ flex: 1, padding: '10px' }}>← Prev</button>
            <button onClick={() => speak(current.german)} className="btn-gold" style={{ flex: 1, padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <Volume2 size={15} /> Listen
            </button>
            <button onClick={next} className="btn-outline" style={{ flex: 1, padding: '10px' }}>Next →</button>
          </div>
          <div style={{ textAlign: 'center', color: 'var(--muted)', fontSize: 13, fontFamily: 'Georgia, serif' }}>{(idx % filtered.length) + 1} / {filtered.length}</div>
        </>
      )}

      {showList && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {filtered.map(w => (
            <div key={w.id} className="card" style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {w.gender && <span className={`gender-${w.gender}`} style={{ fontWeight: 700, fontSize: 13 }}>{w.gender}</span>}
                  <span style={{ fontWeight: 700, fontFamily: 'Georgia, serif', color: 'var(--parchment)' }}>{w.german}</span>
                  <span className={`level-badge badge-${w.level}`}>{w.level}</span>
                </div>
                <div style={{ color: 'var(--gold)', fontSize: 13, fontFamily: 'Georgia, serif' }}>{w.english}</div>
              </div>
              <button onClick={() => speak(w.german)} style={{ background: 'linear-gradient(180deg, #2a1508 0%, #1e0e05 100%)', border: '1px solid var(--border-light)', borderRadius: 8, padding: '8px', cursor: 'pointer', color: 'var(--text)', boxShadow: '0 2px 4px rgba(0,0,0,0.4)' }}>
                <Volume2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── QUIZ TAB ─────────────────────────────────────────────────────────────────
function QuizTab() {
  const [msgs, setMsgs] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs]);

  const systemPrompt = `You are "Dieter", a fun and encouraging German language tutor AI. Help users learn German through quizzes, grammar explanations, corrections with examples, noun genders (der/die/das), verb conjugations, and the 4 cases. Be conversational, warm, patient. Use emojis 🇩🇪. Keep responses concise but helpful.`;

  const startChat = async () => {
    setStarted(true);
    setMsgs([{ role: 'assistant', content: "Hallo! 👋 Ich bin Dieter, dein persönlicher Deutschlehrer!\n\nI can:\n• Quiz you on vocabulary 📝\n• Explain grammar rules 📚\n• Answer any German questions 🤔\n• Correct your mistakes kindly ✅\n\nWas möchtest du lernen? (What would you like to learn?)\n\nTry: *\"Quiz me on food vocabulary\"* or *\"Explain der/die/das\"*" }]);
  };

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg: ChatMsg = { role: 'user', content: input.trim() };
    const newMsgs = [...msgs, userMsg];
    setMsgs(newMsgs); setInput(''); setLoading(true);
    try {
      const res = await fetch('/api/ai', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ system: systemPrompt, messages: newMsgs.map(m => ({ role: m.role, content: m.content })) })
      });
      const data = await res.json();
      setMsgs(prev => [...prev, { role: 'assistant', content: data.content?.[0]?.text || 'Sorry, please try again!' }]);
    } catch {
      setMsgs(prev => [...prev, { role: 'assistant', content: 'Network error. Please try again! 🔄' }]);
    }
    setLoading(false);
  };

  const quickPrompts = ['Quiz me on basic vocabulary', 'Explain German noun genders', 'How do verb conjugations work?', 'Teach me common phrases', 'What are the German cases?'];

  return (
    <div>
      <SectionHeader icon="🧠" title="AI Vocab Quiz" subtitle="Chat with Dieter, your AI German tutor" />
      {!started ? (
        <div className="card" style={{ padding: 32, textAlign: 'center' }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>🤖</div>
          <h2 style={{ fontWeight: 800, fontSize: 22, marginBottom: 8, color: 'var(--gold)', fontFamily: 'Georgia, serif' }}>Meet Dieter</h2>
          <p style={{ color: 'var(--muted)', marginBottom: 24, lineHeight: 1.7, fontFamily: 'Georgia, serif' }}>Your personal AI German tutor. Ask questions, get quizzed, learn grammar — all in a friendly conversation.</p>
          <button onClick={startChat} className="btn-gold" style={{ padding: '14px 32px', fontSize: 16 }}>Start Learning with Dieter 🇩🇪</button>
        </div>
      ) : (
        <div>
          {msgs.length <= 1 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
              {quickPrompts.map(q => (
                <button key={q} onClick={() => setInput(q)}
                  style={{ background: 'linear-gradient(180deg, #2a1508 0%, #1e0e05 100%)', border: '1px solid var(--border-light)', borderRadius: 20, padding: '6px 14px', color: 'var(--text)', fontSize: 12, cursor: 'pointer', fontFamily: 'Georgia, serif' }}>{q}</button>
              ))}
            </div>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16, maxHeight: '55vh', overflowY: 'auto' }} className="scrollbar-hide">
            {msgs.map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '82%', padding: '12px 16px',
                  borderRadius: m.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  background: m.role === 'user'
                    ? 'linear-gradient(180deg, var(--gold-bright) 0%, var(--gold-dim) 100%)'
                    : 'linear-gradient(180deg, #2e1608 0%, #1e0e05 100%)',
                  border: m.role === 'user' ? 'none' : '1px solid var(--border)',
                  color: m.role === 'user' ? '#0a0a0f' : 'var(--text)',
                  fontSize: 14, lineHeight: 1.7, whiteSpace: 'pre-wrap', fontFamily: 'Georgia, serif',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
                }}>
                  {m.content}
                  {m.role === 'assistant' && (
                    <button onClick={() => speak(m.content.replace(/[^\w\s,.!?äöüÄÖÜß]/g, '').substring(0, 200), 'de-DE')}
                      style={{ display: 'block', marginTop: 8, background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: 11, fontFamily: 'Georgia, serif' }}>
                      <Volume2 size={11} style={{ display: 'inline', marginRight: 4 }} />Listen
                    </button>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div className="shimmer" style={{ padding: '12px 20px', borderRadius: '16px 16px 16px 4px', width: 120, height: 44 }} />
              </div>
            )}
            <div ref={bottomRef} />
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Ask anything about German…" style={{ ...S.input, flex: 1 }} />
            <button onClick={send} disabled={loading || !input.trim()} className="btn-gold" style={{ padding: '12px 16px', display: 'flex', alignItems: 'center' }}>
              <Send size={15} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── PDF TAB ──────────────────────────────────────────────────────────────────
function PdfTab({ pdfDocs, setPdfDocs, onRefresh }: { pdfDocs: PdfDoc[]; setPdfDocs: React.Dispatch<React.SetStateAction<PdfDoc[]>>; onRefresh: () => Promise<void> }) {
  const [uploading, setUploading] = useState(false);
  const [selected, setSelected] = useState<PdfDoc | null>(null);
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState('');

  // TTS state for reading PDF text aloud
  const [ttsPlaying, setTtsPlaying] = useState(false);
  const [ttsPaused, setTtsPaused]   = useState(false);

  const startTts = (doc: PdfDoc) => {
    if (typeof window === 'undefined') return;
    window.speechSynthesis.cancel();
    const textToRead = doc.rawText
      || doc.words.map(w => `${w.german}. ${w.english}.`).join(' ')
      || doc.name;
    const u = new SpeechSynthesisUtterance(textToRead);
    u.lang = 'de-DE'; u.rate = 0.85; u.pitch = 1;
    const voices = window.speechSynthesis.getVoices();
    const german = voices.find(v => v.lang.startsWith('de'));
    if (german) u.voice = german;
    u.onend = () => { setTtsPlaying(false); setTtsPaused(false); };
    window.speechSynthesis.speak(u);
    setTtsPlaying(true); setTtsPaused(false);
  };

  const pauseTts  = () => { window.speechSynthesis.pause();  setTtsPaused(true); };
  const resumeTts = () => { window.speechSynthesis.resume(); setTtsPaused(false); };
  const stopTts   = () => { window.speechSynthesis.cancel(); setTtsPlaying(false); setTtsPaused(false); };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== 'application/pdf') { setError('Please upload a PDF file'); return; }
    setUploading(true); setError('');
    try {
      const fd = new FormData(); fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.success) {
        await onRefresh();
        const doc: PdfDoc = { id: data.docId || Date.now().toString(), name: data.fileName, words: data.words, date: new Date().toISOString(), rawText: data.rawText };
        setSelected(doc);
        if (data.wordCount === 0) setError('No German words found in this PDF.');
      } else setError(data.error || 'Upload failed');
    } catch { setError('Upload failed. Please try again.'); }
    setUploading(false);
    if (fileRef.current) fileRef.current.value = '';
  };

  const deleteDoc = async (id: string) => {
    setPdfDocs(prev => prev.filter(d => d.id !== id));
    if (selected?.id === id) { setSelected(null); stopTts(); }
    try { await fetch('/api/pdf-docs', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) }); } catch {}
  };

  const filteredWords = selected?.words.filter(w => !search || w.german.toLowerCase().includes(search.toLowerCase()) || w.english.toLowerCase().includes(search.toLowerCase())) || [];

  if (selected) {
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <button onClick={() => { setSelected(null); stopTts(); }} className="btn-outline" style={{ padding: '8px 12px', fontSize: 13 }}>← Back</button>
          <div>
            <div style={{ fontWeight: 700, fontFamily: 'Georgia, serif', color: 'var(--parchment)' }}>{selected.name}</div>
            <div style={{ color: 'var(--muted)', fontSize: 12, fontFamily: 'Georgia, serif' }}>{selected.words.length} words extracted</div>
          </div>
        </div>

        {/* ── Listen to PDF controls ── */}
        <div className="card" style={{ padding: 18, marginBottom: 18, display: 'flex', alignItems: 'center', gap: 12 }}>
          <Volume2 size={18} style={{ color: 'var(--gold)', flexShrink: 0 }} />
          <span style={{ fontFamily: 'Georgia, serif', fontSize: 14, color: 'var(--muted)', flex: 1 }}>Listen to PDF contents</span>
          <div style={{ display: 'flex', gap: 8 }}>
            {!ttsPlaying ? (
              <button onClick={() => startTts(selected)} className="btn-gold" style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
                <Play size={14} /> Play
              </button>
            ) : (
              <>
                {ttsPaused
                  ? <button onClick={resumeTts} className="btn-gold" style={{ padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 5, fontSize: 13 }}><Play size={14} /> Resume</button>
                  : <button onClick={pauseTts}  className="btn-outline" style={{ padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 5, fontSize: 13 }}><Pause size={14} /> Pause</button>
                }
                <button onClick={stopTts} className="btn-outline" style={{ padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 5, fontSize: 13 }}><Square size={14} /> Stop</button>
              </>
            )}
          </div>
        </div>

        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search words…" style={{ ...S.input, marginBottom: 14 }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {filteredWords.map((w, i) => (
            <div key={i} className="card" style={{ padding: '12px 16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                    <span style={{ fontWeight: 700, fontSize: 16, fontFamily: 'Georgia, serif', color: 'var(--parchment)' }}>{w.german}</span>
                    {w.type && <span style={{ fontSize: 11, color: 'var(--muted)', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border)', padding: '1px 7px', borderRadius: 5, fontFamily: 'Georgia, serif' }}>{w.type}</span>}
                  </div>
                  <div style={{ color: 'var(--gold)', fontSize: 14, fontFamily: 'Georgia, serif' }}>{w.english}</div>
                  {w.example && <div style={{ color: 'var(--muted)', fontSize: 12, marginTop: 4, fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>{w.example}</div>}
                </div>
                <button onClick={() => speak(w.german)} style={{ background: 'linear-gradient(180deg, #2a1508 0%, #1e0e05 100%)', border: '1px solid var(--border-light)', borderRadius: 8, padding: '8px', cursor: 'pointer', color: 'var(--text)', flexShrink: 0, boxShadow: '0 2px 4px rgba(0,0,0,0.4)' }}>
                  <Volume2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <SectionHeader icon="📄" title="PDF Word Library" subtitle="Upload PDFs to extract and listen to German vocabulary" />

      <div className="card" style={{ padding: 28, textAlign: 'center', marginBottom: 24, border: '2px dashed var(--border-light)' }}>
        <input ref={fileRef} type="file" accept=".pdf" onChange={handleUpload} style={{ display: 'none' }} />
        {uploading ? (
          <div>
            <div style={{ fontSize: 40, marginBottom: 12 }}>⏳</div>
            <div style={{ fontWeight: 700, marginBottom: 4, fontFamily: 'Georgia, serif', color: 'var(--parchment)' }}>Extracting German words…</div>
            <div style={{ color: 'var(--muted)', fontSize: 13, fontFamily: 'Georgia, serif' }}>Reading your PDF locally — no API used</div>
            <div className="shimmer" style={{ height: 8, borderRadius: 4, marginTop: 16 }} />
          </div>
        ) : (
          <div>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📤</div>
            <div style={{ fontWeight: 700, marginBottom: 6, fontFamily: 'Georgia, serif', color: 'var(--parchment)', fontSize: 17 }}>Upload a German PDF</div>
            <div style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 18, fontFamily: 'Georgia, serif' }}>Words extracted locally — free & private. Listen to the PDF aloud after upload.</div>
            <button onClick={() => fileRef.current?.click()} className="btn-gold" style={{ padding: '12px 28px' }}>
              <Upload size={15} style={{ display: 'inline', marginRight: 8 }} /> Choose PDF
            </button>
          </div>
        )}
        {error && <div style={{ color: '#e07060', marginTop: 12, fontSize: 13, fontFamily: 'Georgia, serif' }}>{error}</div>}
      </div>

      {pdfDocs.length === 0 ? (
        <div style={{ textAlign: 'center', color: 'var(--muted)', padding: 48 }}>
          <FileText size={40} style={{ margin: '0 auto 12px', display: 'block', opacity: 0.25 }} />
          <div style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>No PDFs uploaded yet. Upload your first German PDF!</div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {pdfDocs.map(doc => (
            <div key={doc.id} className="card" style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <button onClick={() => setSelected(doc)} style={{ flex: 1, textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer' }}>
                <div style={{ fontWeight: 700, color: 'var(--parchment)', fontFamily: 'Georgia, serif' }}>{doc.name}</div>
                <div style={{ color: 'var(--muted)', fontSize: 12, fontFamily: 'Georgia, serif' }}>{doc.words.length} words · {new Date(doc.date).toLocaleDateString()}</div>
              </button>
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => setSelected(doc)} className="btn-gold" style={{ padding: '8px 14px', fontSize: 13 }}>Open</button>
                <button onClick={() => deleteDoc(doc.id)} style={{ padding: '8px', background: 'linear-gradient(180deg, #2a1508 0%, #1e0e05 100%)', border: '1px solid var(--border-light)', borderRadius: 8, cursor: 'pointer', color: 'var(--muted)', boxShadow: '0 2px 4px rgba(0,0,0,0.4)' }}>
                  <X size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── MILESTONES TAB ───────────────────────────────────────────────────────────
function MilestonesTab({ milestones }: { milestones: Milestone[] }) {
  const scoreColor = (s: string) => s === 'Excellent' ? '#5ecb8a' : s === 'Good' ? 'var(--gold)' : 'var(--muted)';
  return (
    <div>
      <SectionHeader icon="🏆" title="My Milestones" subtitle={`${milestones.length} phrases practiced`} />
      {milestones.length === 0 ? (
        <div style={{ textAlign: 'center', color: 'var(--muted)', padding: 60 }}>
          <Trophy size={48} style={{ margin: '0 auto 12px', display: 'block', opacity: 0.2 }} />
          <div style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>No milestones yet — start practicing to earn them!</div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {milestones.map(m => (
            <div key={m.id} className="card" style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, fontFamily: 'Georgia, serif', color: 'var(--parchment)' }}>{m.german}</div>
                <div style={{ color: 'var(--muted)', fontSize: 12, fontFamily: 'Georgia, serif' }}>{new Date(m.date).toLocaleString()}</div>
              </div>
              <span style={{ fontWeight: 700, fontSize: 13, color: scoreColor(m.score), fontFamily: 'Georgia, serif' }}>
                {m.score === 'Excellent' ? '⭐' : m.score === 'Good' ? '✅' : '💪'} {m.score}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── SHARED ───────────────────────────────────────────────────────────────────
function SectionHeader({ icon, title, subtitle }: { icon: string; title: string; subtitle: string }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <h1 style={{ fontSize: 26, fontWeight: 900, marginBottom: 4, fontFamily: 'Georgia, serif', color: 'var(--parchment)', textShadow: '0 2px 6px rgba(0,0,0,0.5)' }}>{icon} {title}</h1>
      <p style={{ color: 'var(--muted)', fontSize: 14, fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>{subtitle}</p>
    </div>
  );
}
