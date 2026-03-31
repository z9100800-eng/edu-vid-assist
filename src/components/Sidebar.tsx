import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  PenTool, 
  Mic2, 
  Video, 
  Settings, 
  LogOut, 
  GraduationCap 
} from 'lucide-react';
import { View } from '../App';
import { cn } from '../lib/utils';

interface SidebarProps {
  activeView: View;
  setView: (view: View) => void;
  isMobile?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeView, setView, isMobile }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'summarize', label: 'Summarizer', icon: FileText },
    { id: 'essay', label: 'Essay Helper', icon: PenTool },
    { id: 'oral', label: 'Oral Coach', icon: Mic2 },
    { id: 'cartoon', label: 'Cartoonify', icon: Video },
  ];

  if (isMobile) {
    return (
      <div className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id as View)}
            className={cn(
              "w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-200",
              activeView === item.id 
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" 
                : "text-slate-600 hover:bg-slate-100"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-bold">{item.label}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 h-screen sticky top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-indigo-600 p-2 rounded-lg">
          <GraduationCap className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight text-indigo-900">EduGenie</span>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id as View)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
              activeView === item.id 
                ? "bg-indigo-50 text-indigo-600 font-semibold" 
                : "text-slate-500 hover:bg-slate-50 hover:text-indigo-600"
            )}
          >
            <item.icon className={cn(
              "w-5 h-5",
              activeView === item.id ? "text-indigo-600" : "text-slate-400 group-hover:text-indigo-600"
            )} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-slate-50 transition-colors">
          <Settings className="w-5 h-5" />
          Settings
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors mt-1">
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </div>
  );
};