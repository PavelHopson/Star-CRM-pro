/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  MessageSquareText, LayoutDashboard, LineChart, Settings, 
  Search, ChevronDown, Check, Cpu, Sparkles, Sun, Moon, RefreshCw, Calculator, Store, AlertTriangle
} from 'lucide-react';

import DashboardView from './views/DashboardView';
import ReviewsView from './views/ReviewsView';
import AutoReplyRulesView from './views/AutoReplyRulesView';
import AnalyticsView from './views/AnalyticsView';
import SettingsView from './views/SettingsView';
import UnitEconomicsView from './views/UnitEconomicsView';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { translations } from './constants/translations';

type Tab = 'dashboard' | 'reviews' | 'rules' | 'analytics' | 'unitEconomics' | 'settings';
type ApiStatus = 'ok' | 'error' | 'syncing';

function AppContent() {
  const [activeTab, setActiveTab] = useState<Tab>('reviews');
  const [toast, setToast] = useState<{msg: string, type: 'success' | 'error'} | null>(null);
  const [marketplace, setMarketplace] = useState<'WB' | 'OZON'>('WB');
  const [apiStatus, setApiStatus] = useState<ApiStatus>('ok');
  const [lastSyncTime, setLastSyncTime] = useState<number>(5); // minutes ago
  const [logoClicks, setLogoClicks] = useState(0);
  const { theme, toggleTheme, activateSecretTheme } = useTheme();
  const t = translations.ru;

  // Simulate time passing for last sync
  useEffect(() => {
    const interval = setInterval(() => {
      setLastSyncTime(prev => prev + 1);
    }, 60000); // Every minute
    return () => clearInterval(interval);
  }, []);

  const handleLogoClick = () => {
    setLogoClicks(prev => {
      const newCount = prev + 1;
      if (newCount >= 5) {
        activateSecretTheme();
        setToast({ msg: '✨ Секретная тема активирована! ✨', type: 'success' });
        return 0;
      }
      return newCount;
    });
  };

  const handleSync = () => {
    if (apiStatus === 'syncing') return;
    
    setApiStatus('syncing');
    
    // Simulate API call
    setTimeout(() => {
      // Randomly succeed or fail for demonstration
      const success = Math.random() > 0.2; 
      
      if (success) {
        setApiStatus('ok');
        setLastSyncTime(0);
        setToast({ msg: 'Синхронизация успешно завершена', type: 'success' });
      } else {
        setApiStatus('error');
        setToast({ msg: 'Ошибка синхронизации: Токен истек', type: 'error' });
      }
      
      setTimeout(() => setToast(null), 3000);
    }, 2000);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardView />;
      case 'reviews': return <ReviewsView setToast={setToast} />;
      case 'rules': return <AutoReplyRulesView />;
      case 'analytics': return <AnalyticsView />;
      case 'unitEconomics': return <UnitEconomicsView />;
      case 'settings': return <SettingsView />;
      default: return <ReviewsView setToast={setToast} />;
    }
  };

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-[#1A1A1B] dark:text-gray-200 font-sans flex overflow-hidden selection:bg-cyan-500/30 transition-colors duration-200">
      
      {/* --- TOAST NOTIFICATION --- */}
      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top-4 fade-in duration-300">
          <div className={`flex items-center gap-3 bg-light-card dark:bg-dark-surface border px-4 py-3 rounded-md shadow-2xl shadow-black/10 dark:shadow-black ${
            toast.type === 'success' 
              ? 'border-emerald-500/30 text-emerald-600 dark:text-emerald-400' 
              : 'border-rose-500/30 text-rose-600 dark:text-rose-400'
          }`}>
            {toast.type === 'success' ? <Check size={18} /> : <AlertTriangle size={18} />}
            <span className="text-sm font-medium tracking-wide">{toast.msg}</span>
          </div>
        </div>
      )}

      {/* --- SIDEBAR --- */}
      <aside className="w-16 lg:w-64 border-r border-[#E9ECEF] dark:border-white/5 bg-light-bg dark:bg-dark-bg flex flex-col justify-between hidden sm:flex z-20 transition-colors duration-200">
        <div>
          <div 
            className="h-16 flex items-center justify-center lg:justify-start lg:px-6 border-b border-[#E9ECEF] dark:border-white/5 transition-colors duration-200 cursor-pointer select-none"
            onClick={handleLogoClick}
          >
            {/* Full Logo for Desktop */}
            <svg viewBox="0 0 260 80" className="h-8 w-auto hidden lg:block" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g transform="translate(0, 15)">
                <path d="M25 2 L31 16 L47 18 L35 28 L38 43 L25 35 L12 43 L15 28 L3 18 L19 16 Z" stroke="#124266" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="dark:stroke-white" />
                <path d="M10 45 L48 7" stroke="currentColor" strokeWidth="10" strokeLinecap="round" className="text-light-bg dark:text-dark-bg" />
                <path d="M10 45 L48 7 M34 7 L48 7 L48 21" stroke="#2CB4C3" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
              </g>
              <text x="60" y="52" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="34" letterSpacing="-0.5">
                <tspan fill="#124266" className="dark:fill-white">Star</tspan><tspan fill="#2CB4C3">Market</tspan>
              </text>
            </svg>
            
            {/* Icon Only for Mobile */}
            <svg viewBox="0 0 60 60" className="h-8 w-8 lg:hidden" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g transform="translate(5, 5)">
                <path d="M25 2 L31 16 L47 18 L35 28 L38 43 L25 35 L12 43 L15 28 L3 18 L19 16 Z" stroke="#124266" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="dark:stroke-white" />
                <path d="M10 45 L48 7" stroke="currentColor" strokeWidth="10" strokeLinecap="round" className="text-light-bg dark:text-dark-bg" />
                <path d="M10 45 L48 7 M34 7 L48 7 L48 21" stroke="#2CB4C3" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            </svg>
          </div>
          <nav className="mt-6 flex flex-col gap-2 px-2 lg:px-4">
            {[
              { id: 'dashboard', icon: LayoutDashboard, label: t.sidebar.dashboard },
              { id: 'reviews', icon: MessageSquareText, label: t.sidebar.reviews },
              { id: 'rules', icon: Cpu, label: t.sidebar.autoReplies },
              { id: 'analytics', icon: LineChart, label: t.sidebar.analytics },
              { id: 'unitEconomics', icon: Calculator, label: t.sidebar.unitEconomics },
            ].map((item) => (
              <button 
                key={item.id} 
                onClick={() => setActiveTab(item.id as Tab)}
                className={`flex items-center gap-3 w-full p-3 rounded-md transition-all duration-200 hover-micro-gradient ${activeTab === item.id ? 'bg-gray-100 dark:bg-white/5 text-[#1A1A1B] dark:text-white border border-[#E9ECEF] dark:border-white/10 shadow-sm dark:shadow-[0_0_15px_rgba(255,255,255,0.05)]' : 'text-gray-500 dark:text-gray-500 hover:text-[#1A1A1B] dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5'}`}
              >
                <item.icon size={20} strokeWidth={1.5} />
                <span className="hidden lg:block text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
        <div className="p-4">
          <button 
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-3 w-full p-3 transition-colors rounded-md hover-micro-gradient ${activeTab === 'settings' ? 'bg-gray-100 dark:bg-white/5 text-[#1A1A1B] dark:text-white border border-[#E9ECEF] dark:border-white/10 shadow-sm dark:shadow-[0_0_15px_rgba(255,255,255,0.05)]' : 'text-gray-500 dark:text-gray-500 hover:text-[#1A1A1B] dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5'}`}
          >
            <Settings size={20} strokeWidth={1.5} />
            <span className="hidden lg:block text-sm font-medium">{t.sidebar.settings}</span>
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 flex flex-col min-w-0 relative">
        
        {/* HEADER */}
        <header className="h-16 border-b border-[#E9ECEF] dark:border-white/5 bg-light-bg/80 dark:bg-dark-bg/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-10 transition-colors duration-200">
          <div className="flex items-center gap-4">
            
            {/* MARKETPLACE SELECTOR */}
            <div className="relative group">
              <button className="flex items-center gap-2 px-3 py-1.5 bg-light-card dark:bg-dark-surface border border-[#E9ECEF] dark:border-white/10 rounded-md hover:border-gray-300 dark:hover:border-white/20 transition-colors">
                <Store size={14} className="text-gray-500 dark:text-gray-400" />
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold text-white ${marketplace === 'WB' ? 'bg-fuchsia-600' : 'bg-blue-600'}`}>
                  {marketplace}
                </span>
                <span className="text-sm font-medium text-[#1A1A1B] dark:text-gray-300">ИП Иванов (Premium)</span>
                <ChevronDown size={14} className="text-gray-500" />
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 mt-1 w-full bg-light-card dark:bg-dark-surface border border-[#E9ECEF] dark:border-white/10 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <button 
                  onClick={() => setMarketplace('WB')}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-left hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                >
                  <span className="w-4 h-4 rounded-full bg-fuchsia-600 flex items-center justify-center text-[8px] font-bold text-white">WB</span>
                  <span className="text-[#1A1A1B] dark:text-gray-300">Wildberries</span>
                </button>
                <button 
                  onClick={() => setMarketplace('OZON')}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-left hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                >
                  <span className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center text-[8px] font-bold text-white">OZ</span>
                  <span className="text-[#1A1A1B] dark:text-gray-300">Ozon</span>
                </button>
              </div>
            </div>

            {/* SYNC INDICATOR & HEALTH CHECK */}
            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
              {/* Health Check */}
              <div className={`flex items-center gap-2 px-2 py-1 border rounded-md transition-colors ${
                apiStatus === 'ok' ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20' :
                apiStatus === 'error' ? 'bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/20' :
                'bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20'
              }`}>
                <span className="relative flex h-2 w-2">
                  {apiStatus === 'ok' && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>}
                  {apiStatus === 'syncing' && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>}
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${
                    apiStatus === 'ok' ? 'bg-emerald-500' :
                    apiStatus === 'error' ? 'bg-rose-500' :
                    'bg-amber-500'
                  }`}></span>
                </span>
                <span className={`font-medium ${
                  apiStatus === 'ok' ? 'text-emerald-700 dark:text-emerald-400' :
                  apiStatus === 'error' ? 'text-rose-700 dark:text-rose-400' :
                  'text-amber-700 dark:text-amber-400'
                }`}>
                  {apiStatus === 'ok' ? t.header.apiOk : apiStatus === 'error' ? 'API Ошибка' : 'Синхронизация...'}
                </span>
              </div>

              {/* Last Sync */}
              <div className="flex items-center gap-1.5">
                <span>{t.header.lastSync} {lastSyncTime === 0 ? 'только что' : `${lastSyncTime} мин. назад`}</span>
                <button 
                  className="p-1 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors group disabled:opacity-50" 
                  title={t.header.syncNow}
                  onClick={handleSync}
                  disabled={apiStatus === 'syncing'}
                >
                  <RefreshCw size={12} className={`text-gray-400 group-hover:text-[#1A1A1B] dark:group-hover:text-gray-300 transition-colors ${apiStatus === 'syncing' ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* SEARCH */}
            <div className="relative w-64 hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input 
                type="text" 
                placeholder={t.header.searchPlaceholder} 
                className="w-full bg-light-card dark:bg-dark-surface border border-[#E9ECEF] dark:border-white/5 text-sm text-[#1A1A1B] dark:text-gray-200 rounded-md pl-9 pr-3 py-1.5 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
              />
            </div>

            {/* THEME TOGGLE */}
            <button 
              onClick={toggleTheme}
              className="p-2 bg-light-card dark:bg-dark-surface border border-[#E9ECEF] dark:border-white/10 rounded-md text-gray-500 hover:text-[#1A1A1B] dark:hover:text-gray-300 transition-colors"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </header>

        {/* WORKSPACE AREA (Dynamic Content) */}
        {renderContent()}
        
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
