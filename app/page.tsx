"use client";
import { useState, useEffect, type CSSProperties } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

// Helper to format numbers as currency without decimals
function currency(n: number) {
  return n.toLocaleString(undefined, { maximumFractionDigits: 0 });
}

// Simple SVG cash stack
function CashStack({ style }: { style?: CSSProperties }) {
  return (
    <svg width="64" height="40" viewBox="0 0 64 40" xmlns="http://www.w3.org/2000/svg" style={style}>
      <rect x="1" y="8" width="62" height="24" rx="6" fill="#10b981" />
      <rect x="5" y="12" width="54" height="16" rx="4" fill="#065f46" opacity="0.35" />
      <circle cx="32" cy="20" r="6" fill="#34d399" />
      <rect x="0" y="4" width="64" height="4" fill="#059669" opacity="0.8" />
      <rect x="0" y="32" width="64" height="4" fill="#059669" opacity="0.8" />
    </svg>
  );
}

// Confetti colors
const CONFETTI_COLORS = [
  "#22c55e",
  "#10b981",
  "#60a5fa",
  "#38bdf8",
  "#fde047",
  "#fca5a5",
  "#f472b6",
  "#a78bfa",
];

type ConfettiPiece = { left: number; delay: number; rotate: number; color: string; id: number };

