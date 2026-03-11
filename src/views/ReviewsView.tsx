import React, { useState, useEffect, useRef } from 'react';
import { Star, Filter, Cpu, RefreshCw, Copy, Send, Sparkles, Clock, X, ShieldCheck, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Review, ReviewStatus, AutoReplyRule } from '../types';

const MOCK_RULE: AutoReplyRule = {
  id: 'rule_1',
  name: 'WB: Нейтральные и Позитивные (от 4 до 5 звезд)',
  mode: 'SUGGEST',
  promptTemplate: 'Поблагодари за отзыв. Упомяни качество товара. В конце добавь подпись "С уважением, команда StarMarket".'
};

const MOCK_REVIEWS: Review[] = [
  {
    id: 'rev_001',
    rating: 5,
    text: 'Отличное качество! Швы ровные, ткань приятная к телу. Буду заказывать еще.',
    productName: 'Платье женское вечернее черное',
    buyerName: 'Елена В.',
    date: '24 Окт 2023, 14:30',
    status: 'GENERATED',
    aiDraft: 'Елена, здравствуйте! Благодарим за высокую оценку. Мы очень рады, что вы оценили качество ткани и пошива нашего платья. Носите с удовольствием и возвращайтесь за новинками!\n\nС уважением, команда StarMarket',
    logs: [{ provider: 'OpenAI (GPT-4o)', latencyMs: 1240, attempts: 1, timestamp: '24 Окт 2023, 14:32' }]
  },
  {
    id: 'rev_002',
    rating: 2,
    text: 'Пришло с браком, упаковка порвана. Очень расстроена.',
    productName: 'Чехол для iPhone 15 Pro Max',
    buyerName: 'Анна',
    date: '24 Окт 2023, 12:15',
    status: 'NEW'
  },
  {
    id: 'rev_003',
    rating: 4,
    text: 'В целом неплохо, но цвет немного отличается от фото.',
    productName: 'Свитер вязаный оверсайз',
    buyerName: 'Мария К.',
    date: '23 Окт 2023, 09:10',
    status: 'APPROVED',
    aiDraft: 'Мария, здравствуйте! Спасибо за ваш отзыв. Цветопередача может незначительно отличаться из-за настроек экрана. Надеемся, свитер будет радовать вас в холода!\n\nС уважением, команда StarMarket'
  }
];

const INCOMING_REVIEWS_POOL: Review[] = [
  {
    id: 'rev_004', rating: 5, text: 'Супер! Очень быстрая доставка и качество на высоте. Рекомендую!', productName: 'Сумка женская кожаная', buyerName: 'Ольга', date: 'Только что', status: 'NEW'
  },
  {
    id: 'rev_005', rating: 1, text: 'Ужас, прислали не тот размер. Верните деньги.', productName: 'Кроссовки беговые', buyerName: 'Иван', date: 'Только что', status: 'NEW'
  },
  {
    id: 'rev_006', rating: 5, text: 'Идеально подошло, спасибо продавцу! Буду брать еще в другом цвете.', productName: 'Джинсы мом', buyerName: 'Екатерина', date: 'Только что', status: 'NEW'
  }
];

const StatusChip = ({ status }: { status: ReviewStatus }) => {
  const styles = {
    NEW: 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-500/20',
    GENERATED: 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-200 dark:border-cyan-500/20',
    APPROVED: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20',
    FAILED: 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-500/20',
  };
  
  const labels = {
    NEW: 'НОВЫЙ',
    GENERATED: 'СГЕНЕРИРОВАН',
    APPROVED: 'ОДОБРЕН',
    FAILED: 'ОШИБКА',
  };

  return (
    <span className={`px-2 py-1 text-xs font-semibold tracking-wider border rounded-sm ${styles[status]}`}>
      {labels[status]}
    </span>
  );
};

