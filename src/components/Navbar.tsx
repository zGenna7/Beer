import React from 'react';
import { Beer, Volume2, VolumeX, Award, Flame } from 'lucide-react';
import { sound } from '../utils/audio';

interface NavbarProps {
  likes: number;
  openedBeers: number;
  totalBeers: number;
  friesEaten: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenCertificate: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  likes,
  openedBeers,
  totalBeers,
  friesEaten,
  soundEnabled,
  onToggleSound,
  onOpenCertificate
}) => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-stone-950/85 border-b border-amber-500/20 shadow-lg shadow-black/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-orange-500 to-amber-700 flex items-center justify-center shadow-md shadow-amber-500/30 text-white font-black text-xl">
            🍻
          </div>
          <div>
            <h1 className="font-bold text-white text-base sm:text-lg leading-tight flex items-center gap-2">
              Ящик Пива & Картошка Фри
              <span className="hidden sm:inline-block text-xs font-semibold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Легенда Реддита
              </span>
            </h1>
            <p className="text-xs text-amber-200/60 hidden sm:block">
              Мужики поддержали — жена купила!
            </p>
          </div>
        </div>

        {/* Counters & Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Likes counter */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-900 border border-stone-800 text-xs sm:text-sm font-semibold text-rose-300">
            <span>❤️</span>
            <span className="tabular-nums font-bold">{likes.toLocaleString('ru-RU')}</span>
          </div>

          {/* Beer counter */}
          <div className="hidden xs:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-900 border border-stone-800 text-xs sm:text-sm font-semibold text-amber-300">
            <Beer className="w-3.5 h-3.5 text-amber-400" />
            <span className="tabular-nums font-bold">{openedBeers}/{totalBeers}</span>
          </div>

          {/* Fries counter */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-900 border border-stone-800 text-xs sm:text-sm font-semibold text-yellow-300">
            <span>🍟</span>
            <span className="tabular-nums font-bold">{friesEaten} шт.</span>
          </div>

          {/* Certificate button */}
          <button
            onClick={() => {
              sound.playClink();
              onOpenCertificate();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-xs sm:text-sm font-medium transition-all shadow-sm active:scale-95 cursor-pointer"
            title="Официальная грамота жене"
          >
            <Award className="w-4 h-4" />
            <span className="hidden sm:inline">Грамота Жене</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            className={`p-2 rounded-lg border transition-all cursor-pointer ${
              soundEnabled
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
                : 'bg-stone-800 text-stone-500 border-stone-700 hover:text-stone-300'
            }`}
            title={soundEnabled ? 'Звук включен' : 'Звук выключен'}
            aria-label="Переключить звук"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
