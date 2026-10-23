import React, { useState } from 'react';
import { SAUCES } from '../data/mockData';
import { Sauce } from '../types';
import { sound } from '../utils/audio';
import { Flame, Sparkles, RefreshCw, ChefHat, Check, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

interface FriesLoverSectionProps {
  friesEaten: number;
  onEatFry: () => void;
}

interface FryItem {
  id: number;
  angle: number;
  length: number; // in percent or px
  crispiness: 'golden' | 'extra-crisp' | 'cheese-drenched';
  eaten: boolean;
}

export const FriesLoverSection: React.FC<FriesLoverSectionProps> = ({
  friesEaten,
  onEatFry
}) => {
  const [selectedSauce, setSelectedSauce] = useState<Sauce>(SAUCES[0]);
  const [seasoning, setSeasoning] = useState<string>('Крупная морская соль');
  const [crunchLevel, setCrunchLevel] = useState<number>(friesEaten * 15);
  const [lastDipped, setLastDipped] = useState<string | null>(null);

  // Generate a batch of 12 distinct interactive french fries in the basket
  const [friesBasket, setFriesBasket] = useState<FryItem[]>(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      angle: (i - 5.5) * 6 + (Math.random() * 8 - 4),
      length: 80 + Math.random() * 25,
      crispiness: i % 3 === 0 ? 'extra-crisp' : i % 2 === 0 ? 'cheese-drenched' : 'golden',
      eaten: false
    }));
  });

  const availableFriesCount = friesBasket.filter((f) => !f.eaten).length;

  const handleFryClick = (id: number) => {
    sound.playFryCrunch();
    onEatFry();
    setCrunchLevel((prev) => prev + 25);
    setLastDipped(selectedSauce.name);

    setFriesBasket((prev) =>
      prev.map((f) => (f.id === id ? { ...f, eaten: true } : f))
    );

    if (availableFriesCount <= 1) {
      confetti({
        particleCount: 40,
        spread: 60,
        colors: ['#f59e0b', '#fbbf24', '#ef4444']
      });
    }
  };

  const handleRefill = () => {
    sound.playFryCrunch();
    setFriesBasket(
      Array.from({ length: 12 }, (_, i) => ({
        id: Date.now() + i,
        angle: (i - 5.5) * 6 + (Math.random() * 8 - 4),
        length: 80 + Math.random() * 25,
        crispiness: i % 3 === 0 ? 'extra-crisp' : i % 2 === 0 ? 'cheese-drenched' : 'golden',
        eaten: false
      }))
    );
  };

  // Crunch status title
  const getCrunchTitle = () => {
    if (friesEaten >= 50) return '🏆 Бог Золотого Фритюра';
    if (friesEaten >= 25) return '👑 Король Соусов и Хруста';
    if (friesEaten >= 10) return '🔥 Истинный Картофельный Эстет';
    return '🤤 Ценитель картошечки на фоне';
  };

  return (
    <section id="fries-station" className="bg-stone-900/80 border border-amber-500/30 rounded-2xl p-5 sm:p-8 shadow-2xl relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -top-20 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">🍟</span>
            <span className="text-xs uppercase font-extrabold tracking-wider px-2.5 py-0.5 rounded bg-yellow-400/20 text-yellow-300 border border-yellow-400/30">
              Та самая картошка фри на фоне🤤
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Интерактивная Станция Хруста
          </h2>
          <p className="text-stone-300 text-sm mt-1 max-w-xl">
            Пока все восхищались ящиком пива, настоящий гурман заметил главное сокровище.
            Выбирайте соус, макайте хрустящие фришки и наслаждайтесь идеальным звуком!
          </p>
        </div>

        {/* Crunch-o-meter badge */}
        <div className="bg-stone-950/90 border border-amber-500/40 p-3 rounded-xl min-w-[200px]">
          <div className="flex items-center justify-between text-xs text-stone-400 mb-1">
            <span>Хрустометр:</span>
            <span className="text-amber-400 font-bold">{getCrunchTitle()}</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-yellow-400 tabular-nums">{friesEaten}</span>
            <span className="text-xs text-stone-300">картофелин схрумкано</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left: Sauce selector & Seasoning */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-stone-950/60 p-4 rounded-xl border border-stone-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-3 flex items-center gap-1.5">
              <span>🥫</span> Выберите соус для макания:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SAUCES.map((sauce) => {
                const isSelected = selectedSauce.id === sauce.id;
                return (
                  <button
                    key={sauce.id}
                    onClick={() => {
                      sound.playLikePop();
                      setSelectedSauce(sauce);
                    }}
                    className={`flex items-center gap-2.5 p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-500/20 border-amber-400 text-white shadow-md shadow-amber-500/10'
                        : 'bg-stone-900/80 border-stone-800 text-stone-300 hover:bg-stone-850 hover:border-stone-700'
                    }`}
                  >
                    <span className="text-xl">{sauce.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold truncate">{sauce.name}</p>
                      <p className="text-[10px] text-stone-400 truncate">{sauce.description}</p>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Seasoning options */}
          <div className="bg-stone-950/60 p-4 rounded-xl border border-stone-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-2 flex items-center gap-1.5">
              <span>🧂</span> Дополнительная посыпка:
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {[
                'Крупная морская соль',
                'Копченая паприка',
                'Чеснок и розмарин',
                'Сырный пармезан'
              ].map((season) => (
                <button
                  key={season}
                  onClick={() => {
                    sound.playLikePop();
                    setSeasoning(season);
                  }}
                  className={`text-xs px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                    seasoning === season
                      ? 'bg-yellow-500 text-stone-950 font-bold'
                      : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
                  }`}
                >
                  {season}
                </button>
              ))}
            </div>
          </div>

          {/* Humorous Wife dialogue */}
          <div className="p-3 bg-amber-950/30 border border-amber-500/20 rounded-xl flex items-center gap-3">
            <span className="text-2xl">👩‍🦰</span>
            <p className="text-xs text-amber-200 leading-snug italic">
              «Жена заглядывает на кухню: "Я вижу, ты там на картошку набросился! Оставь мне хотя бы пару штучек, а то ящик пива обратно унесу!"»
            </p>
          </div>
        </div>

        {/* Right: The Interactive Fries Bowl & Dipping Dish */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center p-4 sm:p-6 bg-stone-950/70 rounded-xl border border-stone-800 relative min-h-[380px]">
          {/* Active Sauce Dip Bowl */}
          <div className="mb-4 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-900 border border-stone-700 text-xs text-stone-300 mb-2">
              <span>Соус в соуснике:</span>
              <strong className="text-amber-400">{selectedSauce.name}</strong>
            </div>

            {/* Sauce bowl visual */}
            <div className="w-24 h-10 mx-auto rounded-full bg-gradient-to-b from-stone-800 to-stone-900 border-2 border-stone-700 shadow-lg relative flex items-center justify-center overflow-hidden">
              <div
                className={`w-20 h-6 rounded-full transition-all duration-300 shadow-inner flex items-center justify-center text-xs font-black ${
                  selectedSauce.id === 'cheese'
                    ? 'bg-amber-400 text-amber-900'
                    : selectedSauce.id === 'bbq'
                    ? 'bg-red-900 text-red-100'
                    : selectedSauce.id === 'ketchup'
                    ? 'bg-red-600 text-white'
                    : selectedSauce.id === 'garlic'
                    ? 'bg-emerald-100 text-emerald-900'
                    : 'bg-stone-300 text-stone-900'
                }`}
              >
                {selectedSauce.icon}
              </div>
            </div>
          </div>

          {/* The Basket of Fries */}
          <div className="relative w-72 sm:w-80 h-52 bg-gradient-to-t from-stone-900 to-stone-800/90 rounded-b-3xl border-2 border-amber-600/40 shadow-2xl flex items-end justify-center pb-4 px-6 overflow-hidden">
            {/* Basket pattern / texture */}
            <div className="absolute inset-0 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:12px_12px] opacity-15 pointer-events-none" />

            {/* Paper lining */}
            <div className="absolute inset-x-3 bottom-2 top-8 bg-amber-100/10 rounded-b-2xl border-t border-dashed border-amber-400/30" />

            {/* Interactive Fries */}
            <div className="relative z-10 w-full h-full flex items-end justify-center">
              {friesBasket.map((fry) => {
                if (fry.eaten) return null;
                return (
                  <button
                    key={fry.id}
                    onClick={() => handleFryClick(fry.id)}
                    style={{
                      transform: `rotate(${fry.angle}deg)`,
                      height: `${fry.length}px`
                    }}
                    className="group relative w-4 sm:w-5 -mx-1 rounded-t-md bg-gradient-to-t from-amber-600 via-yellow-400 to-yellow-300 hover:from-amber-500 hover:to-yellow-200 border-t border-x border-amber-300/80 shadow-md transition-all duration-150 cursor-pointer hover:-translate-y-3 active:scale-90"
                    title="Нажми, чтобы макнуть и схрумкать!"
                  >
                    {/* Crispy tips */}
                    <div className="w-full h-2 rounded-t-md bg-amber-500/70" />
                    {/* Bite hint on hover */}
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-[10px] bg-stone-900 text-amber-300 px-1.5 py-0.5 rounded pointer-events-none font-bold whitespace-nowrap z-20">
                      Хрусь! 😋
                    </span>
                  </button>
                );
              })}

              {availableFriesCount === 0 && (
                <div className="text-center py-6 z-20">
                  <p className="text-amber-400 font-extrabold text-base mb-1">
                    Тарелка пуста! Все схрумкано до крошки! 🤤
                  </p>
                  <p className="text-xs text-stone-400 mb-3">
                    Жена одобрила добавку из свежего фритюра
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Action: Refill Fries */}
          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={handleRefill}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-bold text-xs sm:text-sm shadow-md active:scale-95 transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Пожарить ещё порцию фри! 🔥</span>
            </button>
            <span className="text-xs text-stone-400">
              Осталось в тарелке: <strong className="text-white">{availableFriesCount}</strong> из 12
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
