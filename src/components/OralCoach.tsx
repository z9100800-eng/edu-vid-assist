import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mic2, MessageCircle, Play, Timer, Award, UserCheck } from 'lucide-react';
import { toast } from 'sonner';

export const OralCoach: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [isPracticing, setIsPracticing] = useState(false);
  const [timer, setTimer] = useState(0);

  const startPractice = () => {
    if (!topic) {
      toast.error('Enter your presentation topic first!');
      return;
    }
    setIsPracticing(true);
    toast.success('Practice session started! Speak clearly.');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-slate-900 flex items-center justify-center gap-2">
          <Mic2 className="text-emerald-600" />
          Oral Coach
        </h1>
        <p className="text-slate-500">Perfect your delivery. Generate scripts and practice with AI feedback.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-indigo-500" />
              Presentation Topic
            </h3>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. My History Project on Rome"
                className="flex-1 p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
              <button 
                onClick={() => toast.info('Generating custom script...')}
                className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-xl font-semibold hover:bg-indigo-200 transition-colors"
              >
                Get Script
              </button>
            </div>
          </div>

          <div className="bg-slate-900 rounded-2xl p-8 relative overflow-hidden h-80 flex flex-col items-center justify-center text-center">
            {isPracticing ? (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-center gap-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-white font-mono text-4xl">02:45</span>
                </div>
                <div className="space-y-2">
                  <p className="text-slate-400 text-sm uppercase tracking-widest">Live Coaching</p>
                  <p className="text-xl text-emerald-400 font-medium">"You're speaking a bit fast. Take a breath."</p>
                </div>
                <button 
                  onClick={() => setIsPracticing(false)}
                  className="bg-red-500 text-white px-8 py-3 rounded-full font-bold hover:bg-red-600 transition-all"
                >
                  Stop Session
                </button>
              </motion.div>
            ) : (
              <div className="space-y-6">
                <div className="w-20 h-20 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto border-2 border-indigo-500/50">
                  <Play className="w-8 h-8 text-indigo-400 fill-indigo-400" />
                </div>
                <h3 className="text-white text-xl font-bold">Ready to practice?</h3>
                <p className="text-slate-400 max-w-xs mx-auto">
                  Click the button below to start your oral presentation. We'll track your speed, tone, and filler words.
                </p>
                <button 
                  onClick={startPractice}
                  className="bg-white text-slate-900 px-8 py-3 rounded-full font-bold hover:bg-indigo-50 transition-all shadow-lg shadow-white/10"
                >
                  Start Practice
                </button>
              </div>
            )}
            
            {/* Visualizer bars */}
            <div className="absolute bottom-0 left-0 right-0 h-12 flex items-end justify-center gap-1 opacity-20 px-4">
              {[...Array(20)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-full bg-indigo-400 rounded-t-sm"
                  style={{ height: `${Math.random() * 100}%` }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Timer className="w-5 h-5 text-amber-500" />
              Target Duration
            </h3>
            <div className="space-y-4">
              <input type="range" min="1" max="15" className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
              <div className="flex justify-between text-sm font-bold text-slate-600">
                <span>1 min</span>
                <span className="text-indigo-600">5 mins</span>
                <span>15 mins</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-6 rounded-2xl text-white shadow-lg shadow-emerald-100">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Award className="w-5 h-5" />
              Quick Tips
            </h3>
            <ul className="space-y-3 text-sm opacity-90">
              <li className="flex gap-2">
                <UserCheck className="w-4 h-4 shrink-0" />
                Maintain eye contact with your virtual audience.
              </li>
              <li className="flex gap-2">
                <UserCheck className="w-4 h-4 shrink-0" />
                Avoid "um" and "uh" by pausing between points.
              </li>
              <li className="flex gap-2">
                <UserCheck className="w-4 h-4 shrink-0" />
                Use gestures to emphasize key findings.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};