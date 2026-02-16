import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, Timer, Zap, CheckCircle2, XCircle, 
  RotateCcw, Flame, Lightbulb, Code2, Cpu, Database, Terminal, Activity, ArrowLeft
} from 'lucide-react';

const CHALLENGES = [
  { category: "Frontend", correct: "React", options: ["React", "PostgreSQL", "Docker", "C++"] },
  { category: "Backend", correct: "Node.js", options: ["CSS", "Node.js", "Figma", "HTML"] },
  { category: "Database", correct: "MongoDB", options: ["Sass", "Python", "MongoDB", "Swift"] },
  { category: "DevOps", correct: "Docker", options: ["Docker", "Redux", "Tailwind", "Unity"] },
  { category: "Language", correct: "Python", options: ["Excel", "Python", "Canva", "WordPress"] },
];

const TECH_FACTS = [
  "Ada Lovelace was the first computer programmer.",
  "Over 90% of the world's currency is digital.",
  "The first 'bug' was an actual moth in a computer.",
  "Python was named after Monty Python, not the snake.",
  "The first domain ever registered was Symbolics.com."
];

// Added the onBack type here
const TechMatch: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [level, setLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameState, setGameState] = useState<'playing' | 'summary'>('playing');
  const [history, setHistory] = useState<{q: string, a: string, correct: string, isRight: boolean}[]>([]);
  const [shake, setShake] = useState(false);
  const [isFirstAttempt, setIsFirstAttempt] = useState(true);

  const speak = (text: string) => {
    const msg = new SpeechSynthesisUtterance(text);
    msg.rate = 1.1;
    msg.pitch = 0.7; 
    window.speechSynthesis.speak(msg);
  };

  const playSound = (type: 'success' | 'fail' | 'start') => {
    const urls = {
        success: 'https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3',
        fail: 'https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3',
        start: 'https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3'
    };
    const audio = new Audio(urls[type === 'start' ? 'success' : type]);
    audio.volume = 0.15;
    audio.play().catch(() => {});
  };

  useEffect(() => {
    if (gameStarted && timeLeft > 0 && gameState === 'playing') {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (gameStarted && timeLeft === 0 && gameState === 'playing') {
      handleChoice("TIMEOUT");
    }
  }, [timeLeft, gameState, gameStarted]);

  const submitToLeaderboard = async (finalScore: number) => {
    const playedBefore = localStorage.getItem('has_played_stackmatch');
    if (!playedBefore) {
        localStorage.setItem('has_played_stackmatch', 'true');
        setIsFirstAttempt(false);
    } else {
        setIsFirstAttempt(false);
    }
  };

  const handleChoice = (choice: string) => {
    const isCorrect = choice === CHALLENGES[level].correct;
    
    setHistory(prev => [...prev, { 
        q: CHALLENGES[level].category, 
        a: choice, 
        correct: CHALLENGES[level].correct, 
        isRight: isCorrect 
    }]);

    if (isCorrect) {
        playSound('success');
        if (streak === 1) speak("Double Combo");
        if (streak === 3) speak("Unstoppable");
        setScore(score + (timeLeft * 10) + (streak >= 2 ? 100 : 0));
        setStreak(streak + 1);
    } else {
        playSound('fail');
        speak("System Error");
        setStreak(0);
        setShake(true);
        setTimeout(() => setShake(false), 500);
    }

    if (level < CHALLENGES.length - 1) {
      setLevel(level + 1);
      setTimeLeft(10 - (level + 1)); 
    } else {
      setGameState('summary');
      submitToLeaderboard(score);
    }
  };

  if (!gameStarted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-6 relative">
        {/* Added Back to Home link */}
        <button onClick={onBack} className="absolute top-0 left-6 flex items-center gap-2 text-gray-500 hover:text-cyan-400 transition-colors font-mono text-[10px] uppercase tracking-widest">
           <ArrowLeft size={14} /> Back to Nexus
        </button>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 p-12 rounded-[3rem] backdrop-blur-3xl shadow-[0_0_100px_rgba(34,211,238,0.1)]"
        >
          <Terminal className="mx-auto mb-6 text-cyan-400" size={64} />
          <h1 className="text-6xl font-black italic uppercase tracking-tighter mb-4">Stack<span className="text-cyan-400">Match</span></h1>
          <p className="text-gray-400 font-mono mb-8 max-w-sm mx-auto uppercase tracking-widest text-[10px]">
            [SECURE_CONNECTION_ESTABLISHED]<br/>IDENTIFY CORE STACKS TO GAIN XP.
          </p>
          <button 
            onClick={() => { setGameStarted(true); playSound('start'); speak("System Initialized"); }}
            className="px-12 py-5 bg-cyan-500 text-black font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-cyan-400 transition-all shadow-xl shadow-cyan-500/20"
          >
            Authorise_Access
          </button>
        </motion.div>
      </div>
    );
  }

  if (gameState === 'summary') {
    return (
      <div className="max-w-2xl mx-auto p-6 mt-10 relative">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-[#0a0a0a] border-2 border-white/10 p-10 rounded-[3rem] text-center shadow-[0_0_50px_rgba(34,211,238,0.15)] relative overflow-hidden">
          <Trophy className="mx-auto mb-4 text-yellow-400" size={60} />
          <h2 className="text-4xl font-black italic text-white uppercase tracking-tighter mb-2">
            Mission {score > 350 ? "Complete" : "Failed"}
          </h2>
          <div className="flex flex-col items-center gap-2 mb-6">
            <p className="text-cyan-400 font-mono text-2xl font-bold tracking-widest uppercase">XP: {score}</p>
            {!isFirstAttempt && (
                <span className="text-[10px] text-gray-500 font-bold uppercase border border-white/10 px-3 py-1 rounded-full">Practice Mode (Not Ranked)</span>
            )}
          </div>

          <div className="bg-white/5 p-4 rounded-2xl mb-6 border border-white/10 text-left">
            <div className="flex items-center gap-2 text-cyan-400 mb-1">
              <Lightbulb size={16} /> <span className="text-[10px] font-bold uppercase tracking-widest italic">Tech Wisdom</span>
            </div>
            <p className="text-xs text-gray-400 italic leading-relaxed font-mono">"{TECH_FACTS[Math.floor(Math.random() * TECH_FACTS.length)]}"</p>
          </div>

          <div className="space-y-2 mb-8 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
            {history.map((h, i) => (
              <div key={i} className="flex items-center justify-between bg-white/[0.03] p-3 rounded-xl border border-white/5 transition-all hover:bg-white/[0.06]">
                <div className="flex items-center gap-3 text-left">
                    {h.isRight ? <CheckCircle2 className="text-green-500" size={16} /> : <XCircle className="text-red-500" size={16} />}
                    <span className="text-[10px] font-bold text-gray-500 uppercase">{h.q}</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className={`text-xs font-mono ${h.isRight ? 'text-green-400' : 'text-red-400 line-through'}`}>{h.a}</span>
                    {!h.isRight && <span className="text-xs font-mono text-cyan-400">{h.correct}</span>}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <button onClick={() => window.location.reload()} className="w-full bg-white text-black font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-3 uppercase tracking-widest hover:bg-cyan-500">
              <RotateCcw size={18} /> Retry Node
            </button>
            {/* Added Exit to Home button */}
            <button onClick={onBack} className="w-full bg-transparent border border-white/10 text-white font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-3 uppercase tracking-widest hover:bg-white/5">
              <ArrowLeft size={18} /> Exit to Home
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div 
      animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
      className={`max-w-5xl mx-auto p-6 space-y-8 min-h-screen text-white relative transition-colors duration-500 ${timeLeft < 3 ? 'bg-red-500/5' : ''}`}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
        <motion.div animate={{ y: [0, -50, 0] }} transition={{ duration: 10, repeat: Infinity }} className="absolute top-20 left-10"><Cpu size={100}/></motion.div>
        <motion.div animate={{ y: [0, 50, 0] }} transition={{ duration: 8, repeat: Infinity }} className="absolute bottom-20 right-10"><Database size={80}/></motion.div>
      </div>

      <div className="flex justify-between items-center bg-black/40 border border-white/10 p-6 rounded-[2rem] backdrop-blur-md relative z-10">
        <div className="flex items-center gap-4">
           <Activity className="text-cyan-500 animate-pulse" size={24} />
           <div>
             <h1 className="text-2xl font-black italic uppercase tracking-tighter">Stack<span className="text-cyan-400 font-normal">Match</span></h1>
             <p className="text-[10px] font-mono text-gray-500 uppercase italic font-bold">Encrypted Link // Pkt: {level + 1}/5</p>
           </div>
        </div>

        <div className="flex items-center gap-6">
          <AnimatePresence>
            {streak >= 2 && (
              <motion.div initial={{ scale: 0, rotate: -10 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }} className="flex items-center gap-2 bg-orange-600 px-4 py-1.5 rounded-full font-black text-xs italic shadow-[0_0_20px_rgba(234,88,12,0.4)]">
                <Flame size={14} fill="white" /> COMBO {streak}X
              </motion.div>
            )}
          </AnimatePresence>
          <div className="text-right">
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Time_Left</p>
            <div className={`font-mono text-2xl font-black ${timeLeft < 4 ? 'text-red-500' : 'text-white'}`}>
              00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
            </div>
          </div>
        </div>
      </div>

      <div className="relative py-16 text-center overflow-hidden">
        <AnimatePresence mode="wait">
            <motion.div key={level} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} className="space-y-4">
                <div className="flex justify-center items-center gap-4 text-cyan-400">
                    <span className="h-px w-12 bg-current opacity-30" />
                    <span className="font-mono text-xs font-bold tracking-[0.5em] uppercase">Target_Substrate</span>
                    <span className="h-px w-12 bg-current opacity-30" />
                </div>
                <h2 className="text-8xl md:text-9xl font-black uppercase italic tracking-tighter text-white drop-shadow-2xl">
                    {CHALLENGES[level].category}
                </h2>
            </motion.div>
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20 relative z-10">
        {CHALLENGES[level].options.map((option, index) => (
          <motion.button
            key={option}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.05)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleChoice(option)}
            className="p-12 bg-white/[0.02] border-2 border-white/5 rounded-[3rem] text-3xl font-black tracking-tight hover:border-cyan-500/50 transition-all relative group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative z-10 uppercase italic">{option}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default TechMatch;