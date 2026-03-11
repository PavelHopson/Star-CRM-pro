import React from 'react';
import { DollarSign, Zap, BarChart3, Lock } from 'lucide-react';

export default function AnalyticsView() {
  return (
    <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-light-text-primary dark:text-white tracking-tight">Аналитика Финансов и ИИ</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* AI Token Usage Card */}
        <div className="bg-light-surface dark:bg-dark-surface border border-light-border dark:border-white/5 rounded-md shadow-sm dark:shadow-lg p-6 hover-micro-gradient transition-colors duration-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-500/10 rounded-md border border-emerald-200 dark:border-emerald-500/20">
              <DollarSign size={20} className="text-emerald-600 dark:text-emerald-400" />
            </div>
            <h2 className="text-base font-semibold text-light-text-primary dark:text-gray-200">Использование токенов ИИ</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-light-text-secondary dark:text-gray-400">DeepSeek (Основной)</span>
                <span className="text-light-text-primary dark:text-white font-medium">$0.15</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-dark-bg rounded-full h-2 border border-transparent dark:border-white/5">
                <div className="bg-cyan-500 dark:bg-cyan-400 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
              <p className="text-xs text-light-text-muted dark:text-gray-500 mt-2">Обработано 450K токенов</p>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-light-text-secondary dark:text-gray-400">OpenAI (Резервный)</span>
                <span className="text-light-text-primary dark:text-white font-medium">$1.20</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-dark-bg rounded-full h-2 border border-transparent dark:border-white/5">
                <div className="bg-fuchsia-500 dark:bg-fuchsia-400 h-2 rounded-full" style={{ width: '15%' }}></div>
              </div>
              <p className="text-xs text-light-text-muted dark:text-gray-500 mt-2">Обработано 50K токенов</p>
            </div>
            
            <div className="pt-4 border-t border-light-border dark:border-white/5 flex justify-between items-center">
              <span className="text-sm text-light-text-secondary dark:text-gray-400">Общая стоимость</span>
              <span className="text-xl font-bold text-light-text-primary dark:text-white">$1.35</span>
            </div>
          </div>
        </div>

        {/* Response Latency Card */}
        <div className="bg-light-surface dark:bg-dark-surface border border-light-border dark:border-white/5 rounded-md shadow-sm dark:shadow-lg p-6 hover-micro-gradient transition-colors duration-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-cyan-100 dark:bg-cyan-500/10 rounded-md border border-cyan-200 dark:border-cyan-500/20">
              <Zap size={20} className="text-cyan-600 dark:text-cyan-400" />
            </div>
            <h2 className="text-base font-semibold text-light-text-primary dark:text-gray-200">Задержка ответов</h2>
          </div>
          
          <div className="flex items-center justify-center h-32">
            <div className="text-center">
              <span className="text-5xl font-bold text-light-text-primary dark:text-white tracking-tighter">1.2<span className="text-2xl text-light-text-secondary dark:text-gray-500 font-medium ml-1">с</span></span>
              <p className="text-sm text-light-text-secondary dark:text-gray-400 mt-2">Среднее время генерации</p>
            </div>
          </div>
        </div>
      </div>

      {/* Marketplace Metrics Placeholder */}
      <div className="bg-light-surface/50 dark:bg-dark-surface/50 border border-light-border dark:border-white/5 rounded-md shadow-sm dark:shadow-lg p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/40 dark:bg-black/40 backdrop-blur-[2px] z-10 flex items-center justify-center">
          <div className="flex items-center gap-2 bg-white dark:bg-dark-surface border border-light-border dark:border-white/10 px-4 py-2 rounded-full shadow-lg dark:shadow-2xl">
            <Lock size={14} className="text-light-text-secondary dark:text-gray-400" />
            <span className="text-sm font-medium text-light-text-secondary dark:text-gray-300 tracking-wide uppercase">Бета / Скоро</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3 mb-6 opacity-50">
          <div className="p-2 bg-gray-100 dark:bg-gray-500/10 rounded-md border border-gray-200 dark:border-gray-500/20">
            <BarChart3 size={20} className="text-gray-500 dark:text-gray-400" />
          </div>
          <h2 className="text-base font-semibold text-light-text-primary dark:text-gray-200">Метрики маркетплейса (ROI и Себестоимость)</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 opacity-50">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-24 bg-gray-100 dark:bg-dark-bg border border-light-border dark:border-white/5 rounded-md"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
