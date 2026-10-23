import React, { useState } from 'react';
import { Sparkles, Calculator, CheckCircle2, AlertCircle, HeartHandshake } from 'lucide-react';
import { sound } from '../utils/audio';

const PRESET_WISHES = [
  'Купить PlayStation 5 Pro для вечерних матчей',
  'Поехать на рыбалку с мужиками с ночёвкой на выходные',
  'Второй ящик пива и огромный таз картошки фри',
  'Купить новый спиннинг и комплект блесен',
  'Повесить в гостиной 75-дюймовый телевизор под футбол'
];

const SPOUSE_MOODS = [
  { id: 'zen', label: 'Спокойная, выпила утренний кофе', icon: '☕', bonus: 25 },
  { id: 'good', label: 'Смотрит любимый сериал с пледом', icon: '🍰', bonus: 15 },
  { id: 'neutral', label: 'Обычный рабочий вечер', icon: '📱', bonus: 0 },
  { id: 'socks', label: 'Заметила немытую кружку у компа', icon: '👀', bonus: -20 }
];

export const NegotiationSimulator: React.FC = () => {
  const [wish, setWish] = useState<string>(PRESET_WISHES[2]);
  const [customWish, setCustomWish] = useState<string>('');
  const [mood, setMood] = useState<string>('zen');
  const [result, setResult] = useState<{
    chance: number;
    approved: boolean;
    condition: string;
    quote: string;
  } | null>(null);

  const handleCalculate = () => {
    sound.playLikePop();
    const activeWish = customWish.trim() || wish;
    const moodObj = SPOUSE_MOODS.find((m) => m.id === mood) || SPOUSE_MOODS[0];

    // Base chance
    let baseChance = 50 + moodObj.bonus;
    if (activeWish.includes('картошки') || activeWish.includes('пива')) {
      baseChance += 15; // Viral bonus!
    }

    const finalChance = Math.min(99, Math.max(10, baseChance));
    const approved = finalChance >= 50;

    const conditions = [
      'Обязательно делить хрустящую картошку фри ровно пополам и не забирать последнюю!',
      'Сначала вынести мусор, помыть посуду и собрать ящик из IKEA.',
      'Набрать минимум 1 500 искренних лайков от мужиков в интернете для отчёта подругам.',
      'Один вечер полностью выделить под совместный просмотр романтической комедии.',
      'Купить к ящику пива ещё порцию её любимых сырных палочек с чесночным соусом.'
    ];

    const quotes = approved
      ? [
          '«Ладно, заслужил! Но картошку из фритюра я пробую первой!»',
          '«Договорились, сделка века одобрена! Только не шуми в гараже.»',
          '«Святые угодники, ну раз мужики поддержали — куда деваться, покупай!»'
        ]
      : [
          '«Хитрый какой! Сначала сделай генеральную уборку на кухне!»',
          '«Только через мой труп или через 10 000 лайков в интернете!»'
        ];

    setResult({
      chance: finalChance,
      approved,
      condition: conditions[Math.floor(Math.random() * conditions.length)],
      quote: quotes[Math.floor(Math.random() * quotes.length)]
    });
  };

  return (
    <section className="bg-stone-900/80 border border-stone-800 rounded-2xl p-5 sm:p-8 shadow-xl">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-2xl">🤝</span>
        <span className="text-xs uppercase font-extrabold tracking-wider px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
          Семейная Дипломатия
        </span>
      </div>
      <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
        Калькулятор Сделки с Женой: «Повтори Успех»
      </h2>
      <p className="text-stone-300 text-sm mb-6 max-w-2xl">
        Хотите проверить, согласится ли ваша половинка на ящик пива, приставку или рыбалку?
        Укажите ваше желание и её настроение — наш алгоритм рассчитает вероятность успеха!
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-4">
          {/* Wish Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-amber-300 mb-2">
              Ваше заветное желание:
            </label>
            <div className="space-y-1.5 mb-2">
              {PRESET_WISHES.map((w) => (
                <button
                  key={w}
                  onClick={() => {
                    setWish(w);
                    setCustomWish('');
                  }}
                  className={`w-full text-left text-xs p-2.5 rounded-lg border transition-all cursor-pointer ${
                    wish === w && !customWish
                      ? 'bg-amber-500/20 border-amber-400 text-white font-semibold'
                      : 'bg-stone-950/70 border-stone-800 text-stone-300 hover:bg-stone-850'
                  }`}
                >
                  {w}
                </button>
              ))}
            </div>

            <input
              type="text"
              placeholder="Или введите своё желание..."
              value={customWish}
              onChange={(e) => setCustomWish(e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg bg-stone-950 border border-stone-800 text-white placeholder-stone-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Spouse Mood */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-amber-300 mb-2">
              Текущее настроение жены:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SPOUSE_MOODS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMood(m.id)}
                  className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs text-left transition-all cursor-pointer ${
                    mood === m.id
                      ? 'bg-amber-500/20 border-amber-400 text-white font-semibold'
                      : 'bg-stone-950/70 border-stone-800 text-stone-300 hover:bg-stone-850'
                  }`}
                >
                  <span className="text-lg">{m.icon}</span>
                  <span className="line-clamp-1">{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Calculate button */}
          <button
            onClick={handleCalculate}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30 transition-all cursor-pointer active:scale-98"
          >
            <Calculator className="w-4 h-4" />
            <span>Рассчитать вероятность одобрения!</span>
          </button>
        </div>

        {/* Outcome Display */}
        <div className="bg-stone-950/80 rounded-xl border border-stone-800 p-5 flex flex-col justify-between">
          {result ? (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                <span className="text-xs font-bold text-stone-400 uppercase">
                  Шанс на успех:
                </span>
                <span
                  className={`text-2xl font-black ${
                    result.approved ? 'text-emerald-400' : 'text-amber-400'
                  }`}
                >
                  {result.chance}%
                </span>
              </div>

              {/* Progress visual */}
              <div className="w-full h-3 bg-stone-900 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    result.approved
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                      : 'bg-gradient-to-r from-amber-500 to-red-500'
                  }`}
                  style={{ width: `${result.chance}%` }}
                />
              </div>

              {/* Wife Quote */}
              <div className="bg-stone-900/90 p-4 rounded-xl border border-stone-800">
                <p className="text-xs text-stone-400 font-semibold mb-1 flex items-center gap-1.5">
                  <span>👩‍🦰</span> Вердикт жены:
                </p>
                <p className="text-sm text-stone-100 font-medium italic">
                  {result.quote}
                </p>
              </div>

              {/* Condition */}
              <div className="bg-amber-950/20 border border-amber-500/20 p-3.5 rounded-xl">
                <p className="text-xs text-amber-300 font-bold mb-1 flex items-center gap-1.5">
                  <HeartHandshake className="w-4 h-4 text-amber-400" />
                  Условие успешной сделки:
                </p>
                <p className="text-xs text-stone-300 leading-relaxed">
                  {result.condition}
                </p>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-500">
              <HeartHandshake className="w-12 h-12 text-stone-700 mb-3" />
              <p className="text-sm font-semibold text-stone-400 mb-1">
                Готовы к переговорам?
              </p>
              <p className="text-xs text-stone-500 max-w-xs">
                Выберите ваше желание слева и нажмите «Рассчитать», чтобы узнать вердикт и обязательные условия!
              </p>
            </div>
          )}

          <div className="mt-4 pt-3 border-t border-stone-800/60 text-[11px] text-stone-500 text-center">
            💡 Совет от бывалых: Всегда берите большую порцию картошки фри, иначе останетесь без своей!
          </div>
        </div>
      </div>
    </section>
  );
};
