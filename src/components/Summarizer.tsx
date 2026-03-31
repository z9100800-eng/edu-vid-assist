import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Upload, Copy, Check, Scissors, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export const Summarizer: React.FC = () => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleSummarize = () => {
    if (!text.trim()) {
      toast.error('Please enter some text to summarize.');
      return;
    }
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSummary(`This text discusses the importance of efficient study habits. The core message focuses on breaking down complex information into smaller, manageable chunks to improve retention. Key takeaways include regular review intervals, active recall techniques, and the use of visualization to anchor abstract concepts. Overall, the author suggests that mental fatigue can be minimized by alternating subjects and maintaining a consistent schedule.`);
      setLoading(false);
      toast.success('Summary generated successfully!');
    }, 2000);
  };

  const copyToClipboard = () => {
    if (summary) {
      navigator.clipboard.writeText(summary);
      setIsCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-slate-900 flex items-center justify-center gap-2">
          <FileText className="text-blue-600" />
          Smart Summarizer
        </h1>
        <p className="text-slate-500">Paste your textbook chapters or notes below to get the gist in seconds.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-slate-700 uppercase tracking-wider">Input Text</label>
            <button className="text-xs text-indigo-600 font-medium hover:underline flex items-center gap-1">
              <Upload className="w-3 h-3" />
              Upload PDF
            </button>
          </div>
          <textarea
            className="w-full h-64 p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none text-slate-700 resize-none"
            placeholder="Paste your long text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            onClick={handleSummarize}
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Scissors className="w-5 h-5" />}
            {loading ? 'Processing...' : 'Summarize Now'}
          </button>
        </div>

        <AnimatePresence>
          {summary && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-indigo-50 rounded-2xl border border-indigo-100 p-8 relative"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-indigo-900 flex items-center gap-2">
                  <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse" />
                  Generated Summary
                </h3>
                <button 
                  onClick={copyToClipboard}
                  className="p-2 bg-white rounded-lg border border-indigo-100 hover:bg-indigo-50 transition-colors"
                >
                  {isCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-indigo-600" />}
                </button>
              </div>
              <div className="text-indigo-900/80 leading-relaxed text-lg">
                {summary}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};