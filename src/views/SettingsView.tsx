import React, { useState } from 'react';
import { Key, Link, Cpu, Save } from 'lucide-react';

export default function SettingsView() {
  const [activeTab, setActiveTab] = useState<'general' | 'integrations' | 'ai'>('integrations');

  return (
    <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-light-text-primary dark:text-white tracking-tight">Настройки системы</h1>
      </div>

      {/* Settings Tabs */}
      <div className="flex gap-1 border-b border-light-border dark:border-white/5 pb-px">
        {[
          { id: 'general', label: 'Общие' },
          { id: 'integrations', label: 'Интеграции' },
          { id: 'ai', label: 'Провайдеры ИИ' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.id ? 'border-cyan-500 dark:border-cyan-400 text-cyan-600 dark:text-cyan-400' : 'border-transparent text-light-text-secondary dark:text-gray-500 hover:text-light-text-primary dark:hover:text-gray-300'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="max-w-3xl">
        {activeTab === 'integrations' && (
          <div className="bg-light-surface dark:bg-dark-surface border border-light-border dark:border-white/5 rounded-md shadow-sm dark:shadow-lg p-6 flex flex-col gap-6 hover-micro-gradient transition-colors duration-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-fuchsia-100 dark:bg-fuchsia-500/10 rounded-md border border-fuchsia-200 dark:border-fuchsia-500/20">
                <Link size={20} className="text-fuchsia-600 dark:text-fuchsia-400" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-light-text-primary dark:text-gray-200">Интеграция API Wildberries</h2>
                <p className="text-xs text-light-text-secondary dark:text-gray-500 mt-1">Подключите аккаунт продавца для автоматической синхронизации отзывов.</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase tracking-widest text-light-text-secondary dark:text-gray-500">WB API Token (Стандартный)</label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={16} />
                <input 
                  type="password" 
                  defaultValue="••••••••••••••••••••••••••••••••"
                  className="w-full bg-white dark:bg-dark-bg border border-light-border dark:border-white/10 text-sm text-light-text-primary dark:text-gray-200 rounded-md pl-10 pr-3 py-2.5 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all font-mono"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-100 dark:border-emerald-500/10 rounded-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">Подключено и синхронизируется</span>
            </div>
          </div>
        )}

        {activeTab === 'ai' && (
          <div className="bg-light-surface dark:bg-dark-surface border border-light-border dark:border-white/5 rounded-md shadow-sm dark:shadow-lg p-6 flex flex-col gap-6 hover-micro-gradient transition-colors duration-200">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-cyan-100 dark:bg-cyan-500/10 rounded-md border border-cyan-200 dark:border-cyan-500/20">
                <Cpu size={20} className="text-cyan-600 dark:text-cyan-400" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-light-text-primary dark:text-gray-200">Конфигурация провайдеров ИИ</h2>
                <p className="text-xs text-light-text-secondary dark:text-gray-500 mt-1">Управление моделями и параметрами генерации.</p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-bg border border-light-border dark:border-white/5 rounded-md">
                <div>
                  <h3 className="text-sm font-medium text-light-text-primary dark:text-gray-200">DeepSeek (Основной)</h3>
                  <p className="text-xs text-light-text-secondary dark:text-gray-500 mt-1">Экономичная модель для стандартных ответов.</p>
                </div>
                <div className="w-10 h-5 bg-cyan-500 rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-bg border border-light-border dark:border-white/5 rounded-md">
                <div>
                  <h3 className="text-sm font-medium text-light-text-primary dark:text-gray-200">OpenAI (Резервный)</h3>
                  <p className="text-xs text-light-text-secondary dark:text-gray-500 mt-1">Используется, когда основной провайдер недоступен.</p>
                </div>
                <div className="w-10 h-5 bg-cyan-500 rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-4">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold uppercase tracking-widest text-light-text-secondary dark:text-gray-500">Температура</label>
                  <span className="text-xs text-cyan-600 dark:text-cyan-400 font-mono">0.7</span>
                </div>
                <input type="range" min="0" max="100" defaultValue="70" className="w-full accent-cyan-500" />
                <div className="flex justify-between text-[10px] text-light-text-muted dark:text-gray-600 uppercase tracking-wider mt-1">
                  <span>Точно</span>
                  <span>Креативно</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'general' && (
          <div className="bg-light-surface dark:bg-dark-surface border border-light-border dark:border-white/5 rounded-md shadow-sm dark:shadow-lg p-6 flex flex-col gap-6 hover-micro-gradient transition-colors duration-200">
            <div className="flex flex-col gap-4">
              <h2 className="text-base font-semibold text-light-text-primary dark:text-gray-200 border-b border-light-border dark:border-white/5 pb-2">Профиль пользователя</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-widest text-light-text-secondary dark:text-gray-500">Имя</label>
                  <input 
                    type="text" 
                    defaultValue="Иван Иванов"
                    className="w-full bg-white dark:bg-dark-bg border border-light-border dark:border-white/10 text-sm text-light-text-primary dark:text-gray-200 rounded-md px-3 py-2 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-widest text-light-text-secondary dark:text-gray-500">Email</label>
                  <input 
                    type="email" 
                    defaultValue="ivan@example.com"
                    className="w-full bg-white dark:bg-dark-bg border border-light-border dark:border-white/10 text-sm text-light-text-primary dark:text-gray-200 rounded-md px-3 py-2 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-2">
              <h2 className="text-base font-semibold text-light-text-primary dark:text-gray-200 border-b border-light-border dark:border-white/5 pb-2">Уведомления</h2>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-bg border border-light-border dark:border-white/5 rounded-md">
                <div>
                  <h3 className="text-sm font-medium text-light-text-primary dark:text-gray-200">Email уведомления</h3>
                  <p className="text-xs text-light-text-secondary dark:text-gray-500 mt-0.5">Получать отчеты и важные алерты на почту</p>
                </div>
                <div className="w-10 h-5 bg-cyan-500 rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-bg border border-light-border dark:border-white/5 rounded-md">
                <div>
                  <h3 className="text-sm font-medium text-light-text-primary dark:text-gray-200">Telegram Bot</h3>
                  <p className="text-xs text-light-text-secondary dark:text-gray-500 mt-0.5">Моментальные уведомления о негативных отзывах</p>
                </div>
                <button className="text-xs font-medium text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors">
                  Подключить
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-2">
              <h2 className="text-base font-semibold text-light-text-primary dark:text-gray-200 border-b border-light-border dark:border-white/5 pb-2">Локализация</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-widest text-light-text-secondary dark:text-gray-500">Язык интерфейса</label>
                  <select className="w-full bg-white dark:bg-dark-bg border border-light-border dark:border-white/10 text-sm text-light-text-primary dark:text-gray-200 rounded-md px-3 py-2 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all appearance-none">
                    <option value="ru">Русский</option>
                    <option value="en">English</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-widest text-light-text-secondary dark:text-gray-500">Часовой пояс</label>
                  <select className="w-full bg-white dark:bg-dark-bg border border-light-border dark:border-white/10 text-sm text-light-text-primary dark:text-gray-200 rounded-md px-3 py-2 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all appearance-none">
                    <option value="Europe/Moscow">Москва (GMT+3)</option>
                    <option value="Asia/Yekaterinburg">Екатеринбург (GMT+5)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button className="flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-6 py-2.5 rounded-md text-sm font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-sm dark:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            <Save size={16} />
            Сохранить настройки
          </button>
        </div>
      </div>
    </div>
  );
}