export default function ReviewsView({ setToast }: { setToast: (toast: {msg: string, type: 'success' | 'error'} | null) => void }) {
  const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS);
  const [incomingPool, setIncomingPool] = useState<Review[]>(INCOMING_REVIEWS_POOL);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [generatingIds, setGeneratingIds] = useState<Set<string>>(new Set());

  const reviewsRef = useRef(reviews);
  reviewsRef.current = reviews;

  // Simulate incoming reviews dynamically
  useEffect(() => {
    const interval = setInterval(() => {
      setIncomingPool(prevPool => {
        if (prevPool.length === 0) return prevPool; // Stop when pool is empty
        
        const nextReview = prevPool[0];
        const remaining = prevPool.slice(1);

        // Add to top of reviews
        setReviews(prev => [nextReview, ...prev]);
        setToast({ msg: `Новый отзыв от ${nextReview.buyerName}`, type: 'success' });

        // Simulate Auto-Reply rule trigger for 5-star reviews
        if (nextReview.rating === 5) {
          setTimeout(() => {
            handleGenerate(nextReview.id, nextReview);
          }, 1500);
        }

        return remaining;
      });
    }, 8000); // Every 8 seconds a new review arrives

    return () => clearInterval(interval);
  }, []);

  const handleGenerate = (reviewId: string, reviewData?: Review) => {
    setGeneratingIds(prev => new Set(prev).add(reviewId));
    
    const targetReview = reviewData || reviewsRef.current.find(r => r.id === reviewId);
    
    let draftText = '';
    if (targetReview?.rating === 5) {
      draftText = `${targetReview.buyerName}, здравствуйте! Спасибо за ваш прекрасный отзыв! Мы очень рады, что вам понравился товар "${targetReview.productName}". Носите с удовольствием!\n\nС уважением, команда StarMarket`;
    } else if (targetReview?.rating && targetReview.rating <= 3) {
      draftText = `${targetReview.buyerName}, здравствуйте. Приносим искренние извинения за доставленные неудобства с товаром "${targetReview.productName}". Пожалуйста, свяжитесь с нашей службой поддержки через личный кабинет, мы оперативно решим этот вопрос.\n\nС уважением, команда StarMarket`;
    } else {
      draftText = `${targetReview?.buyerName}, здравствуйте! Спасибо за ваш отзыв на "${targetReview?.productName}". Мы обязательно учтем ваши замечания для улучшения качества.\n\nС уважением, команда StarMarket`;
    }

    // Simulate "thinking" delay
    setTimeout(() => {
      let currentText = '';
      const words = draftText.split(' ');
      let wordIndex = 0;

      // Simulate streaming response
      const streamInterval = setInterval(() => {
        if (wordIndex < words.length) {
          currentText += (wordIndex > 0 ? ' ' : '') + words[wordIndex];
          
          const updateReview = (r: Review) => r.id === reviewId ? { ...r, status: 'GENERATED' as ReviewStatus, aiDraft: currentText + '...' } : r;
          
          setReviews(prev => prev.map(updateReview));
          setSelectedReview(prev => prev?.id === reviewId ? updateReview(prev) : prev);
          
          wordIndex++;
        } else {
          clearInterval(streamInterval);
          
          const finalUpdate = (r: Review) => r.id === reviewId ? { 
            ...r, 
            status: 'GENERATED' as ReviewStatus, 
            aiDraft: currentText,
            logs: [{ provider: 'DeepSeek', latencyMs: 1850, attempts: 1, timestamp: 'Только что' }]
          } : r;

          setReviews(prev => prev.map(finalUpdate));
          setSelectedReview(prev => prev?.id === reviewId ? finalUpdate(prev) : prev);
          
          setGeneratingIds(prev => {
            const next = new Set(prev);
            next.delete(reviewId);
            return next;
          });
          setToast({ msg: 'AI завершил генерацию ответа', type: 'success' });
        }
      }, 50); // Fast typing effect
    }, 1500); // 1.5s thinking time
  };

  const handlePublish = () => {
    if (selectedReview) {
      const updated = { ...selectedReview, status: 'APPROVED' as ReviewStatus };
      setReviews(reviews.map(r => r.id === updated.id ? updated : r));
      setSelectedReview(null);
      
      setToast({ msg: 'Ответ успешно опубликован на Wildberries', type: 'success' });
      setTimeout(() => setToast(null), 3000);
    }
  };

  return (
    <div className="p-6 overflow-y-auto flex-1 flex flex-col relative bg-light-bg dark:bg-dark-bg transition-colors duration-200">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-[#1A1A1B] dark:text-white tracking-tight">Отзывы</h1>
      </div>

      {/* FILTER BAR */}
      <div className="flex gap-3 mb-4">
        <button className="flex items-center gap-2 px-3 py-1.5 bg-light-card dark:bg-dark-surface border border-[#E9ECEF] dark:border-white/5 rounded-md text-sm hover:border-gray-300 dark:hover:border-white/20 transition-colors text-[#1A1A1B] dark:text-gray-300">
          <Filter size={14} className="text-gray-500 dark:text-gray-400" />
          <span>Оценка: Все</span>
        </button>
        <button className="flex items-center gap-2 px-3 py-1.5 bg-light-card dark:bg-dark-surface border border-[#E9ECEF] dark:border-white/5 rounded-md text-sm hover:border-gray-300 dark:hover:border-white/20 transition-colors text-[#1A1A1B] dark:text-gray-300">
          <span>Статус: Все</span>
        </button>
      </div>

      {/* RULE BAR WITH BORDER BEAM */}
      <div className="mb-6 border-beam-container rounded-md">
        <div className="border-beam-inner bg-light-card dark:bg-dark-surface border border-[#E9ECEF] dark:border-white/5 rounded-md p-4 flex items-center justify-between shadow-sm dark:shadow-lg transition-colors duration-200 hover-micro-gradient">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-cyan-50 dark:bg-cyan-500/10 rounded-md border border-cyan-200 dark:border-cyan-500/20">
              <Cpu size={18} className="text-cyan-600 dark:text-cyan-400" />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Активное правило</p>
              <p className="text-sm font-medium text-[#1A1A1B] dark:text-gray-200">{MOCK_RULE.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500">Режим:</span>
              <div className="flex bg-gray-100 dark:bg-dark-bg p-1 rounded border border-[#E9ECEF] dark:border-white/5">
                <button className="px-3 py-1 text-xs font-medium rounded bg-white dark:bg-white text-[#1A1A1B] dark:text-black shadow-sm">Suggest</button>
                <button className="px-3 py-1 text-xs font-medium rounded text-gray-500 hover:text-[#1A1A1B] dark:hover:text-gray-300">Auto</button>
              </div>
            </div>
            <button className="text-sm text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors font-medium">
              Настроить
            </button>
          </div>
        </div>
      </div>

      {/* REVIEWS TABLE */}
      <div className="bg-light-card dark:bg-dark-surface border border-[#E9ECEF] dark:border-white/5 rounded-md shadow-sm dark:shadow-2xl overflow-hidden transition-colors duration-200">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E9ECEF] dark:border-white/5 text-xs uppercase tracking-wider text-gray-500 bg-gray-50 dark:bg-dark-bg/50 transition-colors duration-200">
              <th className="p-4 font-medium">Оценка & Товар</th>
              <th className="p-4 font-medium">Отзыв покупателя</th>
              <th className="p-4 font-medium">AI Черновик</th>
              <th className="p-4 font-medium">Статус</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E9ECEF] dark:divide-white/5">
            <AnimatePresence initial={false}>
            {reviews.map((review) => (
              <motion.tr 
                key={review.id} 
                initial={{ opacity: 0, y: -20, backgroundColor: 'rgba(6, 182, 212, 0.1)' }}
                animate={{ opacity: 1, y: 0, backgroundColor: 'transparent' }}
                transition={{ duration: 0.5 }}
                onClick={() => setSelectedReview(review)}
                className="group hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors cursor-pointer"
              >
                <td className="p-4 align-top w-1/4">
                  <div className="flex text-yellow-500 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill={i < review.rating ? 'currentColor' : 'transparent'} className={i < review.rating ? '' : 'text-gray-300 dark:text-gray-700'} />
                    ))}
                  </div>
                  <p className="text-xs font-medium text-[#1A1A1B] dark:text-gray-300 mb-1 line-clamp-1">{review.productName}</p>
                  <p className="text-[11px] text-gray-500 dark:text-gray-600">{review.date}</p>
                </td>
                <td className="p-4 align-top w-1/4">
                  <p className="text-sm text-[#1A1A1B] dark:text-gray-300 line-clamp-3 leading-relaxed">{review.text}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-600 mt-2">— {review.buyerName}</p>
                </td>
                <td className="p-4 align-top w-1/3">
                  {generatingIds.has(review.id) ? (
                    <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400">
                      <Loader2 size={14} className="animate-spin" />
                      <span className="text-xs italic font-medium">ИИ генерирует ответ...</span>
                    </div>
                  ) : review.aiDraft ? (
                    <p className="text-sm text-gray-600 dark:text-gray-400 italic line-clamp-3 leading-relaxed border-l-2 border-cyan-500/30 pl-3">
                      {review.aiDraft}
                    </p>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400 dark:text-gray-600 italic">Ожидает генерации...</span>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleGenerate(review.id, review); }}
                        className="text-xs text-cyan-600 hover:text-cyan-700 dark:text-cyan-500 dark:hover:text-cyan-400 font-medium"
                      >
                        Сгенерировать
                      </button>
                    </div>
                  )}
                </td>
                <td className="p-4 align-top">
                  <StatusChip status={review.status} />
                </td>
              </motion.tr>
            ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* --- RIGHT ACTION PANEL (DRAWER) --- */}
      <AnimatePresence>
        {selectedReview && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 dark:bg-black/60 backdrop-blur-sm z-30"
              onClick={() => setSelectedReview(null)}
            />
            
            <motion.aside 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full sm:w-[500px] bg-light-card dark:bg-dark-surface border-l border-[#E9ECEF] dark:border-white/5 shadow-[-20px_0_50px_rgba(0,0,0,0.1)] dark:shadow-[-20px_0_50px_rgba(0,0,0,0.5)] z-40 flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-[#E9ECEF] dark:border-white/5 bg-gray-50 dark:bg-dark-bg/50 transition-colors duration-200">
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-semibold text-[#1A1A1B] dark:text-white tracking-tight">Обработка отзыва</h2>
                  <StatusChip status={selectedReview.status} />
                </div>
                <button 
                  onClick={() => setSelectedReview(null)}
                  className="p-2 text-gray-500 hover:text-[#1A1A1B] dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/5 rounded-md transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
                <div className="bg-gray-50 dark:bg-dark-bg border border-[#E9ECEF] dark:border-white/5 p-4 rounded-md transition-colors duration-200">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                         <Star key={i} size={14} fill={i < selectedReview.rating ? 'currentColor' : 'transparent'} className={i < selectedReview.rating ? '' : 'text-gray-300 dark:text-gray-700'} />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">{selectedReview.date}</span>
                  </div>
                  <p className="text-sm text-[#1A1A1B] dark:text-gray-200 leading-relaxed mb-3">"{selectedReview.text}"</p>
                  <p className="text-xs text-gray-500 font-medium">— {selectedReview.buyerName}</p>
                </div>

                <div className="flex flex-col gap-3 relative">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold uppercase tracking-widest text-cyan-600 dark:text-cyan-400 flex items-center gap-2">
                      <Sparkles size={14} /> ИИ-Ассистент
                    </label>
                  </div>
                  <div className="relative">
                    <textarea 
                      rows={6}
                      value={selectedReview.aiDraft || ''}
                      onChange={(e) => setSelectedReview({...selectedReview, aiDraft: e.target.value})}
                      placeholder="Нажмите 'Сгенерировать' для создания ответа..."
                      disabled={generatingIds.has(selectedReview.id)}
                      className="w-full bg-white dark:bg-dark-bg border border-[#E9ECEF] dark:border-white/10 text-sm text-[#1A1A1B] dark:text-gray-200 rounded-md p-4 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all resize-none shadow-sm dark:shadow-inner disabled:opacity-50"
                    />
                    {generatingIds.has(selectedReview.id) && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 dark:bg-dark-bg/80 backdrop-blur-sm rounded-md border border-cyan-500/30">
                        <Loader2 size={24} className="text-cyan-500 animate-spin mb-2" />
                        <span className="text-sm font-medium text-cyan-700 dark:text-cyan-400 animate-pulse">ИИ анализирует отзыв...</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Quality Gate Logs */}
                {selectedReview.aiDraft && (
                  <div className="mt-2 border-t border-[#E9ECEF] dark:border-white/5 pt-4">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-3">
                      <ShieldCheck size={14} /> Quality Gate Logs
                    </div>
                    <div className="bg-emerald-50/50 dark:bg-emerald-500/5 border border-emerald-100 dark:border-emerald-500/10 p-4 rounded-md text-xs text-gray-600 dark:text-gray-400 flex flex-col gap-2">
                      <p><span className="font-medium text-emerald-700 dark:text-emerald-300">Тон отзыва:</span> {selectedReview.rating >= 4 ? 'Позитивный' : 'Негативный'}</p>
                      <p><span className="font-medium text-emerald-700 dark:text-emerald-300">Применено правило:</span> {MOCK_RULE.name}</p>
                      <p><span className="font-medium text-emerald-700 dark:text-emerald-300">Фокус ответа:</span> {selectedReview.rating >= 4 ? 'Благодарность и лояльность' : 'Извинение и решение проблемы'}</p>
                      <div className="mt-2 pt-2 border-t border-emerald-100 dark:border-emerald-500/10 flex justify-between items-center">
                        <span className="font-medium text-emerald-700 dark:text-emerald-300">Оценка качества:</span>
                        <span className="bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded font-mono">9.5/10</span>
                      </div>
                    </div>
                  </div>
                )}

                {selectedReview.logs && (
                  <div className="mt-2 border-t border-[#E9ECEF] dark:border-white/5 pt-4">
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                      <Clock size={12} />
                      <span>Логи генерации</span>
                    </div>
                    {selectedReview.logs.map((log, idx) => (
                      <div key={idx} className="bg-gray-50 dark:bg-dark-bg border border-[#E9ECEF] dark:border-white/5 p-3 rounded text-[11px] font-mono text-gray-500 dark:text-gray-400 flex flex-col gap-1 transition-colors duration-200">
                        <div className="flex justify-between">
                          <span className="text-cyan-600 dark:text-cyan-500/70">Provider: {log.provider}</span>
                          <span>{log.latencyMs}ms</span>
                        </div>
                        <div>Attempts: {log.attempts} | {log.timestamp}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-6 border-t border-[#E9ECEF] dark:border-white/5 bg-gray-50 dark:bg-dark-bg/50 flex gap-3 transition-colors duration-200">
                <button 
                  onClick={() => handleGenerate(selectedReview.id, selectedReview)}
                  disabled={generatingIds.has(selectedReview.id)}
                  className="flex-1 flex items-center justify-center gap-2 bg-white dark:bg-dark-surface border border-[#E9ECEF] dark:border-white/10 text-[#1A1A1B] dark:text-white px-4 py-2.5 rounded-md text-sm font-medium hover:bg-gray-50 dark:hover:bg-white/5 transition-colors disabled:opacity-50 shadow-sm"
                >
                  {generatingIds.has(selectedReview.id) ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />}
                  {generatingIds.has(selectedReview.id) ? 'В процессе...' : (selectedReview.aiDraft ? 'Перегенерировать' : 'Сгенерировать')}
                </button>
                <button 
                  className="px-4 py-2.5 bg-white dark:bg-dark-surface border border-[#E9ECEF] dark:border-white/10 text-gray-500 dark:text-gray-300 rounded-md hover:text-[#1A1A1B] dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-colors shadow-sm"
                  title="Копировать"
                >
                  <Copy size={18} />
                </button>
                <button 
                  onClick={handlePublish}
                  disabled={!selectedReview.aiDraft}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#1A1A1B] dark:bg-white text-white dark:text-black px-4 py-2.5 rounded-md text-sm font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-md dark:shadow-[0_0_20px_rgba(255,255,255,0.1)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={16} />
                  Опубликовать
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
