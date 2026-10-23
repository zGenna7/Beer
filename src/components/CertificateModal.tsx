import React, { useState } from 'react';
import { X, Award, Check, Copy, Share2, Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  likes: number;
  openedBeers: number;
  friesEaten: number;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  likes,
  openedBeers,
  friesEaten
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const certificateText = `🏆 ПОЧЁТНАЯ ГРАМОТА ОБРАЗЦОВОЙ СЕМЬИ 🏆
Выдана Золотой Жене за проявленную мудрость, верность данному слову и успешную доставку Ящика Пива!
Мужу — за стратегическую дипломатию и привлечение народной поддержки.

📊 ДОСТИЖЕНИЯ:
• Народных лайков: ${likes.toLocaleString('ru-RU')}
• Бутылок крафта открыто: ${openedBeers} из 12
• Картошки фри с аппетитом съедено: ${friesEaten} шт.

«Жена сказала — жена купила! А картошка на фоне — шедевр кулинарии!»
Печать: Верховный Совет Мужской Солидарности Интернета 🍻🍟`;

  const handleCopy = () => {
    sound.playLikePop();
    navigator.clipboard.writeText(certificateText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);

    confetti({
      particleCount: 50,
      spread: 70
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-xl bg-stone-900 border-2 border-amber-500/60 rounded-3xl p-6 sm:p-8 shadow-2xl text-center overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white rounded-full bg-stone-800/80 hover:bg-stone-700 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Ornate Gold Frame Accent */}
        <div className="border border-dashed border-amber-400/40 rounded-2xl p-6 bg-gradient-to-b from-amber-950/30 via-stone-950/80 to-amber-950/20 relative">
          <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 p-1 shadow-lg shadow-amber-500/30 flex items-center justify-center">
            <Award className="w-9 h-9 text-stone-950" />
          </div>

          <span className="text-[11px] font-black uppercase tracking-widest text-amber-400">
            ОФИЦИАЛЬНОЕ СВИДЕТЕЛЬСТВО
          </span>

          <h3 className="text-xl sm:text-2xl font-black text-white mt-1 mb-2 font-serif">
            ГРАМОТА ВЫСШЕЙ ПРОБЫ
          </h3>

          <p className="text-xs sm:text-sm text-stone-300 mb-4 leading-relaxed">
            Награждается <strong className="text-amber-300">Золотая Жена</strong> за непоколебимую честность в выполнении условий спора: покупку полного ящика пенного напитка по воле интернет-сообщества!
          </p>

          {/* Stats Badges */}
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-amber-500/20 my-4 text-center">
            <div className="bg-stone-900/80 p-2 rounded-xl">
              <span className="text-lg">❤️</span>
              <p className="text-xs text-stone-400">Лайков</p>
              <p className="text-sm font-black text-rose-400 tabular-nums">
                {likes.toLocaleString('ru-RU')}
              </p>
            </div>

            <div className="bg-stone-900/80 p-2 rounded-xl">
              <span className="text-lg">🍻</span>
              <p className="text-xs text-stone-400">Бутылок</p>
              <p className="text-sm font-black text-amber-400 tabular-nums">
                {openedBeers} / 12
              </p>
            </div>

            <div className="bg-stone-900/80 p-2 rounded-xl">
              <span className="text-lg">🍟</span>
              <p className="text-xs text-stone-400">Картошки</p>
              <p className="text-sm font-black text-yellow-400 tabular-nums">
                {friesEaten} шт.
              </p>
            </div>
          </div>

          <p className="text-xs text-amber-200/80 italic font-mono mb-4">
            «Картошка на фоне признана национальным достоянием семейного уюта»
          </p>

          <div className="flex items-center justify-between text-[11px] text-stone-400 pt-2 border-t border-stone-800">
            <span>Печать: Совет Мужиков 🏛️</span>
            <span>Статус: Заверено нотариусом любви ❤️</span>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="mt-5 flex items-center justify-center gap-3">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Скопировано в буфер!' : 'Скопировать текст грамоты'}</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs sm:text-sm font-medium transition-colors cursor-pointer"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};
