import React, { useState } from 'react';
import { BeerBottle } from '../types';
import { sound } from '../utils/audio';
import { Beer, Sparkles, CheckCircle, Info, Wine, Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BeerCrateSectionProps {
  beers: BeerBottle[];
  onOpenBeer: (id: number) => void;
  onOpenAllBeers: () => void;
}

export const BeerCrateSection: React.FC<BeerCrateSectionProps> = ({
  beers,
  onOpenBeer,
  onOpenAllBeers
}) => {
  const [selectedBeer, setSelectedBeer] = useState<BeerBottle | null>(beers[0]);
  const openedCount = beers.filter((b) => b.opened).length;

  const handleBeerClick = (beer: BeerBottle) => {
    if (!beer.opened) {
      sound.playBeerOpen();
      onOpenBeer(beer.id);
    } else {
      sound.playClink();
    }
    setSelectedBeer({ ...beer, opened: true });
  };

  const handleOpenAll = () => {
    sound.playBeerOpen();
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.6 }
    });
    onOpenAllBeers();
  };

  return (
    <section className="bg-stone-900/90 border border-stone-800 rounded-2xl p-5 sm:p-8 shadow-2xl relative">
      {/* Wood header banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">🍺</span>
            <span className="text-xs uppercase font-extrabold tracking-wider px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Обещанный Трофей
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Ящик Крафтового Пива на 12 Бутылок
          </h2>
          <p className="text-stone-300 text-sm mt-1 max-w-xl">
            Каждая бутылка сварена в честь победы народной солидарности. Нажмите на бутылку, чтобы открыть с характерным пшиком и прочесть дегустационный тост!
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleOpenAll}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-200" />
            <span>Открыть всё для друзей!</span>
          </button>

          <div className="px-3 py-1.5 rounded-xl bg-stone-950 border border-stone-800 text-xs text-amber-300 font-bold">
            Открыто: {openedCount} / {beers.length}
          </div>
        </div>
      </div>

      {/* The Wooden Crate Box Grid */}
      <div className="bg-gradient-to-b from-amber-950/40 via-stone-900 to-stone-950 p-4 sm:p-6 rounded-2xl border-4 border-amber-900/60 shadow-inner relative mb-6">
        {/* Wood Texture Accent corners */}
        <div className="absolute top-2 left-2 text-[10px] uppercase font-black tracking-widest text-amber-700/60 select-none">
          ★ HOP HAVEN BREWERY • CRATE № 10000 ★
        </div>
        <div className="absolute bottom-2 right-2 text-[10px] uppercase font-black tracking-widest text-amber-700/60 select-none">
          ЧЕСТНАЯ ДОБЫЧА
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 mt-4">
          {beers.map((beer) => {
            const isSelected = selectedBeer?.id === beer.id;

            return (
              <button
                key={beer.id}
                onClick={() => handleBeerClick(beer)}
                className={`group relative p-3 sm:p-4 rounded-xl border flex flex-col items-center justify-between min-h-[170px] transition-all cursor-pointer select-none ${
                  isSelected
                    ? 'ring-2 ring-amber-400 border-amber-400 bg-stone-850 shadow-xl shadow-amber-500/10'
                    : 'border-stone-800/80 bg-stone-900/90 hover:bg-stone-850 hover:border-stone-700'
                }`}
              >
                {/* Cap status */}
                <div className="relative mb-2">
                  {beer.opened ? (
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-xs text-emerald-300 font-bold">
                      <span className="text-base">💨</span>
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-600 to-yellow-400 border-2 border-amber-200 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <span className="text-[10px] font-black text-stone-950">POP</span>
                    </div>
                  )}

                  {!beer.opened && (
                    <span className="absolute -top-1 -right-1 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                    </span>
                  )}
                </div>

                {/* Bottle body stylized */}
                <div className="relative my-1 flex flex-col items-center">
                  <div className="w-3 h-4 bg-stone-700 rounded-t-sm" />
                  <div
                    className={`w-7 h-14 rounded-b-md bg-gradient-to-b ${beer.color} shadow-md flex items-center justify-center relative overflow-hidden`}
                  >
                    {/* Bottle label */}
                    <div className="w-5 h-8 bg-amber-100/90 rounded-sm flex items-center justify-center shadow-xs">
                      <Beer className="w-3 h-3 text-amber-900" />
                    </div>
                  </div>
                </div>

                {/* Bottle Name & ABV */}
                <div className="text-center mt-2 w-full">
                  <p className="text-xs font-bold text-white truncate group-hover:text-amber-300 transition-colors">
                    {beer.name.split(' ')[0]}
                  </p>
                  <p className="text-[10px] text-stone-400 truncate">{beer.style}</p>
                  <span className="inline-block mt-1 text-[9px] px-1.5 py-0.2 rounded bg-stone-800 text-amber-400 font-semibold">
                    {beer.abv}
                  </span>
                </div>

                {/* Hover overlay hint */}
                {!beer.opened && (
                  <span className="absolute inset-0 bg-amber-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="text-[11px] font-black text-amber-300 bg-stone-950/90 px-2 py-0.5 rounded shadow">
                      Открыть! 🍻
                    </span>
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Beer Tasting Card */}
      {selectedBeer && (
        <div className="p-4 sm:p-6 bg-stone-950/80 rounded-xl border border-amber-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 animate-fade-in">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xl">🍺</span>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {selectedBeer.name}
              </h3>
              <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
                Крепость: {selectedBeer.abv}
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-stone-800 text-stone-300">
                {selectedBeer.style}
              </span>
            </div>
            <p className="text-sm text-stone-300 italic">{selectedBeer.tagline}</p>
            <p className="text-xs text-stone-400">{selectedBeer.description}</p>
          </div>

          {/* Toast quote */}
          <div className="bg-amber-950/40 border border-amber-500/20 p-3 rounded-lg md:max-w-xs w-full">
            <p className="text-xs text-amber-300 font-bold mb-1 flex items-center gap-1">
              <span>🥂</span> Тост от души:
            </p>
            <p className="text-xs text-stone-200 italic leading-snug">
              «{selectedBeer.toast}»
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
