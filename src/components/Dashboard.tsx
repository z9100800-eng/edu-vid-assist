import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  Zap, 
  BookOpen, 
  BrainCircuit, 
  MessageSquare 
} from 'lucide-react';
import { View } from '../App';

interface DashboardProps {
  setView: (view: View) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ setView }) => {
  const cards = [
    {
      id: 'summarize',
      title: 'Summarizer',
      desc: 'Turn long textbooks into concise study notes.',
      icon: BookOpen,
      color: 'bg-blue-500',
      lightColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      id: 'essay',
      title: 'Essay Buddy',
      desc: 'Structure, draft, and polish your academic papers.',
      icon: BrainCircuit,
      color: 'bg-purple-500',
      lightColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      id: 'oral',
      title: 'Oral Coach',
      desc: 'Get a script and practice your presentations.',
      icon: MessageSquare,
      color: 'bg-emerald-500',
      lightColor: 'bg-emerald-50',
      textColor: 'text-emerald-600'
    },
    {
      id: 'cartoon',
      title: 'Cartoonify Subject',
      desc: 'The ultimate tool. Turn any subject into a cartoon video.',
      icon: Zap,
      color: 'bg-amber-500',
      lightColor: 'bg-amber-50',
      textColor: 'text-amber-600',
      highlight: true
    }
  ];

  return (
    <div className="space-y-8">
      <header className="relative h-64 rounded-3xl overflow-hidden shadow-xl bg-indigo-600">
        <img 
          src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/585d6bc5-b49b-43a3-8b66-b40f0e370792/student-dashboard-hero-d698c7e5-1774987728916.webp" 
          alt="Hero" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 to-transparent flex flex-col justify-center p-8 md:p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Welcome back, <span className="text-yellow-400">Scholar!</span>
            </h1>
            <p className="text-indigo-100 text-lg max-w-xl">
              What are we learning today? Let EduGenie handle the hard work while you master the concepts.
            </p>
          </motion.div>
        </div>
      </header>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Sparkles className="text-indigo-600" />
            Your Study Suite
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setView(card.id as View)}
              className="group cursor-pointer bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all"
            >
              <div className={`${card.lightColor} w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <card.icon className={`w-6 h-6 ${card.textColor}`} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">{card.title}</h3>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                {card.desc}
              </p>
              <div className={`flex items-center gap-2 text-sm font-semibold ${card.textColor}`}>
                Get Started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-indigo-50 p-8 rounded-3xl border border-indigo-100 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 space-y-4">
          <div className="inline-flex items-center px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-wider">
            Featured Technology
          </div>
          <h2 className="text-3xl font-bold text-slate-900">The "Cartoonify" Effect</h2>
          <p className="text-slate-600 leading-relaxed">
            Our neural network transforms boring lectures and complex math proofs into engaging, 
            animated cartoon explanations. Learning has never been this cinematic.
          </p>
          <button 
            onClick={() => setView('cartoon')}
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
          >
            Create Your First Video
          </button>
        </div>
        <div className="w-full md:w-1/3 aspect-video bg-white rounded-2xl shadow-inner overflow-hidden border-4 border-white">
          <img 
             src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/585d6bc5-b49b-43a3-8b66-b40f0e370792/math-cartoon-explanation-ee6fe47b-1774987728126.webp"
             className="w-full h-full object-cover"
             alt="Cartoon demo"
          />
        </div>
      </section>
    </div>
  );
};