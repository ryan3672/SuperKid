import { useState, useEffect } from "react";
import { supabase } from "./supabase";

const WORD_BANK = [
  { word: "Peculiar", emoji: "🔍", definition: "Something strange or different in an interesting way.", visual: "Imagine a dog wearing tiny sunglasses and reading a newspaper!", example: "That peculiar sound under my bed was just my toy robot." },
  { word: "Enormous", emoji: "🐘", definition: "Really, really BIG — much bigger than usual.", visual: "Picture an elephant so huge it can barely fit through your front door!", example: "The enormous pizza covered the whole kitchen table." },
  { word: "Gentle", emoji: "🕊️", definition: "Being soft, careful, and kind — not rough or loud.", visual: "Think of someone tiptoeing through a room of sleeping kittens.", example: "She was gentle holding the tiny baby bunny." },
  { word: "Radiant", emoji: "✨", definition: "Glowing with bright light — or looking very happy!", visual: "Picture the sun bursting through clouds after rain.", example: "His face was radiant when he saw his birthday present!" },
  { word: "Curious", emoji: "🔭", definition: "Wanting to learn — always asking why and how!", visual: "Imagine a little explorer with a giant magnifying glass peering into every flower.", example: "She was so curious she followed the butterflies all afternoon." },
  { word: "Brave", emoji: "🦁", definition: "Doing something even when you feel scared — having courage!", visual: "Think of a tiny knight saying hello to a fire-breathing dragon.", example: "He was brave enough to try the new food, and it was delicious!" },
  { word: "Ancient", emoji: "🏛️", definition: "Incredibly old — from a very, very long time ago.", visual: "Imagine a dinosaur skeleton so old your great-great-grandparents never saw it alive.", example: "The ancient tree was already huge when great-grandma was born!" },
  { word: "Generous", emoji: "🎁", definition: "Loving to share and give — having a very kind heart.", visual: "Picture someone with a basket of cookies handing them out to everyone they pass.", example: "She was so generous she shared her snack even though she was hungry." },
  { word: "Cozy", emoji: "🧸", definition: "Warm, comfortable, and safe — like the best hug ever.", visual: "Imagine the fluffiest blanket and stuffed animals while rain patters on the window.", example: "Reading with dad in the big armchair felt so cozy." },
  { word: "Magnificent", emoji: "🌅", definition: "So amazing and beautiful it makes you gasp and say WOW!", visual: "Picture a golden castle rising above a rainbow waterfall with flags waving.", example: "The fireworks were so magnificent everyone said ooooh at the same time!" },
  { word: "Wobbly", emoji: "🍮", definition: "Shaking or moving side to side instead of staying still.", visual: "Imagine a tower of jello wiggling every time someone walks nearby!", example: "His first balance beam try was very wobbly but he didn't fall!" },
  { word: "Grumpy", emoji: "😤", definition: "Feeling cranky and annoyed — not in a happy mood.", visual: "Picture a bear who woke up to find someone ate all his honey!", example: "He was grumpy before breakfast but cheered up after pancakes." },
  { word: "Shimmer", emoji: "💎", definition: "To shine with soft flickering light — like little sparkles.", visual: "Imagine sunlight on a lake making thousands of tiny dancing diamonds.", example: "Her costume made her shimmer like a real star when she twirled." },
  { word: "Dazzle", emoji: "🌟", definition: "To amaze someone so much they can barely believe it.", visual: "Picture a magician pulling star after star out of a hat filling the room with light!", example: "Her volcano project dazzled the whole class with pink foam!" },
  { word: "Snug", emoji: "🐣", definition: "Fitting perfectly — warm and tucked in just right.", visual: "Think of a baby chick tucked under its mama's warm wing.", example: "The sleeping bag was so snug it felt like being hugged all night." },
  { word: "Whirl", emoji: "🌀", definition: "To spin around very fast — like a top or leaf in the wind.", visual: "Picture a ballerina spinning so fast she becomes a blur of sparkles!", example: "She loved to whirl in the fallen leaves until she got dizzy." },
  { word: "Delicate", emoji: "🦋", definition: "Very fragile — needing to be handled with great care.", visual: "Think of a soap bubble floating in the air — one touch and it vanishes.", example: "The delicate butterfly sat on her finger without making a sound." },
  { word: "Murmur", emoji: "🌊", definition: "A soft, low, gentle sound — like quiet voices or a tiny stream.", visual: "Imagine a brook whispering over pebbles in a quiet forest.", example: "He heard the murmur of his parents talking as he fell asleep." },
  { word: "Plunge", emoji: "🏊", definition: "To jump or dive quickly and deeply into something.", visual: "Think of a penguin cannonballing off an ice cliff — SPLASH!", example: "He plunged into the pool and swam all the way to the other side." },
  { word: "Towering", emoji: "🗼", definition: "So tall you have to tip your head all the way back to see the top.", visual: "Imagine pancakes so tall they poke right through the ceiling!", example: "The towering giraffe could look right into the second floor windows." },
];

