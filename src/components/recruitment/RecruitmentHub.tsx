import { useState } from 'react';
import { 
  Users, Code, Palette, Megaphone, Settings, Star, ExternalLink, 
  ShieldCheck, Zap, Globe, Award, Rocket, Plus, Minus, Target, Clock, Heart
} from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { GradientText } from '../ui/GradientText';

const GOOGLE_FORM_LINKS = {
  core: "https://forms.google.com/your-core-team-form",
  member: "https://forms.google.com/your-member-form"
};

const FAQ_ITEMS = [
  { q: "Can I apply for multiple domains?", a: "Yes, you can specify your interests in the form, but you will be recruited for one primary domain based on your performance." },
  { q: "What is the selection process?", a: "The journey consists of Form Screening -> Domain Task Phase -> Personal Interview." },
  { q: "Do I need prior experience?", a: "For Member roles, we prioritize passion and consistency. For Core roles, prior leadership or domain expertise is preferred." },
];

export function RecruitmentHub() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      {/* --- 1. HERO SECTION --- */}
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-[10px] font-bold uppercase tracking-[0.4em] animate-pulse">
          <Globe size={12} /> Global IEEE Network // 2024-25
        </div>
        <h1 className="text-6xl md:text-7xl font-black italic uppercase tracking-tighter text-white mb-6">
          Level <span className="text-cyan-400">Up</span> Your <GradientText>Legacy</GradientText>
        </h1>
        <p className="text-gray-500 font-mono text-xs uppercase tracking-[0.3em] max-w-2xl mx-auto leading-relaxed">
          Recruitment is now active. Choose your track and join the force.
        </p>
      </div>

      {/* --- 2. DUAL TRACK CARDS (HIGH POP) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-24">
        
        {/* CORE TEAM (BLUE/CYAN) */}
        <GlassCard className="p-10 border-cyan-500/30 relative overflow-hidden group" neonColor="blue" hover3d>
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-4xl font-black italic text-white uppercase tracking-tighter">Core Team</h2>
                <p className="text-cyan-400 font-mono text-[10px] uppercase tracking-widest mt-1">Leadership Track</p>
              </div>
              <ShieldCheck size={44} className="text-cyan-500 opacity-60 group-hover:scale-110 transition-transform" />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                <p className="text-[9px] text-gray-500 uppercase font-black mb-1">Eligibility</p>
                <p className="text-xs text-white font-bold">3rd & 4th Year</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                <p className="text-[9px] text-gray-500 uppercase font-black mb-1">Weekly Commitment</p>
                <p className="text-xs text-white font-bold">8-12 Hours</p>
              </div>
            </div>

            <div className="space-y-4 mb-12">
              <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Expectations</h4>
              {['Strategic Decision Making', 'Managing Domain Logistics', 'Mentorship & Leadership'].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-gray-300">
                  <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full shadow-[0_0_8px_cyan]" />
                  {item}
                </div>
              ))}
            </div>

            <a href={GOOGLE_FORM_LINKS.core} target="_blank" className="mt-auto w-full py-5 bg-cyan-500 text-black font-black uppercase text-xs tracking-widest rounded-xl hover:bg-cyan-400 transition-all text-center shadow-[0_0_30px_rgba(34,211,238,0.3)]">
              Dispatch Core Application
            </a>
          </div>
        </GlassCard>

        {/* MEMBERS (PINK/VIOLET POP) */}
        <GlassCard className="p-10 border-pink-500/30 relative overflow-hidden group" neonColor="pink" hover3d>
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-4xl font-black italic text-white uppercase tracking-tighter">Members</h2>
                <p className="text-pink-500 font-mono text-[10px] uppercase tracking-widest mt-1">Growth Track</p>
              </div>
              <Zap size={44} className="text-pink-500 opacity-60 group-hover:scale-110 transition-transform" />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                <p className="text-[9px] text-gray-500 uppercase font-black mb-1">Eligibility</p>
                <p className="text-xs text-white font-bold">1st, 2nd, 3rd Year</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                <p className="text-[9px] text-gray-500 uppercase font-black mb-1">Weekly Commitment</p>
                <p className="text-xs text-white font-bold">4-6 Hours</p>
              </div>
            </div>

            <div className="space-y-4 mb-12">
              <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Expectations</h4>
              {['Technical/Design Contribution', 'Event Execution Support', 'Active Participation'].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-gray-300">
                  <div className="w-1.5 h-1.5 bg-pink-500 rounded-full shadow-[0_0_8px_#ec4899]" />
                  {item}
                </div>
              ))}
            </div>

            <a href={GOOGLE_FORM_LINKS.member} target="_blank" className="mt-auto w-full py-5 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-black uppercase text-xs tracking-widest rounded-xl hover:opacity-90 transition-all text-center shadow-[0_0_30px_rgba(236,72,153,0.3)]">
              Dispatch Member Application
            </a>
          </div>
        </GlassCard>
      </div>

      {/* --- 3. DOMAINS AT A GLANCE (RESTORED) --- */}
      <div className="mb-32">
        <h3 className="text-center text-[10px] font-black text-gray-500 uppercase tracking-[0.5em] mb-12">Deployment Domains</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Code, name: 'Technical', desc: 'Dev, AI/ML, Cloud' },
            { icon: Palette, name: 'Design', desc: 'UI/UX, Graphics' },
            { icon: Megaphone, name: 'Content', desc: 'PR, Writing' },
            { icon: Settings, name: 'Management', desc: 'Ops & Events' }
          ].map((domain, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-white/10 transition-colors text-center group">
              <domain.icon className="mx-auto mb-4 text-gray-700 group-hover:text-white transition-colors" size={28} />
              <h4 className="text-white text-sm font-bold uppercase italic tracking-tighter mb-1">{domain.name}</h4>
              <p className="text-[10px] text-gray-600 font-mono uppercase">{domain.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* --- 4. PERKS SECTION (RESTORED) --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
        {[
          { icon: Award, title: "Official Certification", desc: "Recognized IEEE Global credentials." },
          { icon: Heart, title: "Vibrant Community", desc: "Join 100+ passionate tech enthusiasts." },
          { icon: Rocket, title: "Career Boost", desc: "Hands-on experience that shines on resumes." },
        ].map((perk, i) => (
          <div key={i} className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 text-center">
            <perk.icon className="mx-auto mb-4 text-cyan-400" size={32} />
            <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-2">{perk.title}</h4>
            <p className="text-gray-500 text-[11px] leading-relaxed italic">{perk.desc}</p>
          </div>
        ))}
      </div>

      {/* --- 5. FAQ (RESTORED & REFINED) --- */}
      <div className="max-w-3xl mx-auto">
        <h3 className="text-center text-xl font-black italic text-white uppercase tracking-tighter mb-8">FAQ / <span className="text-pink-500">Guidelines</span></h3>
        <div className="space-y-3">
          {FAQ_ITEMS.map((faq, i) => (
            <div key={i} className="bg-black/40 border border-white/5 rounded-xl overflow-hidden">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full p-5 flex justify-between items-center text-left">
                <span className="text-xs font-bold uppercase tracking-widest text-gray-300">{faq.q}</span>
                {openFaq === i ? <Minus size={14} className="text-pink-500" /> : <Plus size={14} className="text-gray-600" />}
              </button>
              {openFaq === i && (
                <div className="px-5 pb-5 text-gray-500 text-xs leading-relaxed animate-in fade-in slide-in-from-top-1">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}