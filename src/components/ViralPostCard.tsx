import React, { useState } from 'react';
import { Heart, ThumbsUp, Sparkles, CheckCircle2, MessageCircle, Share2, ZoomIn, Eye, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';
import { Milestone } from '../types';

interface ViralPostCardProps {
  likes: number;
  onLike: () => void;
  milestones: Milestone[];
  onFocusFries: () => void;
}

export const ViralPostCard: React.FC<ViralPostCardProps> = ({
  likes,
  onLike,
  milestones,
  onFocusFries
}) => {
  const [activePhoto, setActivePhoto] = useState<'beer_crate' | 'wife' | 'fries'>('beer_crate');
  const [friesHighlighted, setFriesHighlighted] = useState<boolean>(false);
  const [likeFloating, setLikeFloating] = useState<{ id: number; x: number; text: string }[]>([]);

  const handleLikeClick = (e: React.MouseEvent) => {
    sound.playLikePop();
    onLike();

    // Spawn floating particle
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.random() * 40 - 20;
    const icons = ['❤️', '🍻', '+1', '🔥', '🍟', '✊'];
    const text = icons[Math.floor(Math.random() * icons.length)];
    const newId = Date.now() + Math.random();

    setLikeFloating((prev) => [...prev.slice(-8), { id: newId, x, text }]);
    setTimeout(() => {
      setLikeFloating((prev) => prev.filter((item) => item.id !== newId));
    }, 1000);
  };

  const nextMilestone = milestones.find((m) => m.likesRequired > likes) || milestones[milestones.length - 1];
  const progressPercent = Math.min(
    100,
    Math.round((likes / (nextMilestone.likesRequired || 5000)) * 100)
  );

  return (
    <div className="bg-stone-900/90 border border-stone-800 rounded-2xl overflow-hidden shadow-2xl relative">
      {/* Decorative top accent */}
      <div className="h-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500" />

      {/* Post Author / Header */}
      <div className="p-4 sm:p-6 pb-3 sm:pb-4 flex items-start justify-between gap-4 border-b border-stone-800/60">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-rose-500 p-0.5 shadow-md">
              <div className="w-full h-full rounded-full bg-stone-950 flex items-center justify-center text-xl">
                👨‍🦱
              </div>
            </div>
            <span className="absolute -bottom-1 -right-1 text-sm">🍻</span>
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-white text-base sm:text-lg">Счастливый Муж</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Жена сдержала слово
              </span>
            </div>
            <p className="text-xs text-stone-400">@beer_husband • 2 часа назад • Сообщество «Лига Справедливости»</p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-stone-800 text-stone-300 border border-stone-700">
            🔥 В Тренде №1
          </span>
        </div>
      </div>

      {/* The Famous Text / Viral Quote */}
      <div className="px-4 sm:px-6 py-4 space-y-3">
        <blockquote className="text-base sm:text-xl font-medium text-stone-100 leading-relaxed bg-stone-950/60 p-4 rounded-xl border-l-4 border-amber-500">
          <p className="mb-2">
            «Жена сказала, что если будут лайки — <span className="text-amber-400 font-bold underline decoration-amber-500/60 underline-offset-4">купит ящик пива</span>. Мужики, поддержите!»
          </p>
          <p className="text-emerald-400 font-semibold mb-2">
            «Купила :)) Спасибо всем за лайки, мы не думали, что их будет так много! 🎉»
          </p>
          <p className="text-amber-300 italic flex items-center gap-1.5 font-normal">
            <span>«Хочу ту картошку фри на фоне🤤»</span>
            <button
              onClick={() => {
                setFriesHighlighted(true);
                onFocusFries();
              }}
              className="inline-flex items-center gap-1 text-xs not-italic font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition-colors ml-2 cursor-pointer"
            >
              <Eye className="w-3 h-3" /> Где она?!
            </button>
          </p>
        </blockquote>
      </div>

      {/* Photo Tabs */}
      <div className="px-4 sm:px-6 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setActivePhoto('beer_crate')}
          className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
            activePhoto === 'beer_crate'
              ? 'bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/20'
              : 'bg-stone-800/80 text-stone-300 hover:bg-stone-800 border border-stone-700/60'
          }`}
        >
          <span>📸 Фото #1: Ящик & Картошка на фоне</span>
        </button>

        <button
          onClick={() => setActivePhoto('wife')}
          className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
            activePhoto === 'wife'
              ? 'bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/20'
              : 'bg-stone-800/80 text-stone-300 hover:bg-stone-800 border border-stone-700/60'
          }`}
        >
          <span>👑 Фото #2: Довольная Жена</span>
        </button>

        <button
          onClick={() => setActivePhoto('fries')}
          className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
            activePhoto === 'fries'
              ? 'bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-500/20'
              : 'bg-stone-800/80 text-stone-300 hover:bg-stone-800 border border-stone-700/60'
          }`}
        >
          <span>🍟 Фото #3: Та самая картошечка фри!</span>
        </button>
      </div>

      {/* Photo Display Viewport */}
      <div className="relative mx-4 sm:mx-6 my-2 rounded-xl overflow-hidden bg-stone-950 aspect-video max-h-[460px] border border-stone-800 shadow-inner group">
        {activePhoto === 'beer_crate' && (
          <div className="relative w-full h-full">
            <img
              src="/src/assets/images/beer_crate_scene_1792758178464.jpg"
              alt="Ящик пива на деревянном столе с тарелкой горячей картошки фри на фоне"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            {/* The Famous Background Fries Highlight Pointer */}
            <div
              className={`absolute top-[42%] right-[10%] sm:right-[15%] transition-all duration-300 ${
                friesHighlighted ? 'scale-110 ring-4 ring-yellow-400 ring-offset-2 ring-offset-stone-950 rounded-2xl' : ''
              }`}
            >
              <button
                onClick={() => {
                  sound.playFryCrunch();
                  onFocusFries();
                }}
                className="group/tag flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-900/90 backdrop-blur-md border border-yellow-400/80 text-yellow-300 shadow-xl cursor-pointer hover:bg-yellow-400 hover:text-stone-950 transition-all active:scale-95 animate-bounce"
              >
                <span className="text-base">🍟</span>
                <span className="text-xs font-black tracking-wide">ТА САМАЯ КАРТОШКА НА ФОНЕ! 🤤</span>
              </button>
            </div>

            <div className="absolute bottom-3 left-3 bg-stone-950/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-stone-700/60 text-xs text-stone-200">
              🍺 Деревянный ящик крафта + парящая тарелка фри с чесночным соусом
            </div>
          </div>
        )}

        {activePhoto === 'wife' && (
          <div className="relative w-full h-full">
            <img
              src="/src/assets/images/happy_wife_beer_1792758179699.jpg"
              alt="Счастливая жена подмигивает рядом с ящиком холодного пива и закусками"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute bottom-3 left-3 bg-stone-950/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-stone-700/60 text-xs text-stone-200">
              ❤️ «Пацан сказал — жена купила! Но картошку чур делим поровну!»
            </div>
          </div>
        )}

        {activePhoto === 'fries' && (
          <div className="relative w-full h-full">
            <img
              src="/src/assets/images/crispy_fries_1792758178801.jpg"
              alt="Крупный план горячей хрустящей картошки фри с расплавленным сыром чеддер и соусом"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute bottom-3 left-3 bg-stone-950/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-stone-700/60 text-xs text-stone-200">
              🤤 Идеальная золотистая корочка, крупная морская соль и соус чеддер
            </div>
          </div>
        )}
      </div>

      {/* Interactive Action Bar (Like Clicker, Milestone & Cheer) */}
      <div className="p-4 sm:p-6 bg-stone-950/40 border-t border-stone-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Like Button & Floating Particles */}
        <div className="relative flex items-center gap-3">
          <button
            onClick={handleLikeClick}
            className="group relative px-6 py-3.5 rounded-xl bg-gradient-to-r from-rose-600 via-pink-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-extrabold text-base sm:text-lg flex items-center gap-3 shadow-lg shadow-rose-600/30 hover:shadow-rose-600/50 active:scale-95 transition-all cursor-pointer select-none"
          >
            <Heart className="w-6 h-6 fill-white text-white group-hover:scale-125 transition-transform animate-pulse" />
            <span>МУЖИКИ, ПОДДЕРЖИТЕ!</span>
            <span className="ml-1 px-2.5 py-0.5 rounded-full bg-white/20 text-white text-sm font-bold tabular-nums">
              {likes.toLocaleString('ru-RU')}
            </span>
          </button>

          {/* Floating burst particles */}
          {likeFloating.map((item) => (
            <span
              key={item.id}
              style={{ left: `calc(50% + ${item.x}px)` }}
              className="absolute -top-8 text-2xl font-black pointer-events-none animate-float-fade select-none text-amber-300 drop-shadow-md"
            >
              {item.text}
            </span>
          ))}

          <button
            onClick={() => {
              sound.playClink();
              confetti({
                particleCount: 60,
                spread: 70,
                origin: { y: 0.7 }
              });
            }}
            className="p-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-400 border border-stone-700 transition-colors cursor-pointer"
            title="Чокнемся за победу!"
          >
            <Sparkles className="w-5 h-5" />
          </button>
        </div>

        {/* Milestone Goal Tracker */}
        <div className="flex-1 max-w-md bg-stone-900 p-3 rounded-xl border border-stone-800">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-stone-300 font-medium flex items-center gap-1.5">
              <span>{nextMilestone.icon}</span>
              <span>Цель: {nextMilestone.title}</span>
            </span>
            <span className="text-amber-400 font-bold tabular-nums">
              {likes} / {nextMilestone.likesRequired}
            </span>
          </div>

          <div className="w-full h-2.5 bg-stone-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-rose-500 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <p className="text-[11px] text-stone-400 mt-1 italic line-clamp-1">
            {nextMilestone.description}
          </p>
        </div>
      </div>
    </div>
  );
};