const DEFAULT_PRIZES = [
  { id: "1", emoji: "🍦", label: "Ice Cream Trip", cost: 10 },
  { id: "2", emoji: "🎮", label: "30 Min Extra Screen Time", cost: 15 },
  { id: "3", emoji: "🎬", label: "Movie Night Pick", cost: 20 },
  { id: "4", emoji: "🧸", label: "New Toy", cost: 50 },
];

const CONFETTI_COLORS = ["#FFD700","#FF6B6B","#4ECDC4","#45B7D1","#96CEB4","#FFEAA7","#DDA0DD"];

function getTodayWord() {
  const now = new Date();
  const day = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
  return WORD_BANK[day % WORD_BANK.length];
}

function Confetti({ active }) {
  const [pieces] = useState(() => Array.from({ length: 40 }, (_, i) => ({
    left: Math.random() * 100, size: 8 + Math.random() * 8,
    color: CONFETTI_COLORS[i % 7], round: Math.random() > 0.5,
    dur: 1.5 + Math.random() * 2, delay: Math.random() * 0.8, rot: Math.random() * 360,
  })));
  if (!active) return null;
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 1000 }}>
      {pieces.map((p, i) => (
        <div key={i} style={{
          position: "absolute", left: `${p.left}%`, top: "-10px",
          width: p.size, height: p.size, backgroundColor: p.color,
          borderRadius: p.round ? "50%" : "2px",
          animation: `fall ${p.dur}s ease-in forwards`,
          animationDelay: `${p.delay}s`, transform: `rotate(${p.rot}deg)`,
        }} />
      ))}
    </div>
  );
}

function LoginScreen({ onLogin }) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin() {
    const c = code.trim().toUpperCase();
    if (!c) return;
    setLoading(true); setError("");
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("family_code", c)
        .single();
      if (error && error.code === "PGRST116") {
        const { data: newData, error: insertError } = await supabase
          .from("profiles")
          .insert({ family_code: c, points: 0, log: [], prizes: DEFAULT_PRIZES, word_history: [], used_date: "" })
          .select()
          .single();
        if (insertError) throw insertError;
        onLogin(c, newData);
      } else if (error) {
        throw error;
      } else {
        onLogin(c, data);
      }
    } catch (e) {
      setError("Something went wrong. Try again!");
    }
    setLoading(false);
  }

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg,#1a1a6e,#2d1b69 40%,#11998e 75%,#38ef7d)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ background: "rgba(255,255,255,0.12)", borderRadius: 24, padding: 36, width: "100%", maxWidth: 380, textAlign: "center", border: "2px solid rgba(255,255,255,0.2)" }}>
        <div style={{ fontSize: 56, marginBottom: 12 }}>⭐</div>
        <h1 style={{ color: "white", fontWeight: "bold", fontSize: 32, marginBottom: 8 }}>SuperKid</h1>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, marginBottom: 28 }}>Enter your family code to get started. Share the same code across all your devices!</p>
        <input
          value={code}
          onChange={e => setCode(e.target.value.toUpperCase())}
          onKeyDown={e => e.key === "Enter" && handleLogin()}
          placeholder="FAMILY CODE (e.g. RYAN)"
          maxLength={10}
          style={{ width: "100%", background: "rgba(255,255,255,0.15)", border: "2px solid rgba(255,255,255,0.3)", borderRadius: 14, padding: "14px 16px", color: "white", fontSize: 22, textAlign: "center", outline: "none", letterSpacing: 4, fontWeight: "bold", marginBottom: 12 }}
        />
        {error && <p style={{ color: "#FF6B6B", fontSize: 13, marginBottom: 10 }}>{error}</p>}
        <button onClick={handleLogin} disabled={loading} style={{ width: "100%", background: "linear-gradient(135deg,#FF6B6B,#FF8E53)", border: "none", borderRadius: 14, padding: "16px", color: "white", fontWeight: "bold", fontSize: 20, cursor: "pointer" }}>
          {loading ? "Loading..." : "Let's Go! 🚀"}
        </button>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, marginTop: 16 }}>New code = new profile. Same code on any device = shared profile.</p>
      </div>
    </div>
  );
}

