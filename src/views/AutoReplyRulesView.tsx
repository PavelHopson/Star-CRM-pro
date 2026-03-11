import React, { useState } from 'react';
import { Plus, Settings2, Play, Pause, Cpu, X, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AutoReplyRule } from '../types';

const MOCK_RULES: AutoReplyRule[] = [
  {
    id: 'rule_1',
    name: 'Стандартный 5 Звезд',
    mode: 'AUTO',
    promptTemplate: 'Поблагодари за отзыв. Упомяни качество товара. В конце добавь подпись "С уважением, команда StarMarket".',
    triggerConditions: ['Оценка: 5'],
    provider: 'DeepSeek',
    status: 'ACTIVE'
  },
  {
    id: 'rule_2',
    name: 'Агрессивный Негатив',
    mode: 'SUGGEST',
    promptTemplate: 'Извинись за доставленные неудобства. Предложи связаться с поддержкой. В конце добавь подпись "С уважением, команда StarMarket".',
    triggerConditions: ['Оценка: 1-2', 'Содержит: "брак"'],
    provider: 'OpenAI',
    status: 'ACTIVE'
  },
  {
    id: 'rule_3',
    name: 'Нейтральный 3 Звезды',
    mode: 'SUGGEST',
    promptTemplate: 'Спроси, что можно улучшить. В конце добавь подпись "С уважением, команда StarMarket".',
    triggerConditions: ['Оценка: 3'],
    provider: 'DeepSeek',
    status: 'PAUSED'
  }
];

export default function AutoReplyRulesView() {
  const [selectedRule, setSelectedRule] = useState<AutoReplyRule | null>(null);

  return (
    <div className="p-6 overflow-y-auto flex-1 flex flex-col relative">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-light-text-primary dark:text-dark-text-primary tracking-tight">Правила AI Авто-ответов</h1>
        <button className="flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-md text-sm font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-sm dark:shadow-[0_0_15px_rgba(255,255,255,0.1)]">
          <Plus size={16} />
          Создать правило
        </button>
      </div>

      {/* Rules Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {MOCK_RULES.map(rule => (
          <div 
            key={rule.id} 
            onClick={() => setSelectedRule(rule)}
            className={`rounded-md cursor-pointer ${rule.status === 'ACTIVE' ? 'border-beam-container' : ''}`}
          >
            <div className={`border-beam-inner bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-md p-5 shadow-sm dark:shadow-lg hover:bg-gray-50 dark:hover:bg-white/[0.02] hover:border-gray-300 dark:hover:border-white/10 transition-all flex flex-col gap-4 h-full hover-micro-gradient`}>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-semibold text-light-text-primary dark:text-gray-200 mb-1">{rule.name}</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {rule.triggerConditions?.map((cond, i) => (
                      <span key={i} className="px-2 py-1 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded text-xs text-light-text-secondary dark:text-gray-400">
                        {cond}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {rule.status === 'ACTIVE' ? (
                    <span className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 rounded text-xs font-medium">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      Активно
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 dark:bg-gray-500/10 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-500/20 rounded text-xs font-medium">
                      <Pause size={10} />
                      Пауза
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-light-border dark:border-white/5 mt-auto">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-light-text-secondary dark:text-gray-500">Режим:</span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded ${rule.mode === 'AUTO' ? 'bg-cyan-100 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/20' : 'bg-fuchsia-100 dark:bg-fuchsia-500/10 text-fuchsia-700 dark:text-fuchsia-400 border border-fuchsia-200 dark:border-fuchsia-500/20'}`}>
                    {rule.mode === 'AUTO' ? 'Авто-публикация' : 'Черновик'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Cpu size={14} className="text-light-text-secondary dark:text-gray-500" />
                  <span className="text-xs text-light-text-secondary dark:text-gray-400">{rule.provider}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- RIGHT ACTION PANEL (DRAWER) --- */}
      <AnimatePresence>
        {selectedRule && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 dark:bg-black/60 backdrop-blur-sm z-30"
              onClick={() => setSelectedRule(null)}
            />
            
            <motion.aside 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full sm:w-[500px] bg-light-surface dark:bg-dark-surface border-l border-light-border dark:border-white/5 shadow-[-20px_0_50px_rgba(0,0,0,0.1)] dark:shadow-[-20px_0_50px_rgba(0,0,0,0.5)] z-40 flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-light-border dark:border-white/5 bg-gray-50 dark:bg-dark-bg/50">
                <div className="flex items-center gap-3">
                  <Settings2 className="text-cyan-600 dark:text-cyan-400" size={20} />
                  <h2 className="text-lg font-semibold text-light-text-primary dark:text-white tracking-tight">Редактировать правило</h2>
                </div>
                <button 
                  onClick={() => setSelectedRule(null)}
                  className="p-2 text-light-text-secondary dark:text-gray-500 hover:text-light-text-primary dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/5 rounded-md transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-widest text-light-text-secondary dark:text-gray-500">Название правила</label>
                  <input 
                    type="text" 
                    defaultValue={selectedRule.name}
                    className="w-full bg-white dark:bg-dark-bg border border-light-border dark:border-white/10 text-sm text-light-text-primary dark:text-gray-200 rounded-md px-3 py-2 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-widest text-light-text-secondary dark:text-gray-500">Режим выполнения</label>
                  <div className="flex bg-gray-100 dark:bg-dark-bg p-1 rounded border border-light-border dark:border-white/5 w-fit">
                    <button className={`px-4 py-1.5 text-xs font-medium rounded transition-colors ${selectedRule.mode === 'AUTO' ? 'bg-white dark:bg-white text-black shadow-sm' : 'text-light-text-secondary dark:text-gray-500 hover:text-light-text-primary dark:hover:text-gray-300'}`}>Авто-публикация</button>
                    <button className={`px-4 py-1.5 text-xs font-medium rounded transition-colors ${selectedRule.mode === 'SUGGEST' ? 'bg-white dark:bg-white text-black shadow-sm' : 'text-light-text-secondary dark:text-gray-500 hover:text-light-text-primary dark:hover:text-gray-300'}`}>Черновик</button>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-widest text-light-text-secondary dark:text-gray-500">Провайдер ИИ</label>
                  <select defaultValue={selectedRule.provider} className="w-full bg-white dark:bg-dark-bg border border-light-border dark:border-white/10 text-sm text-light-text-primary dark:text-gray-200 rounded-md px-3 py-2 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all appearance-none">
                    <option value="DeepSeek">DeepSeek (Экономичный)</option>
                    <option value="OpenAI">OpenAI (Резервный)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-widest text-cyan-600 dark:text-cyan-400">Шаблон промпта</label>
                  <textarea 
                    rows={8}
                    defaultValue={selectedRule.promptTemplate}
                    className="w-full bg-white dark:bg-dark-bg border border-light-border dark:border-white/10 text-sm text-light-text-primary dark:text-gray-200 rounded-md p-4 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all resize-none shadow-inner font-mono"
                  />
                </div>
              </div>

              <div className="p-6 border-t border-light-border dark:border-white/5 bg-gray-50 dark:bg-dark-bg/50 flex gap-3">
                <button 
                  onClick={() => setSelectedRule(null)}
                  className="flex-1 flex items-center justify-center gap-2 bg-black dark:bg-white text-white dark:text-black px-4 py-2.5 rounded-md text-sm font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-sm dark:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                >
                  <Save size={16} />
                  Сохранить изменения
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
