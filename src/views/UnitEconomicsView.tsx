import React, { useState } from 'react';
import { Search, Filter, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { translations } from '../constants/translations';
import { useUnitEconomics, ProductEconomics } from '../hooks/useUnitEconomics';

const MOCK_DATA: ProductEconomics[] = [
  {
    id: 'p1',
    sku: 'WB-1001',
    name: 'Платье женское вечернее черное',
    imageUrl: 'https://picsum.photos/seed/dress/40/40',
    price: 3500,
    cogs: 1200,
    logistics: 350,
    commissionPercent: 15,
    taxPercent: 6,
  },
  {
    id: 'p2',
    sku: 'WB-1002',
    name: 'Свитер вязаный оверсайз',
    imageUrl: 'https://picsum.photos/seed/sweater/40/40',
    price: 2800,
    cogs: 1500,
    logistics: 400,
    commissionPercent: 15,
    taxPercent: 6,
  },
  {
    id: 'p3',
    sku: 'WB-1003',
    name: 'Чехол для iPhone 15 Pro Max',
    imageUrl: 'https://picsum.photos/seed/case/40/40',
    price: 800,
    cogs: 150,
    logistics: 120,
    commissionPercent: 12,
    taxPercent: 6,
  }
];

export default function UnitEconomicsView() {
  const { products, updateProduct, calculateMetrics } = useUnitEconomics(MOCK_DATA);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const t = translations.ru.unitEconomics;

  const toggleRow = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  return (
    <div className="p-6 overflow-y-auto flex-1 bg-light-bg dark:bg-dark-bg transition-colors duration-200">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-[#1A1A1B] dark:text-white tracking-tight">{t.title}</h1>
      </div>

      {/* FILTER BAR */}
      <div className="flex gap-3 mb-6">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
          <input 
            type="text" 
            placeholder={t.filters.searchPlaceholder} 
            className="w-full bg-light-card dark:bg-dark-surface border border-[#E9ECEF] dark:border-white/5 text-sm text-[#1A1A1B] dark:text-gray-200 rounded-md pl-9 pr-3 py-1.5 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
          />
        </div>
        <button className="flex items-center gap-2 px-3 py-1.5 bg-light-card dark:bg-dark-surface border border-[#E9ECEF] dark:border-white/5 rounded-md text-sm hover:border-gray-300 dark:hover:border-white/20 transition-colors text-[#1A1A1B] dark:text-gray-300">
          <Filter size={14} className="text-gray-500 dark:text-gray-400" />
          <span>{t.filters.categoryAll}</span>
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-light-card dark:bg-dark-surface border border-[#E9ECEF] dark:border-white/5 rounded-md shadow-sm dark:shadow-2xl overflow-hidden transition-colors duration-200">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E9ECEF] dark:border-white/5 text-xs uppercase tracking-wider text-gray-500 bg-gray-50 dark:bg-dark-bg/50 transition-colors duration-200">
              <th className="p-4 font-medium w-8"></th>
              <th className="p-4 font-medium">{t.table.product}</th>
              <th className="p-4 font-medium">{t.table.price}</th>
              <th className="p-4 font-medium">{t.table.cogs}</th>
              <th className="p-4 font-medium">{t.table.logistics}</th>
              <th className="p-4 font-medium">{t.table.commission}</th>
              <th className="p-4 font-medium">{t.table.tax}</th>
              <th className="p-4 font-medium">{t.table.netProfit}</th>
              <th className="p-4 font-medium">{t.table.roi}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E9ECEF] dark:divide-white/5">
            {products.map((product) => {
              const metrics = calculateMetrics(product);
              const isLowRoi = metrics.roi < 10;
              const isHighRoi = metrics.roi > 30;
              const isExpanded = expandedRows.has(product.id);
              
              const abcColors = {
                'A': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30',
                'B': 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 border-blue-200 dark:border-blue-500/30',
                'C': 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400 border-rose-200 dark:border-rose-500/30',
              };

              return (
                <React.Fragment key={product.id}>
                  <tr 
                    className={`group hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-all duration-200 cursor-pointer ${isLowRoi ? 'dark:shadow-[inset_0_0_15px_rgba(239,68,68,0.1)] bg-red-50/30 dark:bg-transparent' : ''}`}
                    onClick={() => toggleRow(product.id)}
                  >
                    <td className="p-4 align-middle text-gray-400 dark:text-gray-500">
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </td>
                    <td className="p-4 align-middle">
                      <div className="flex items-center gap-3">
                        <img src={product.imageUrl} alt={product.name} className="w-10 h-10 rounded-md object-cover border border-[#E9ECEF] dark:border-white/10" referrerPolicy="no-referrer" />
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${abcColors[metrics.abcTag as keyof typeof abcColors]}`}>
                              {metrics.abcTag}
                            </span>
                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{product.sku}</p>
                          </div>
                          <p className="text-sm font-medium text-[#1A1A1B] dark:text-gray-200 line-clamp-1">{product.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 align-middle" onClick={(e) => e.stopPropagation()}>
                      <div className="relative w-24">
                        <input 
                          type="number"
                          value={product.price}
                          onChange={(e) => updateProduct(product.id, 'price', Number(e.target.value))}
                          className="w-full bg-white dark:bg-dark-bg border border-[#E9ECEF] dark:border-white/10 text-sm text-[#1A1A1B] dark:text-gray-200 rounded-md px-2 py-1 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all font-mono"
                        />
                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-400 pointer-events-none">₽</span>
                      </div>
                    </td>
                    <td className="p-4 align-middle" onClick={(e) => e.stopPropagation()}>
                      <div className="relative w-24">
                        <input 
                          type="number"
                          value={product.cogs}
                          onChange={(e) => updateProduct(product.id, 'cogs', Number(e.target.value))}
                          className="w-full bg-white dark:bg-dark-bg border border-[#E9ECEF] dark:border-white/10 text-sm text-[#1A1A1B] dark:text-gray-200 rounded-md px-2 py-1 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all font-mono"
                        />
                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-400 pointer-events-none">₽</span>
                      </div>
                    </td>
                    <td className="p-4 align-middle text-sm text-gray-600 dark:text-gray-400 font-mono">
                      {product.logistics.toLocaleString('ru-RU')} ₽
                    </td>
                    <td className="p-4 align-middle text-sm text-gray-600 dark:text-gray-400 font-mono">
                      {metrics.commission.toLocaleString('ru-RU')} ₽ <span className="text-xs text-gray-400 dark:text-gray-500">({product.commissionPercent}%)</span>
                    </td>
                    <td className="p-4 align-middle text-sm text-gray-600 dark:text-gray-400 font-mono">
                      {metrics.tax.toLocaleString('ru-RU')} ₽ <span className="text-xs text-gray-400 dark:text-gray-500">({product.taxPercent}%)</span>
                    </td>
                    <td className="p-4 align-middle">
                      <span className={`text-sm font-semibold font-mono ${metrics.netProfit > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                        {metrics.netProfit > 0 ? '+' : ''}{metrics.netProfit.toLocaleString('ru-RU')} ₽
                      </span>
                    </td>
                    <td className="p-4 align-middle">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-bold font-mono ${
                          isHighRoi ? 'text-emerald-500 dark:text-[#00FF00] dark:drop-shadow-[0_0_8px_rgba(0,255,0,0.6)]' :
                          isLowRoi ? 'text-rose-600 dark:text-[#FF4D4D] dark:drop-shadow-[0_0_8px_rgba(255,77,77,0.6)]' : 
                          'text-gray-700 dark:text-gray-300'
                        }`}>
                          {metrics.roi.toFixed(1)}%
                        </span>
                        {isLowRoi && <AlertCircle size={14} className="text-rose-500 dark:text-rose-400" />}
                      </div>
                    </td>
                  </tr>
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.tr
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <td colSpan={9} className="p-0 border-b border-[#E9ECEF] dark:border-white/5">
                          <div className="p-6 bg-gray-50/50 dark:bg-dark-bg/30 border-t border-[#E9ECEF] dark:border-white/5">
                            <div className="grid grid-cols-4 gap-6">
                              <div className="bg-white dark:bg-dark-surface p-4 rounded-md border border-[#E9ECEF] dark:border-white/5 shadow-sm hover-micro-gradient transition-colors duration-200">
                                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Маржинальность</p>
                                <p className="text-lg font-semibold text-[#1A1A1B] dark:text-white font-mono">
                                  {((metrics.netProfit / product.price) * 100).toFixed(1)}%
                                </p>
                              </div>
                              <div className="bg-white dark:bg-dark-surface p-4 rounded-md border border-[#E9ECEF] dark:border-white/5 shadow-sm hover-micro-gradient transition-colors duration-200">
                                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Доля расходов</p>
                                <p className="text-lg font-semibold text-[#1A1A1B] dark:text-white font-mono">
                                  {(((product.cogs + product.logistics + metrics.commission + metrics.tax) / product.price) * 100).toFixed(1)}%
                                </p>
                              </div>
                              <div className="bg-white dark:bg-dark-surface p-4 rounded-md border border-[#E9ECEF] dark:border-white/5 shadow-sm hover-micro-gradient transition-colors duration-200">
                                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Точка безубыточности</p>
                                <p className="text-lg font-semibold text-[#1A1A1B] dark:text-white font-mono">
                                  {(product.cogs + product.logistics + metrics.commission + metrics.tax).toLocaleString('ru-RU')} ₽
                                </p>
                              </div>
                              <div className="bg-white dark:bg-dark-surface p-4 rounded-md border border-[#E9ECEF] dark:border-white/5 shadow-sm hover-micro-gradient transition-colors duration-200">
                                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Оборачиваемость</p>
                                <p className="text-lg font-semibold text-[#1A1A1B] dark:text-white font-mono">
                                  14 дней
                                </p>
                              </div>
                            </div>
                          </div>
                        </td>
                      </motion.tr>
                    )}
                  </AnimatePresence>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