function WordTab({ w, onUsed, used }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.11)", borderRadius: 22, padding: 20, border: "2px solid rgba(255,255,255,0.2)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
        <span style={{ fontSize: 36 }}>{w.emoji}</span>
        <div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: 2 }}>Word of the Day</div>
          <div style={{ fontSize: 32, color: "#FFD700", fontWeight: "bold", lineHeight: 1 }}>{w.word}</div>
        </div>
      </div>
      {[["Means", "#4ECDC4", w.definition, false], ["🌟 Picture", "#96CEB4", w.visual, false], ["💬 Example", "#FFEAA7", `"${w.example}"`, true]].map(([lbl, col, txt, ital]) => (
        <div key={lbl} style={{ background: "rgba(255,255,255,0.09)", borderRadius: 12, padding: "11px 13px", marginBottom: 9 }}>
          <p style={{ color: "white", fontSize: 14, margin: 0, lineHeight: 1.55, fontStyle: ital ? "italic" : "normal" }}>
            <strong style={{ color: col, fontStyle: "normal" }}>{lbl}: </strong>{txt}
          </p>
        </div>
      ))}
      {used
        ? <div style={{ background: "linear-gradient(135deg,#96CEB4,#4ECDC4)", borderRadius: 13, padding: "13px 18px", textAlign: "center", marginTop: 6 }}>
            <span style={{ color: "white", fontWeight: "bold", fontSize: 17 }}>🎉 He used it today! +2 pts!</span>
          </div>
        : <button onClick={onUsed} style={{ width: "100%", background: "linear-gradient(135deg,#FF6B6B,#FF8E53)", border: "none", borderRadius: 13, padding: "15px 20px", color: "white", fontWeight: "bold", fontSize: 18, cursor: "pointer", marginTop: 6 }}>
            🗣️ Used it in a sentence! +2 pts
          </button>
      }
    </div>
  );
}

