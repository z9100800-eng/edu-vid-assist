import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Summarizer } from './components/Summarizer';
import { EssayHelper } from './components/EssayHelper';
import { OralCoach } from './components/OralCoach';
import { Cartoonify } from './components/Cartoonify';
import { Toaster } from 'sonner';
import { Menu, X, GraduationCap } from 'lucide-react';
import { cn } from './lib/utils';

export type View = 'dashboard' | 'summarize' | 'essay' | 'oral' | 'cartoon';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard setView={setCurrentView} />;
      case 'summarize':
        return <Summarizer />;
      case 'essay':
        return <EssayHelper />;
      case 'oral':
        return <OralCoach />;
      case 'cartoon':
        return <Cartoonify />;
      default:
        return <Dashboard setView={setCurrentView} />;
    }
  };

  const handleSetView = (view: View) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Toaster position="top-center" />
      
      {/* Desktop Sidebar */}
      <Sidebar activeView={currentView} setView={handleSetView} />

      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between p-4 bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-1.5 rounded-lg">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold text-indigo-900 tracking-tight">EduGenie</span>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-white pt-20 px-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
           <Sidebar activeView={currentView} setView={handleSetView} isMobile />
        </div>
      )}

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

export default App;