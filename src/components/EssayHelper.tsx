import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PenTool, Wand2, ListChecks, ArrowRight, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export const EssayHelper: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [type, setType] = useState('argumentative');
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const essayTypes = [
    { id: 'argumentative', label: 'Argumentative' },
    { id: 'expository', label: 'Expository' },
    { id: 'narrative', label: 'Narrative' },
    { id: 'descriptive', label: 'Descriptive' },
  ];

  const handleGenerateOutline = () => {
    if (!topic) {
      toast.error('What is your essay about?');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setStep(1);
      setLoading(false);
      toast.success('Outline generated!');
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-slate-900 flex items-center justify-center gap-2">
          <PenTool className="text-purple-600" />
          Essay Buddy
        </h1>
        <p className="text-slate-500">Stop staring at a blank page. Let's build your draft together.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="flex border-b border-slate-100">
          <div className={`flex-1 p-4 text-center text-sm font-semibold ${step >= 0 ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-400'}`}>
            1. Topic & Type
          </div>
          <div className={`flex-1 p-4 text-center text-sm font-semibold ${step >= 1 ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-400'}`}>
            2. Outline
          </div>
          <div className={`flex-1 p-4 text-center text-sm font-semibold ${step >= 2 ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-400'}`}>
            3. Draft
          </div>
        </div>

        <div className="p-8">
          {step === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">What is your essay topic?</label>
                <input 
                  type="text" 
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. The impact of climate change on coastal biodiversity"
                  className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Essay Type</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {essayTypes.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setType(t.id)}
                      className={`py-3 px-4 rounded-xl border transition-all text-sm font-medium ${
                        type === t.id 
                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' 
                        : 'border-slate-200 text-slate-600 hover:border-indigo-300'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleGenerateOutline}
                disabled={loading}
                className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5 text-purple-400" />}
                Generate Smart Outline
              </button>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div className="p-6 bg-slate-50 rounded-2xl space-y-4">
                <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                  <ListChecks className="text-indigo-600" />
                  Proposed Structure
                </h3>
                <ul className="space-y-3">
                  {[
                    'Introduction: Define coastal biodiversity and the current climate crisis.',
                    'Thesis: Human-induced climate change is the primary driver of species loss in coastal zones.',
                    'Point 1: Rising sea levels and habitat destruction.',
                    'Point 2: Ocean acidification and its effect on reef ecosystems.',
                    'Point 3: Socio-economic impacts of biodiversity loss.',
                    'Conclusion: The urgent need for legislative action and conservation.'
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 text-slate-600 text-sm border-b border-slate-100 pb-2">
                      <span className="font-bold text-indigo-500">{i + 1}.</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => setStep(0)}
                  className="flex-1 py-3 rounded-xl border border-slate-200 font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Edit Input
                </button>
                <button 
                   onClick={() => {
                     setLoading(true);
                     setTimeout(() => {
                       setStep(2);
                       setLoading(false);
                       toast.success('Full draft ready!');
                     }, 2000);
                   }}
                   className="flex-1 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-all shadow-md flex items-center justify-center gap-2"
                >
                   {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
                   Generate Full Draft
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
               <div className="p-8 bg-white border border-slate-100 shadow-inner rounded-2xl font-serif text-slate-800 leading-relaxed max-h-96 overflow-y-auto">
                 <h2 className="text-2xl font-bold mb-4 text-center">{topic}</h2>
                 <p className="mb-4">
                   In the contemporary era, the delicate balance of our planet's ecosystems is facing an unprecedented challenge. 
                   Coastal biodiversity, the rich tapestry of life found at the intersection of land and sea, stands as a critical 
                   frontier in the fight against climate change...
                 </p>
                 <p className="mb-4 text-slate-400 italic">
                   [The draft continues with the generated outline points, providing evidence and structured arguments for each section.]
                 </p>
                 <p>
                   Ultimately, the survival of coastal ecosystems depends on our ability to implement collective global solutions 
                   that prioritize long-term ecological stability over short-term economic gains.
                 </p>
               </div>
               <button 
                  onClick={() => setStep(0)}
                  className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors"
               >
                 Start New Essay
               </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};