function PointsTab({ log, onAdd }) {
  const [reason, setReason] = useState("");
  const [amt, setAmt] = useState(1);
  return (
    <div>
      <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: 20, padding: 18, border: "2px solid rgba(255,255,255,0.18)", marginBottom: 13 }}>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: 1, textAlign: "center", marginBottom: 12 }}>PARENT CONTROLS</div>
        <input value={reason} onChange={e => setReason(e.target.value)} placeholder="Reason (e.g. helped set the table)"
          style={{ width: "100%", background: "rgba(255,255,255,0.1)", border: "2px solid rgba(255,255,255,0.18)", borderRadius: 11, padding: "10px 12px", color: "white", fontSize: 14, outline: "none", marginBottom: 10 }} />
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 13 }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center", background: "rgba(255,255,255,0.1)", border: "2px solid rgba(255,255,255,0.18)", borderRadius: 11, overflow: "hidden" }}>
            <button onClick={() => setAmt(a => Math.max(1, a - 1))} style={{ background: "none", border: "none", color: "white", fontSize: 22, padding: "8px 14px", cursor: "pointer" }}>−</button>
            <span style={{ flex: 1, textAlign: "center", fontSize: 22, color: "#FFD700", fontWeight: "bold" }}>{amt}</span>
            <button onClick={() => setAmt(a => a + 1)} style={{ background: "none", border: "none", color: "white", fontSize: 22, padding: "8px 14px", cursor: "pointer" }}>+</button>
          </div>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>pts</span>
        </div>
        <div style={{ display: "flex", gap: 9 }}>
          <button onClick={() => { onAdd(amt, reason.trim() || "Good behavior 🌟"); setReason(""); }}
            style={{ flex: 1, background: "linear-gradient(135deg,#2ecc71,#27ae60)", border: "none", borderRadius: 12, padding: "14px 0", color: "white", fontWeight: "bold", fontSize: 17, cursor: "pointer" }}>✅ Award</button>
          <button onClick={() => { onAdd(-amt, reason.trim() || "Behavior reminder"); setReason(""); }}
            style={{ flex: 1, background: "linear-gradient(135deg,#e74c3c,#c0392b)", border: "none", borderRadius: 12, padding: "14px 0", color: "white", fontWeight: "bold", fontSize: 17, cursor: "pointer" }}>❌ Deduct</button>
        </div>
      </div>
      <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: 18, padding: 15, border: "2px solid rgba(255,255,255,0.1)" }}>
        <div style={{ fontSize: 17, color: "white", fontWeight: "bold", marginBottom: 10 }}>📋 Activity Log</div>
        {log.length === 0
          ? <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, textAlign: "center", padding: "10px 0" }}>No activity yet!</div>
          : log.slice(0, 20).map((e, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: e.delta > 0 ? "rgba(46,204,113,0.1)" : "rgba(231,76,60,0.1)", borderRadius: 10, padding: "9px 12px", marginBottom: 7, borderLeft: `3px solid ${e.delta > 0 ? "#2ecc71" : "#e74c3c"}` }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "white" }}>{e.reason}</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>{e.d}</div>
              </div>
              <div style={{ fontSize: 18, fontWeight: "bold", color: e.delta > 0 ? "#2ecc71" : "#e74c3c" }}>{e.delta > 0 ? "+" : ""}{e.delta}</div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

function PrizesTab({ pts, prizes, onSave }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(prizes);
  const [em, setEm] = useState("🎁");
  const [lbl, setLbl] = useState("");
  const [cost, setCost] = useState(10);

  function add() {
    if (!lbl.trim()) return;
    setDraft(d => [...d, { id: Date.now() + "", emoji: em, label: lbl.trim(), cost: parseInt(cost) || 10 }]);
    setLbl(""); setEm("🎁"); setCost(10);
  }
  function save() { onSave(draft); setEditing(false); }
  const sorted = [...(editing ? draft : prizes)].sort((a, b) => a.cost - b.cost);
  const inp = { background: "rgba(255,255,255,0.1)", border: "2px solid rgba(255,255,255,0.18)", borderRadius: 10, padding: "9px 11px", color: "white", fontSize: 14, outline: "none" };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ fontSize: 19, color: "white", fontWeight: "bold" }}>🎁 Prize Board</div>
        {!editing
          ? <button onClick={() => { setDraft(prizes); setEditing(true); }} style={{ background: "rgba(255,255,255,0.12)", border: "2px solid rgba(255,255,255,0.2)", borderRadius: 9, padding: "6px 13px", color: "white", fontWeight: "bold", fontSize: 12, cursor: "pointer" }}>✏️ Edit</button>
          : <button onClick={save} style={{ background: "linear-gradient(135deg,#2ecc71,#27ae60)", border: "none", borderRadius: 9, padding: "6px 13px", color: "white", fontWeight: "bold", fontSize: 14, cursor: "pointer" }}>💾 Save</button>
        }
      </div>
      {sorted.map(p => {
        const ok = pts >= p.cost;
        return (
          <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 12, borderRadius: 15, padding: "12px 14px", marginBottom: 8, background: ok ? "rgba(255,215,0,0.15)" : "rgba(255,255,255,0.07)", border: ok ? "2px solid rgba(255,215,0,0.4)" : "2px solid rgba(255,255,255,0.1)" }}>
            <span style={{ fontSize: 28 }}>{p.emoji}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: "bold", color: ok ? "#FFD700" : "white" }}>{p.label}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{p.cost} pts needed</div>
            </div>
            {ok ? <div style={{ fontSize: 13, color: "#2ecc71", fontWeight: "bold" }}>🎉 Unlocked!</div>
                : <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{p.cost - pts} to go</div>}
            {editing && <button onClick={() => setDraft(d => d.filter(x => x.id !== p.id))} style={{ background: "rgba(231,76,60,0.2)", border: "none", borderRadius: 7, padding: "5px 8px", color: "#e74c3c", cursor: "pointer" }}>✕</button>}
          </div>
        );
      })}
      {editing && (
        <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 15, padding: 15, border: "2px dashed rgba(255,255,255,0.2)", marginTop: 10 }}>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", marginBottom: 10 }}>Add a prize:</div>
          <div style={{ display: "flex", gap: 7, marginBottom: 8 }}>
            <input value={em} onChange={e => setEm(e.target.value)} style={{ ...inp, width: 46, textAlign: "center", fontSize: 20, padding: "8px 4px" }} />
            <input value={lbl} onChange={e => setLbl(e.target.value)} placeholder="Prize name" style={{ ...inp, flex: 1 }} />
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input type="number" value={cost} onChange={e => setCost(e.target.value)} style={{ ...inp, width: 75, color: "#FFD700", fontWeight: "bold", fontSize: 18 }} />
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>pts</span>
            <button onClick={add} style={{ marginLeft: "auto", background: "linear-gradient(135deg,#4ECDC4,#45B7D1)", border: "none", borderRadius: 9, padding: "9px 16px", color: "white", fontWeight: "bold", fontSize: 15, cursor: "pointer" }}>+ Add</button>
          </div>
        </div>
      )}
    </div>
  );
}

