import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, Sparkles, Wand2, Download, Share2, Play, Pause, RefreshCw, Volume2 } from 'lucide-react';
import { toast } from 'sonner';

export const Cartoonify: React.FC = () => {
  const [subject, setSubject] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleGenerate = () => {
    if (!subject) {
      toast.error('What subject should we animate?');
      return;
    }
    setIsGenerating(true);
    setVideoUrl(null);

    // Simulate the animation generation process
    setTimeout(() => {
      setIsGenerating(false);
      setVideoUrl('https://storage.googleapis.com/dala-prod-public-storage/generated-images/585d6bc5-b49b-43a3-8b66-b40f0e370792/math-cartoon-explanation-ee6fe47b-1774987728126.webp');
      toast.success('Cartoon video generated! Time to learn.');
    }, 4000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-slate-900 flex items-center justify-center gap-2">
          <div className="relative">
            <Video className="text-amber-500" />
            <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-yellow-400 animate-pulse" />
          </div>
          Cartoonify Subject
        </h1>
        <p className="text-slate-500">Turn any complex topic into a fun, easy-to-understand cartoon video.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-8 space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-700 uppercase tracking-tight">Enter Your Subject</label>
            <div className="flex flex-col md:flex-row gap-4">
              <input 
                type="text" 
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. How Photosynthesis works, The Pythagorean Theorem, Civil War..."
                className="flex-1 p-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-amber-500 outline-none text-lg"
              />
              <button 
                onClick={handleGenerate}
                disabled={isGenerating}
                className="bg-amber-500 text-white px-8 py-4 rounded-2xl font-bold hover:bg-amber-600 transition-all shadow-lg shadow-amber-100 flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isGenerating ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5" />}
                {isGenerating ? 'Drawing...' : 'Animate Subject'}
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {isGenerating && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="aspect-video bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center space-y-6 p-12 text-center"
              >
                <div className="relative">
                   <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center animate-bounce">
                     <Wand2 className="w-10 h-10 text-amber-500" />
                   </div>
                   <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                     AI
                   </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-800 italic">"Sketching the characters..."</h3>
                  <p className="text-slate-500 max-w-sm">Our AI is generating script, recording voiceover, and animating the scenes for <b>{subject}</b>.</p>
                </div>
                <div className="w-64 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 4, ease: "linear" }}
                    className="h-full bg-amber-500"
                  />
                </div>
              </motion.div>
            )}

            {videoUrl && !isGenerating && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white group">
                  <img 
                    src={videoUrl} 
                    alt="Generated Cartoon" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <button 
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
                    >
                      {isPlaying ? <Pause className="w-10 h-10 text-amber-500 fill-amber-500" /> : <Play className="w-10 h-10 text-amber-500 fill-amber-500 translate-x-1" />}
                    </button>
                  </div>
                  
                  {/* Video Controls Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent flex items-center gap-4 text-white">
                    <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden flex-1">
                      <div className="h-full bg-amber-500 w-1/3" />
                    </div>
                    <Volume2 className="w-5 h-5" />
                    <span className="text-sm font-mono">00:42 / 02:15</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button className="flex-1 py-3 bg-slate-900 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors shadow-lg">
                    <Download className="w-4 h-4" />
                    Save Video
                  </button>
                  <button className="flex-1 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors">
                    <Share2 className="w-4 h-4" />
                    Share Class
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
           <h4 className="font-bold text-blue-900 mb-2">Engaging Script</h4>
           <p className="text-sm text-blue-700">We don't just state facts; we tell a story with characters and humor.</p>
        </div>
        <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100">
           <h4 className="font-bold text-purple-900 mb-2">Visual Logic</h4>
           <p className="text-sm text-purple-700">Complex math equations are transformed into physical puzzles in the animation.</p>
        </div>
        <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
           <h4 className="font-bold text-emerald-900 mb-2">AI Voiceover</h4>
           <p className="text-sm text-emerald-700">Choose from dozens of friendly, professional, or funny cartoon voices.</p>
        </div>
      </div>
    </div>
  );
};