import { useState } from 'react';
import { Star, Smile, Meh, Frown, Heart, Send, CheckCircle2, Globe, MessageSquare, UserCircle } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { GradientText } from '../ui/GradientText';

const CATEGORIES = [
  { id: 'general', title: 'General Platform', category: 'Global' },
  { id: '1', title: 'Developer Summit 2024', category: 'Conference' },
  { id: '2', title: 'Open Source Workshop', category: 'Education' },
];

export function FeedbackSystem() {
  const [selectedEvent, setSelectedEvent] = useState<string>('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [emoji, setEmoji] = useState('');
  const [comment, setComment] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // --- LIVE FEED STATE ---
  const [feed, setFeed] = useState([
    { id: 'f1', name: 'Anonymous', event: 'General', rating: 5, comment: 'The new UI is incredibly smooth. Loving the experience so far!', date: '2h ago' },
    { id: 'f2', name: 'Ishita G.', event: 'Dev Summit', rating: 4, comment: 'Great speakers, though the Q&A session could have been longer.', date: '5h ago' },
    { id: 'f3', name: 'Rohan M.', event: 'Workshop', rating: 5, comment: 'Highly interactive sessions.', date: '1d ago' },
  ]);

  const reactions = [
    { id: 'sad', icon: Frown, label: 'Poor' },
    { id: 'okay', icon: Meh, label: 'Average' },
    { id: 'happy', icon: Smile, label: 'Good' },
    { id: 'love', icon: Heart, label: 'Excellent' },
  ];

  const handleDispatch = () => {
    if (rating === 0 || !selectedEvent) return;

    // 1. Create the new feedback object
    const eventName = CATEGORIES.find(c => c.id === selectedEvent)?.title || 'General';
    const newEntry = {
      id: Date.now().toString(),
      name: isAnonymous ? 'Anonymous' : 'You', // Shows 'You' for the current session
      event: eventName.replace('Developer ', '').replace('Platform', ''), // Shorten for UI
      rating: rating,
      comment: comment || "No comment provided.",
      date: 'Just now'
    };

    // 2. Add to feed and show success
    setFeed([newEntry, ...feed]);
    setSubmitted(true);
  };

  const resetForm = () => {
    setSubmitted(false);
    setRating(0);
    setEmoji('');
    setComment('');
    setSelectedEvent('');
  };

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <GlassCard className="max-w-md mx-auto p-12 border-cyan-500/20" neonColor="blue">
          <CheckCircle2 size={50} className="mx-auto text-cyan-400 mb-6" />
          <h2 className="text-3xl font-bold text-white mb-2">Dispatch Successful</h2>
          <p className="text-gray-400 mb-8 text-sm">Your feedback has been added to the community pulse.</p>
          <button onClick={resetForm} className="w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-cyan-400 transition-colors uppercase text-xs tracking-widest">
            New Submission
          </button>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Community <GradientText>Insights</GradientText></h1>
        <p className="text-gray-500 text-sm tracking-widest uppercase font-mono text-[10px]">System Status // Public Feedback Loop Active</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em] mb-4 ml-1">Select Channel</h3>
          {CATEGORIES.map(event => (
            <button
              key={event.id}
              onClick={() => setSelectedEvent(event.id)}
              className={`w-full p-5 rounded-xl border transition-all text-left ${
                selectedEvent === event.id ? 'bg-white/10 border-cyan-500/50' : 'bg-white/[0.02] border-white/5 hover:border-white/10'
              }`}
            >
              <p className={`text-[9px] uppercase font-bold mb-1 ${selectedEvent === event.id ? 'text-cyan-400' : 'text-gray-600'}`}>
                {event.category}
              </p>
              <p className="font-semibold text-white tracking-tight">{event.title}</p>
            </button>
          ))}
        </div>

        {/* Form */}
        <div className="lg:col-span-8">
          <GlassCard className="p-8 border-white/5" neonColor="blue">
            <div className={`space-y-10 ${!selectedEvent ? 'opacity-20 pointer-events-none' : 'opacity-100'} transition-opacity`}>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h4 className="text-white font-semibold">Experience Rating</h4>
                  <p className="text-gray-500 text-xs italic">Awaiting your calibration...</p>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button key={star} onMouseEnter={() => setHoverRating(star)} onMouseLeave={() => setHoverRating(0)} onClick={() => setRating(star)}>
                      <Star size={28} className={`${(hoverRating || rating) >= star ? 'fill-cyan-400 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]' : 'text-gray-800'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {reactions.map(r => (
                  <button
                    key={r.id}
                    onClick={() => setEmoji(r.id)}
                    className={`p-3 rounded-xl border transition-all flex items-center gap-3 ${
                      emoji === r.id ? 'bg-cyan-500/10 border-cyan-500/40 text-white' : 'border-white/5 text-gray-600'
                    }`}
                  >
                    <r.icon size={18} className={emoji === r.id ? 'text-cyan-400' : ''} />
                    <span className="text-[10px] uppercase font-bold tracking-widest">{r.label}</span>
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Additional insights (Optional)..."
                  className="w-full bg-black/40 border border-white/5 rounded-xl p-5 text-white text-sm focus:border-cyan-500/50 outline-none min-h-[120px] transition-all"
                />

                <div className="flex items-center justify-between">
                  <button onClick={() => setIsAnonymous(!isAnonymous)} className="flex items-center gap-2 group">
                    <div className={`w-4 h-4 rounded border transition-all ${isAnonymous ? 'bg-cyan-500 border-cyan-500' : 'border-white/20'}`} />
                    <span className="text-[10px] font-bold uppercase text-gray-500 tracking-widest">Ghost Mode</span>
                  </button>

                  <button
                    disabled={rating === 0}
                    onClick={handleDispatch}
                    className="px-10 py-4 bg-white text-black rounded-lg font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-cyan-400 disabled:opacity-20 transition-all shadow-lg"
                  >
                    Dispatch
                  </button>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* --- LIVE COMMUNITY PULSE --- */}
      <div className="mt-20">
        <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4">
          <MessageSquare className="text-cyan-400" size={20} />
          <h3 className="text-xl font-bold text-white uppercase italic tracking-tighter">Community Pulse</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {feed.map((item) => (
            <GlassCard key={item.id} className="p-6 border-white/5 bg-white/[0.01]" hover3d>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${item.name === 'You' ? 'border-cyan-500 bg-cyan-500/20' : 'border-white/10 bg-white/5'}`}>
                    <UserCircle size={18} className={item.name === 'You' ? 'text-cyan-400' : 'text-gray-500'} />
                  </div>
                  <div>
                    <p className={`text-xs font-bold ${item.name === 'You' ? 'text-cyan-400' : 'text-white'}`}>{item.name}</p>
                    <p className="text-[8px] text-gray-600 font-bold uppercase tracking-widest">{item.event}</p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={8} className={i < item.rating ? "fill-cyan-400 text-cyan-400" : "text-gray-800"} />
                  ))}
                </div>
              </div>
              <p className="text-gray-400 text-[11px] leading-relaxed italic line-clamp-3">"{item.comment}"</p>
              <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
                <span className="text-[8px] font-mono text-gray-700 uppercase tracking-tighter">{item.date}</span>
                {item.name === 'You' && <span className="text-[8px] text-cyan-500 font-bold uppercase animate-pulse">Live Entry</span>}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}