function HistoryTab({ history }) {
  if (!history.length) return (
    <div style={{ textAlign: "center", padding: 36 }}>
      <div style={{ fontSize: 44, marginBottom: 10 }}>📭</div>
      <div style={{ color: "rgba(255,255,255,0.4)" }}>No words yet — start today!</div>
    </div>
  );
  return (
    <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: 20, padding: 16, border: "2px solid rgba(255,255,255,0.1)" }}>
      <div style={{ fontSize: 18, color: "white", fontWeight: "bold", marginBottom: 12 }}>📚 Words Learned</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
        {history.map((x, i) => (
          <span key={i} style={{ background: x.used ? "rgba(78,205,196,0.18)" : "rgba(255,255,255,0.07)", border: x.used ? "1px solid rgba(78,205,196,0.35)" : "1px solid rgba(255,255,255,0.1)", borderRadius: 18, padding: "5px 12px", display: "inline-flex", alignItems: "center", gap: 5, fontSize: 13, color: "white" }}>
            {x.emoji} {x.word} {x.used && "✅"}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const today = new Date().toDateString();
  const w = getTodayWord();

  const [familyCode, setFamilyCode] = useState(() => localStorage.getItem("sk_code") || "");
  const [profile, setProfile] = useState(null);
  const [pts, setPts] = useState(0);
  const [log, setLog] = useState([]);
  const [used, setUsed] = useState(false);
  const [history, setHistory] = useState([]);
  const [prizes, setPrizes] = useState(DEFAULT_PRIZES);
  const [confetti, setConfetti] = useState(false);
  const [tab, setTab] = useState("word");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (familyCode) loadProfile(familyCode);
  }, []);

  async function loadProfile(code) {
    const { data, error } = await supabase.from("profiles").select("*").eq("family_code", code).single();
    if (data) {
      setProfile(data);
      setPts(data.points || 0);
      setLog(data.log || []);
      setHistory(data.word_history || []);
      setPrizes(data.prizes || DEFAULT_PRIZES);
      setUsed(data.used_date === today);
    }
  }

  async function saveProfile(updates) {
    setSaving(true);
    await supabase.from("profiles").update(updates).eq("family_code", familyCode);
    setSaving(false);
  }

  function handleLogin(code, data) {
    localStorage.setItem("sk_code", code);
    setFamilyCode(code);
    setProfile(data);
    setPts(data.points || 0);
    setLog(data.log || []);
    setHistory(data.word_history || []);
    setPrizes(data.prizes || DEFAULT_PRIZES);
    setUsed(data.used_date === today);
  }

  async function addPoints(delta, reason) {
    const next = Math.max(0, pts + delta);
    const entry = { delta, reason, d: new Date().toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }) };
    const newLog = [entry, ...log];
    setPts(next); setLog(newLog);
    await saveProfile({ points: next, log: newLog });
    if (delta > 0) { setConfetti(true); setTimeout(() => setConfetti(false), 2000); }
  }

  async function handleWordUsed() {
    const next = Math.max(0, pts + 2);
    const entry = { delta: 2, reason: `Said "${w.word}" in a sentence`, d: new Date().toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }) };
    const newLog = [entry, ...log];
    const newHistory = [{ word: w.word, emoji: w.emoji, used: true }, ...history.filter(x => x.word !== w.word)];
    setPts(next); setLog(newLog); setUsed(true); setHistory(newHistory);
    await saveProfile({ points: next, log: newLog, word_history: newHistory, used_date: today });
    setConfetti(true); setTimeout(() => setConfetti(false), 2000);
  }

  async function handleSavePrizes(p) {
    setPrizes(p);
    await saveProfile({ prizes: p });
  }

  if (!familyCode || !profile) return <LoginScreen onLogin={handleLogin} />;

  const TABS = [{ id: "word", label: "📖 Word" }, { id: "points", label: "⭐ Points" }, { id: "prizes", label: "🎁 Prizes" }, { id: "history", label: "📚 Words" }];

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: sans-serif; }
        body { background: linear-gradient(160deg,#1a1a6e,#2d1b69 40%,#11998e 75%,#38ef7d); min-height: 100vh; }
        input::placeholder { color: rgba(255,255,255,0.3); }
        input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; }
        @keyframes fall { to { transform: translateY(110vh) rotate(720deg); opacity: 0; } }
      `}</style>
      <Confetti active={confetti} />
      <div style={{ paddingBottom: 40 }}>
        <div style={{ padding: "22px 16px 14px", textAlign: "center", background: "rgba(0,0,0,0.15)", marginBottom: 14 }}>
          <div style={{ fontSize: 28, color: "white", fontWeight: "bold" }}>⭐ SuperKid</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>Family code: {familyCode} {saving && "· saving..."}</div>
        </div>
        <div style={{ maxWidth: 460, margin: "0 auto", padding: "0 13px" }}>
          <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 18, padding: "12px 18px", marginBottom: 12, display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ fontSize: 32 }}>⭐</div>
            <div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: 1 }}>Total Points</div>
              <div style={{ fontSize: 32, color: "#FFD700", fontWeight: "bold", lineHeight: 1 }}>{pts}</div>
            </div>
            <button onClick={() => { localStorage.removeItem("sk_code"); setFamilyCode(""); setProfile(null); }}
              style={{ marginLeft: "auto", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 8, padding: "5px 10px", color: "rgba(255,255,255,0.5)", fontSize: 11, cursor: "pointer" }}>
              Switch
            </button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 5, marginBottom: 14 }}>
            {TABS.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "8px 0", background: tab === t.id ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.07)", border: tab === t.id ? "2px solid rgba(255,255,255,0.35)" : "2px solid transparent", borderRadius: 10, color: "white", fontWeight: "bold", fontSize: 11, cursor: "pointer" }}>{t.label}</button>
            ))}
          </div>
          {tab === "word"    && <WordTab    w={w} onUsed={handleWordUsed} used={used} />}
          {tab === "points"  && <PointsTab  log={log} onAdd={addPoints} />}
          {tab === "prizes"  && <PrizesTab  pts={pts} prizes={prizes} onSave={handleSavePrizes} />}
          {tab === "history" && <HistoryTab history={history} />}
        </div>
      </div>
    </>
  );
}