function ConfettiBurst({ pieces }: { pieces: ConfettiPiece[] }) {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-[60]">
      {pieces.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.left}%`,
            top: "-20px",
            width: 8,
            height: 14,
            background: p.color,
            transform: `rotate(${p.rotate}deg)`,
            animation: "confettiFall 1100ms ease-in forwards",
            animationDelay: `${p.delay}ms`,
            borderRadius: 2,
            opacity: 0.95,
          }}
        />
      ))}
    </div>
  );
}

// Type definition for saved deals
export type SavedDeal = {
  id: string;
  name: string;
  deals: number;
  ppw: number;
  watts: number;
  total: number;
  createdAt: number;
};

// Theme keys
type ThemeKey =
  | "sunset"
  | "forest"
  | "monoPro"
  | "neon"
  | "emeraldBlue"
  | "orchid"
  | "amberSlate"
  | "ocean"
  | "crimson";

// Themes definition
const THEMES: Record<ThemeKey, {
  bgFrom: string; bgVia: string; bgTo: string;
  titleFrom: string; titleVia: string; titleTo: string;
  button: string; buttonHover: string;
  accentTotal: string; accentMonth: string;
  spotRGB: string;
}> = {
  emeraldBlue: {
    bgFrom: "from-zinc-900",
    bgVia: "via-neutral-900",
    bgTo: "to-black",
    titleFrom: "from-blue-400",
    titleVia: "via-sky-400",
    titleTo: "to-indigo-500",
    button: "bg-emerald-600",
    buttonHover: "hover:bg-emerald-500",
    accentTotal: "text-emerald-300",
    accentMonth: "text-sky-400",
    spotRGB: "16,185,129",
  },
  orchid: {
    bgFrom: "from-[#0b0614]",
    bgVia: "via-[#0f0a1f]",
    bgTo: "to-black",
    titleFrom: "from-fuchsia-400",
    titleVia: "via-violet-400",
    titleTo: "to-purple-500",
    button: "bg-fuchsia-600",
    buttonHover: "hover:bg-fuchsia-500",
    accentTotal: "text-fuchsia-300",
    accentMonth: "text-pink-400",
    spotRGB: "217,70,239",
  },
  amberSlate: {
    bgFrom: "from-[#0b0b0a]",
    bgVia: "via-[#111113]",
    bgTo: "to-black",
    titleFrom: "from-amber-300",
    titleVia: "via-yellow-300",
    titleTo: "to-orange-400",
    button: "bg-amber-600",
    buttonHover: "hover:bg-amber-500",
    accentTotal: "text-amber-300",
    accentMonth: "text-yellow-400",
    spotRGB: "245,158,11",
  },
  ocean: {
    bgFrom: "from-slate-900",
    bgVia: "via-slate-950",
    bgTo: "to-black",
    titleFrom: "from-cyan-300",
    titleVia: "via-teal-300",
    titleTo: "to-sky-400",
    button: "bg-cyan-600",
    buttonHover: "hover:bg-cyan-500",
    accentTotal: "text-cyan-300",
    accentMonth: "text-teal-400",
    spotRGB: "34,211,238",
  },
  crimson: {
    bgFrom: "from-[#1a0b0c]",
    bgVia: "via-[#12090a]",
    bgTo: "to-black",
    titleFrom: "from-rose-300",
    titleVia: "via-red-400",
    titleTo: "to-pink-500",
    button: "bg-rose-600",
    buttonHover: "hover:bg-rose-500",
    accentTotal: "text-rose-300",
    accentMonth: "text-pink-400",
    spotRGB: "244,63,94",
  },
  sunset: {
    bgFrom: "from-[#160b12]",
    bgVia: "via-[#0f0a1a]",
    bgTo: "to-black",
    titleFrom: "from-orange-300",
    titleVia: "via-rose-300",
    titleTo: "to-pink-500",
    button: "bg-rose-600",
    buttonHover: "hover:bg-rose-500",
    accentTotal: "text-rose-300",
    accentMonth: "text-orange-300",
    spotRGB: "236,72,153",
  },
  forest: {
    bgFrom: "from-[#06130d]",
    bgVia: "via-[#071a11]",
    bgTo: "to-black",
    titleFrom: "from-emerald-300",
    titleVia: "via-lime-300",
    titleTo: "to-green-500",
    button: "bg-emerald-700",
    buttonHover: "hover:bg-emerald-600",
    accentTotal: "text-emerald-300",
    accentMonth: "text-lime-300",
    spotRGB: "16,185,129",
  },
  monoPro: {
    bgFrom: "from-[#0c0c0c]",
    bgVia: "via-[#111111]",
    bgTo: "to-black",
    titleFrom: "from-zinc-200",
    titleVia: "via-zinc-400",
    titleTo: "to-white",
    button: "bg-white text-black",
    buttonHover: "hover:bg-white/90",
    accentTotal: "text-white",
    accentMonth: "text-zinc-300",
    spotRGB: "255,255,255",
  },
  neon: {
    bgFrom: "from-[#070b10]",
    bgVia: "via-[#05080c]",
    bgTo: "to-black",
    titleFrom: "from-lime-300",
    titleVia: "via-cyan-300",
    titleTo: "to-teal-400",
    button: "bg-lime-600",
    buttonHover: "hover:bg-lime-500",
    accentTotal: "text-lime-300",
    accentMonth: "text-cyan-300",
    spotRGB: "132,204,22",
  },
};

// Core payout calculator (exported for tests/usage)
export function computePayout(deals: number, ppw: number, watts: number) {
  const kw = watts / 1000;
  let base = 0;
  if (deals >= 7) base = 2500;
  else if (deals >= 4) base = 2200;
  else if (deals >= 1) base = 1800;

  let ppwBonus = 0;
  if (ppw >= 2.8 && ppw <= 2.99) ppwBonus = 25 * kw;
  else if (ppw >= 3.0 && ppw <= 3.2) ppwBonus = 50 * kw;
  else if (ppw > 3.2 && ppw <= 3.5) ppwBonus = 75 * kw;
  else if (ppw > 3.5 && ppw <= 4.5) ppwBonus = 100 * kw;

  let bigSystemBonus = 0;
  // System bonus: 10 kW = $200, then +$50 per additional kW up to 20 kW (cap $700). Fractional kW are paid proportionally.
  if (kw >= 10) {
    const clamped = Math.min(20, kw);
    bigSystemBonus = Math.round(200 + 50 * (clamped - 10));
  }

  const baseR = Math.round(base);
  const ppwR = Math.round(ppwBonus);
  const total = Math.round(baseR + ppwR + bigSystemBonus);
  return { base: baseR, ppwBonus: ppwR, bigSystemBonus, total };
}

// Confetti trigger rule
export const shouldConfetti = (total: number) => total >= 2500;

export default function SolarXCommissionCalculator() {
  // Theme state
  const [theme, setTheme] = useState<ThemeKey>('ocean');

  const ALLOWED_THEMES: ThemeKey[] = ['sunset', 'forest', 'monoPro', 'neon', 'ocean'];

  // Active text color per theme for "white" buttons
  const ACTIVE_TEXT: Record<ThemeKey, string> = {
    sunset: 'active:text-rose-600',
    forest: 'active:text-emerald-600',
    monoPro: 'active:text-black',
    neon: 'active:text-lime-600',
    emeraldBlue: 'active:text-emerald-600',
    orchid: 'active:text-fuchsia-600',
    amberSlate: 'active:text-amber-600',
    ocean: 'active:text-cyan-600',
    crimson: 'active:text-rose-600',
  };
  const whiteBtn = (extra = '') => `bg-white text-black hover:bg-white/90 ${ACTIVE_TEXT[theme]} border border-black/10 ${extra}`;

  // Title glow style
  const titleGlow: CSSProperties = { textShadow: `0 0 18px rgba(${THEMES[theme].spotRGB}, 0.35)` };

  // Swatch backgrounds per theme
  const THEME_SWATCH: Record<ThemeKey, string> = {
    sunset: 'linear-gradient(135deg,#fb923c,#ec4899)',
    forest: 'linear-gradient(135deg,#059669,#65a30d)',
    monoPro: 'linear-gradient(135deg,#a1a1aa,#ffffff)',
    neon: 'linear-gradient(135deg,#84cc16,#22d3ee)',
    emeraldBlue: 'linear-gradient(135deg,#10b981,#60a5fa)',
    orchid: 'linear-gradient(135deg,#d946ef,#8b5cf6)',
    amberSlate: 'linear-gradient(135deg,#f59e0b,#facc15)',
    ocean: 'linear-gradient(135deg,#06b6d4,#38bdf8)',
    crimson: 'linear-gradient(135deg,#f43f5e,#fb7185)',
  };
  const swatchStyle = (k: ThemeKey): CSSProperties => ({ background: THEME_SWATCH[k] });

  // Inputs state
  const [deals, setDeals] = useState<number>(0);
  const [ppw, setPpw] = useState<number>(0);
  const [watts, setWatts] = useState<number>(0);
  const [ppwInput, setPpwInput] = useState<string>('0');
  const [wattsInput, setWattsInput] = useState<string>('0');

  // Result and UI states
  const [result, setResult] = useState<null | { base: number; ppwBonus: number; bigSystemBonus: number; total: number }>(null);
  const [spotlight, setSpotlight] = useState<boolean>(false);

  // Gamification: falling cash stacks
  const MAX_STACKS = 40;
  const [cashStacks, setCashStacks] = useState<number[]>([]);

  // Personal tracker (simple, local only)
  const [myDeals, setMyDeals] = useState<number>(0);
  const [myEarnings, setMyEarnings] = useState<number>(0);

  // Confetti state
  const [bursts, setBursts] = useState<ConfettiPiece[][]>([]);

  // Saved deals
  const [saved, setSaved] = useState<SavedDeal[]>([]);
  const [savedQuery, setSavedQuery] = useState<string>('');

  // Rotating motivational quotes
  const QUOTES = [
    'Momentum wins. Execution > hesitation.',
    'One-call close: go for the decision today.',
    'Price is a story. Value is the plot.',
    'Clarity + urgency = signatures.',
    'Every objection is a request for confidence.',
    'Anchor on lifetime savings, not today\'s bill.',
  ];
  const [quoteIdx, setQuoteIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setQuoteIdx((i) => (i + 1) % QUOTES.length), 15000);
    return () => clearInterval(id);
  }, []);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const d = Number(localStorage.getItem('sx_myDeals') || 0);
      const e = Number(localStorage.getItem('sx_myEarn') || 0);
      setMyDeals(isNaN(d) ? 0 : d);
      setMyEarnings(isNaN(e) ? 0 : e);

      const raw = localStorage.getItem('sx_savedDeals');
      if (raw) setSaved(JSON.parse(raw));

      const storedTheme = localStorage.getItem('sx_theme') as ThemeKey | null;
      if (storedTheme && ALLOWED_THEMES.includes(storedTheme)) {
        setTheme(storedTheme);
      } else {
        setTheme('ocean');
        try {
          localStorage.setItem('sx_theme', 'ocean');
        } catch {}
      }
    } catch {}
  }, []);

  // Recompute on input change
  useEffect(() => {
    setResult(compute());
  }, [deals, ppw, watts]);

  const persistSaved = (next: SavedDeal[]) => {
    setSaved(next);
    try {
      localStorage.setItem('sx_savedDeals', JSON.stringify(next));
    } catch {}
  };

  const setThemePersist = (t: ThemeKey) => {
    setTheme(t);
    try {
      localStorage.setItem('sx_theme', t);
    } catch {}
  };

  const commitPpw = () => {
    const v = parseFloat(ppwInput);
    const safe = isNaN(v) ? 0 : Math.max(2.4, Math.min(5, v));
    const fixed = Number(safe.toFixed(2));
    setPpw(fixed);
    setPpwInput(fixed.toString());
  };

  const commitWatts = () => {
    const v = parseInt(wattsInput.replace(/[^0-9]/g, ''), 10);
    const safe = isNaN(v) ? 0 : Math.max(4001, Math.min(30000, v));
    setWatts(safe);
    setWattsInput(String(safe));
  };

  const compute = () => computePayout(deals, ppw, watts);

  const dropCash = () => {
    setCashStacks((prev) => {
      const next = [...prev];
      if (next.length < MAX_STACKS) next.push(Date.now());
      return next;
    });
  };

  const triggerConfettiIfNeeded = (newTotal: number) => {
    if (!shouldConfetti(newTotal)) return;
    const pieces: ConfettiPiece[] = Array.from({ length: 64 }).map((_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 100,
      delay: Math.round(Math.random() * 250),
      rotate: Math.random() * 360,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    }));
    setBursts((b) => [...b, pieces]);
    setTimeout(() => setBursts((b) => b.slice(1)), 1400);
    setSpotlight(true);
    setTimeout(() => setSpotlight(false), 1400);
  };

  const clearCash = () => setCashStacks([]);

  // Coach tip logic
  const coachTip = (() => {
    const kw = watts / 1000;
    const nextPpwTier = ppw < 3.0 ? 3.0 : ppw <= 3.2 ? 3.21 : ppw <= 3.5 ? 3.51 : ppw < 4.5 ? 4.51 : null;
    const nextPpwDelta = nextPpwTier ? nextPpwTier - ppw : null;
    let nextKw: number | null = null;
    if (kw < 10) nextKw = 10;
    else if (kw < 20) nextKw = Math.floor(kw) === kw ? kw + 1 : Math.ceil(kw);
    else nextKw = null;
    const nextKwDelta = nextKw ? nextKw - kw : null;

    if (nextPpwDelta && nextPpwDelta > 0 && nextPpwDelta <= 0.1) {
      const perKw = nextPpwTier && nextPpwTier >= 3.5 ? 100 : nextPpwTier && nextPpwTier > 3.2 ? 75 : nextPpwTier && nextPpwTier >= 3.0 ? 50 : 25;
      return `Bump PPW by ${nextPpwDelta.toFixed(2)} to reach tier ${nextPpwTier.toFixed(2)} and unlock ~$${perKw}/kW.`;
    }
    if (nextKwDelta && nextKwDelta > 0 && nextKwDelta <= 1.0) {
      const msg = nextKw === 10 ? 'start the $200 system bonus' : 'add another $50 system bonus';
      return `Add ~${Math.ceil(nextKwDelta * 1000)} watts to hit ${nextKw} kW and ${msg}.`;
    }
    if (result && result.total < 2500) {
      return `Push to $2.5k: raise PPW slightly or add panels to reach the next bonus tier.`;
    }
    return `Nice! Lock it in. If homeowner is value-focused, anchor on lifetime savings vs. payment.`;
  })();

  const saveCurrent = () => {
    const next = compute();
    const name = prompt('Name this deal (e.g., Smith 8.4kW @ 3.05)?') || `Deal ${saved.length + 1}`;
    const item: SavedDeal = { id: `${Date.now()}`, name, deals, ppw, watts, total: next.total, createdAt: Date.now() };
    const list = [item, ...saved].slice(0, 12);
    persistSaved(list);
  };

  const loadDeal = (id: string) => {
    const item = saved.find((s) => s.id === id);
    if (!item) return;
    setDeals(item.deals);
    setPpw(item.ppw);
    setPpwInput(item.ppw.toFixed(2));
    setWatts(item.watts);
    setWattsInput(String(item.watts));
    const next = compute();
    setResult(next);
  };

  const deleteDeal = (id: string) => {
    persistSaved(saved.filter((s) => s.id !== id));
  };
  const renameDeal = (id: string) => {
    const name = prompt('New name for this deal?');
    if (!name) return;
    persistSaved(saved.map((s) => (s.id === id ? { ...s, name } : s)));
  };

  const Box = ({ label, value, color, highlight }: { label: string; value: number | string; color: string; highlight?: boolean }) => {
    const rgb = THEMES[theme].spotRGB;
    const glowStyle: CSSProperties | undefined = highlight
      ? {
          boxShadow: `0 0 0 2px rgba(${rgb}, 0.75), 0 0 40px 8px rgba(${rgb}, 0.35)`,
          position: 'relative',
        }
      : undefined;
    return (
      <div className={`rounded-xl border ${highlight ? 'border-transparent' : 'border-zinc-800'} bg-zinc-900/60 p-4 flex flex-col justify-between min-h-[100px]`} style={glowStyle}>
        {highlight && (
          <div
            className="pointer-events-none absolute inset-0 rounded-xl"
            style={{
              background: `radial-gradient(180px 90px at 85% 20%, rgba(${rgb}, 0.20), transparent 60%)`,
              mixBlendMode: 'screen',
            }}
          />
        )}
        <p className="text-zinc-200 text-sm truncate" title={String(value)}>
          {label}
        </p>
        <p className={`text-3xl font-extrabold ${color}`}>${currency(Number(value))}</p>
      </div>
    );
  };

  const RecomputeButton = () => (
    <Button
      onClick={() => {
        const next = compute();
        setResult(next);
        dropCash();
        triggerConfettiIfNeeded(next.total);
        if (next?.total) {
          const newDeals = myDeals + 1;
          const newEarn = myEarnings + next.total;
          setMyDeals(newDeals);
          setMyEarnings(newEarn);
          try {
            localStorage.setItem('sx_myDeals', String(newDeals));
            localStorage.setItem('sx_myEarn', String(newEarn));
          } catch {}
        }
      }}
      className={`${THEMES[theme].button} ${THEMES[theme].buttonHover}`}
    >
      Rain Cash (or Confetti)
    </Button>
  );

  // Filter saved deals by query (name, ppw, watts, total)
  const filteredSaved = saved.filter((s) => {
    const q = savedQuery.trim().toLowerCase();
    if (!q) return true;
    const hay = `${s.name} ${s.ppw.toFixed(2)} ${s.watts} ${s.total}`.toLowerCase();
    return q.split(/\s+/).every((tok) => hay.includes(tok));
  });

  return (
    <div className={`min-h-screen w-full bg-gradient-to-br ${THEMES[theme].bgFrom} ${THEMES[theme].bgVia} ${THEMES[theme].bgTo} text-zinc-100 p-6`}>
      <style>{`
        @keyframes fall { from { transform: translateY(-160px) rotate(-6deg); opacity: 0; } to { transform: translateY(0) rotate(0deg); opacity: 1; } }
        @keyframes confettiFall { from { transform: translateY(-40px) rotate(0deg); opacity: .9; } to { transform: translateY(110vh) rotate(600deg); opacity: 0; } }
      `}</style>

      {bursts.map((pieces, idx) => (
        <ConfettiBurst key={idx} pieces={pieces} />
      ))}

      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Calculator */}
        <Card className="rounded-2xl border border-zinc-800 bg-zinc-950/70 shadow-[0_0_60px_-20px_rgba(100,150,255,0.3)] lg:col-span-2 relative overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between gap-3">
              <CardTitle>
                <div className={`text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r ${THEMES[theme].titleFrom} ${THEMES[theme].titleVia} ${THEMES[theme].titleTo} bg-clip-text text-transparent`} style={titleGlow}>
                  {'Solar X \u2022 Commission Calculator'}
                </div>
              </CardTitle>
              {/* Theme toggle */}
              <div className="flex items-center gap-2">
                {(['sunset', 'forest', 'monoPro', 'neon', 'ocean'] as ThemeKey[]).map((k) => (
                  <button
                    key={k}
                    aria-label={k}
                    title={k}
                    onClick={() => setThemePersist(k)}
                    className={`h-4 w-4 rounded-full border border-white/40 transition transform focus:outline-none focus:ring-2 focus:ring-white/60 ${theme === k ? 'ring-2 ring-white scale-110' : 'opacity-80 hover:opacity-100'}`}
                    style={swatchStyle(k)}
                  />
                ))}
              </div>
            </div>
            <p className="text-zinc-300 text-sm">Type values or use the sliders. System size is in <span className="font-semibold text-zinc-100">watts</span> (e.g., 8000 for 8kW).</p>
          </CardHeader>

          <CardContent className="p-6 md:p-8 space-y-8 relative">
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Deals */}
              <div className="space-y-3">
                <Label className="text-zinc-200">Deals Closed (this month)</Label>
                <div className="flex items-center gap-3">
                  <Input type="number" inputMode="numeric" value={deals} onChange={(e) => setDeals(Math.max(0, Math.min(50, Number(e.target.value))))} className="bg-zinc-900 border-zinc-800 text-zinc-100" />
                  <Button variant="outline" className={whiteBtn()} onClick={() => setDeals(0)}>Clear</Button>
                </div>
                <Slider value={[deals]} onValueChange={(v) => setDeals(v[0])} min={0} max={30} step={1} />
              </div>

              {/* PPW */}
              <div className="space-y-3">
                <Label className="text-zinc-200">Price Per Watt (PPW)</Label>
                <div className="flex items-center gap-3">
                  <Input type="text" inputMode="decimal" value={ppwInput} onChange={(e) => setPpwInput(e.target.value)} onBlur={commitPpw} className="bg-zinc-900 border-zinc-800 text-zinc-100" />
                  <Button variant="outline" className={whiteBtn()} onClick={() => { setPpw(2.4); setPpwInput('2.40'); }}>Clear</Button>
                </div>
                <Slider value={[ppw]} onValueChange={(v) => { const val = Number(v[0].toFixed(2)); setPpw(val); setPpwInput(val.toFixed(2)); }} min={2.4} max={4.5} step={0.01} />
              </div>

              {/* Watts */}
              <div className="space-y-3">
                <Label className="text-zinc-200">System Size (Watts)</Label>
                <div className="flex items-center gap-3">
                  <Input type="text" inputMode="numeric" value={wattsInput} onChange={(e) => setWattsInput(e.target.value)} onBlur={commitWatts} className="bg-zinc-900 border-zinc-800 text-zinc-100" />
                  <Button variant="outline" className={whiteBtn()} onClick={() => { setWatts(0); setWattsInput('0'); }}>Clear</Button>
                </div>
                <Slider value={[watts]} onValueChange={(v) => { const val = Math.round(v[0]); setWatts(val); setWattsInput(String(val)); }} min={4000} max={30000} step={100} />
              </div>
            </section>

            {result && (
              <section className="relative">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Box label="Base Payout" value={result.base} color="text-amber-300" />
                  <Box label="PPW Bonus" value={result.ppwBonus} color="text-orange-300" />
                  <Box label="System Bonus" value={result.bigSystemBonus} color="text-red-300" />
                  <Box label="Total Payout" value={result.total} color={THEMES[theme].accentTotal} highlight={spotlight} />
                </div>

                {/* Falling cash overlay at right side of results */}
                <div className="pointer-events-none absolute -right-2 top-0 bottom-0 w-24 md:w-32 flex items-end justify-center gap-1 pr-2">
                  {cashStacks.map((id, idx) => (
                    <div key={id} style={{ animation: `fall 700ms ease-in`, animationDelay: `${idx * 30}ms` }}>
                      <CashStack />
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <RecomputeButton />
                  <Button variant="outline" className={whiteBtn()} onClick={() => { clearCash(); setBursts([]); }}>
                    Clear Cash
                  </Button>
                </div>
              </section>
            )}

            {/* Micro-Coach */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4">
              <div className="text-xs text-zinc-400 mb-1">{'Micro\u2011Coach'}</div>
              <div className="text-sm text-zinc-100">{coachTip}</div>
            </div>
          </CardContent>
        </Card>

        {/* Sidebar: Personal Tracker + Saved Deals + Rotating Motivation */}
        <Card className="rounded-2xl border border-zinc-800 bg-zinc-950/70">
          <CardHeader>
            <CardTitle className="text-xl text-white">Your Month</CardTitle>
            <p className="text-xs text-white/80">Quick snapshot of your grind</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Personal tracker */}
            <div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/40 bg-white/10 p-3">
                  <div className="text-xs text-white/90">Recomputes</div>
                  <div className={`text-3xl font-bold ${THEMES[theme].accentMonth}`}>{myDeals}</div>
                </div>
                <div className={`rounded-xl border border-white/40 bg-white/10 p-3`}>
                  <div className="text-xs text-white/90">Estimated Earnings</div>
                  <div className={`text-3xl font-bold ${THEMES[theme].accentTotal}`}>${currency(myEarnings)}</div>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <Button
                  variant="outline"
                  className={whiteBtn()}
                  onClick={() => {
                    setMyDeals(0);
                    setMyEarnings(0);
                    try {
                      localStorage.removeItem('sx_myDeals');
                      localStorage.removeItem('sx_myEarn');
                    } catch {}
                  }}
                >
                  Reset
                </Button>
                <Button variant="outline" className={whiteBtn()} onClick={saveCurrent}>
                  Save Current
                </Button>
              </div>
            </div>

            <div className="h-px bg-white/20" />

            {/* Saved Deals */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="text-lg font-semibold text-white">Saved Deals</div>
                <div className="text-xs text-white/60">{saved.length} total</div>
              </div>
              <div className="mb-2 flex items-center gap-2">
                <Input
                  value={savedQuery}
                  onChange={(e) => setSavedQuery(e.target.value)}
                  placeholder="Search name, PPW, watts, total"
                  className="bg-white/10 border-white/30 placeholder:text-white/60"
                />
                <Button variant="outline" className={whiteBtn('shrink-0')} onClick={() => setSavedQuery('')}>Clear</Button>
              </div>
              <div className="space-y-2">
                {saved.length === 0 && <div className="text-sm text-white/70">No saved deals yet.</div>}
                {saved.length > 0 && filteredSaved.length === 0 && (
                  <div className="text-sm text-white/70">No matches. Try a different search.</div>
                )}
                {filteredSaved.map((s) => (
                  <div key={s.id} className="rounded-lg border border-white/30 bg-white/10 p-3">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <div className="font-medium text-sm text-white">{s.name}</div>
                        <div className="text-xs text-white/70">
                          {new Date(s.createdAt).toLocaleString()} • {s.watts} W • PPW {s.ppw.toFixed(2)} • ${currency(s.total)}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className={whiteBtn()} onClick={() => loadDeal(s.id)}>
                          Load
                        </Button>
                        <Button size="sm" variant="outline" className={whiteBtn()} onClick={() => renameDeal(s.id)}>
                          Rename
                        </Button>
                        <Button size="sm" variant="outline" className={whiteBtn()} onClick={() => deleteDeal(s.id)}>
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="h-px bg-white/20" />

            {/* Rotating Motivation */}
            <div className="rounded-xl border border-white/30 bg-white/10 p-4">
              <div className="text-xs text-white/80 mb-1">{'Motivation \u2022 rotates every 15s'}</div>
              <div className="text-sm text-white italic">{QUOTES[quoteIdx]}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
