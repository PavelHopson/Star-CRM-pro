import React from 'react';
import { TrendingUp, CheckCircle2, Clock, Activity, DollarSign } from 'lucide-react';
import { translations } from '../constants/translations';

export default function DashboardView() {
  const t = translations.ru.dashboard;

  return (
    <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-6 bg-light-bg dark:bg-dark-bg transition-colors duration-200">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-light-text-primary dark:text-dark-text-primary tracking-tight">Дашборд</h1>
      </div>

      {/* Metrics Ribbon */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border p-4 rounded-md shadow-sm dark:shadow-lg hover-micro-gradient transition-colors duration-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-widest">Обработано (24ч)</span>
            <TrendingUp size={16} className="text-emerald-500 dark:text-emerald-400" />
          </div>
          <div className="flex items-end gap-3">
            <span className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary">1,248</span>
            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 mb-1">+12%</span>
          </div>
        </div>
        <div className="bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border p-4 rounded-md shadow-sm dark:shadow-lg hover-micro-gradient transition-colors duration-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-widest">Авто-ответы ИИ</span>
            <CheckCircle2 size={16} className="text-cyan-600 dark:text-cyan-400" />
          </div>
          <div className="flex items-end gap-3">
            <span className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary">85%</span>
          </div>
        </div>
        <div className="bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border p-4 rounded-md shadow-sm dark:shadow-lg hover-micro-gradient transition-colors duration-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-widest">Ожидают проверки</span>
            <Clock size={16} className="text-yellow-600 dark:text-yellow-500" />
          </div>
          <div className="flex items-end gap-3">
            <span className="text-3xl font-bold text-light-text-primary dark:text-dark-text-primary">42</span>
          </div>
        </div>
        <div className="bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border p-4 rounded-md shadow-sm dark:shadow-lg hover-micro-gradient transition-colors duration-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-widest">Статус API</span>
            <Activity size={16} className="text-emerald-600 dark:text-emerald-500" />
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">В норме</span>
          </div>
        </div>
      </div>

      {/* SAVINGS COUNTER & CHART */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Savings Widget */}
        <div className="bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-xl p-6 shadow-sm dark:shadow-lg flex flex-col justify-center items-center text-center hover-micro-gradient transition-colors duration-200">
          <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-500/10 rounded-full flex items-center justify-center mb-4">
            <DollarSign size={24} className="text-emerald-600 dark:text-emerald-400" />
          </div>
          <h3 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary mb-1">{t.savings}</h3>
          <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-6">За выбранный период</p>
          
          <div className="w-full grid grid-cols-2 gap-4">
            <div className="bg-light-bg dark:bg-dark-bg p-4 rounded-lg border border-light-border dark:border-dark-border">
              <p className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-1">39.6</p>
              <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wider">{t.savingsTime}</p>
            </div>
            <div className="bg-light-bg dark:bg-dark-bg p-4 rounded-lg border border-light-border dark:border-dark-border">
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">14,850</p>
              <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wider">{t.savingsMoney}</p>
            </div>
          </div>
        </div>

        {/* Chart Mock */}
        <div className="lg:col-span-2 bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-xl p-6 shadow-sm dark:shadow-lg min-h-[300px] flex flex-col transition-colors duration-200 hover-micro-gradient">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-semibold text-light-text-primary dark:text-dark-text-primary uppercase tracking-wider">Динамика отзывов</h3>
            <button className="text-xs text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 font-medium transition-colors">Подробнее</button>
          </div>
          <div className="flex-1 border border-dashed border-light-border dark:border-dark-border rounded-lg flex items-center justify-center bg-light-bg dark:bg-dark-bg overflow-hidden relative">
            {/* Shimmer loading state for chart */}
            <div className="w-full h-full p-4 flex flex-col gap-4">
              <div className="h-4 w-1/4 bg-gray-200 dark:bg-white/5 rounded animate-shimmer"></div>
              <div className="flex-1 flex items-end gap-2">
                {[40, 70, 45, 90, 65, 85, 100].map((h, i) => (
                  <div key={i} className="flex-1 bg-gray-200 dark:bg-white/5 rounded-t animate-shimmer" style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }}></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RECENT ACTIVITY */}
      <div className="bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-xl p-6 shadow-sm dark:shadow-lg transition-colors duration-200 hover-micro-gradient">
        <h3 className="text-sm font-semibold text-light-text-primary dark:text-dark-text-primary uppercase tracking-wider mb-6">Недавняя активность ИИ</h3>
        <div className="space-y-4">
          {[
            { action: 'Сгенерирован ответ', item: 'Платье женское вечернее', time: '2 мин. назад', status: 'success' },
            { action: 'Опубликован ответ', item: 'Чехол для iPhone 15', time: '15 мин. назад', status: 'success' },
            { action: 'Требует внимания', item: 'Свитер вязаный (Оценка: 2)', time: '1 час назад', status: 'warning' },
            { action: 'Сгенерирован ответ', item: 'Джинсы клеш', time: '2 часа назад', status: 'success' },
          ].map((log, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-light-border dark:border-dark-border last:border-0 hover:bg-light-bg dark:hover:bg-white/[0.02] -mx-6 px-6 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-2 h-2 rounded-full ${log.status === 'success' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse' : 'bg-yellow-500 shadow-[0_0_8px_rgba(245,158,11,0.5)] animate-pulse'}`} />
                <div>
                  <p className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">{log.action}</p>
                  <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">{log.item}</p>
                </div>
              </div>
              <span className="text-xs text-light-text-muted dark:text-dark-text-muted font-mono">{log.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
