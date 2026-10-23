/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ViralPostCard } from './components/ViralPostCard';
import { FriesLoverSection } from './components/FriesLoverSection';
import { BeerCrateSection } from './components/BeerCrateSection';
import { NegotiationSimulator } from './components/NegotiationSimulator';
import { CommunityWall } from './components/CommunityWall';
import { CertificateModal } from './components/CertificateModal';
import { INITIAL_BEERS, MILESTONES } from './data/mockData';
import { sound } from './utils/audio';
import confetti from 'canvas-confetti';
import { Beer, Heart, Sparkles, Trophy } from 'lucide-react';

export default function App() {
  const [likes, setLikes] = useState<number>(1482);
  const [beers, setBeers] = useState(INITIAL_BEERS);
  const [friesEaten, setFriesEaten] = useState<number>(8);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [showCertificate, setShowCertificate] = useState<boolean>(false);
  const [milestones, setMilestones] = useState(MILESTONES);

  const openedBeersCount = beers.filter((b) => b.opened).length;

  const handleToggleSound = () => {
    sound.enabled = !soundEnabled;
    setSoundEnabled(!soundEnabled);
  };

  const handleLike = () => {
    const nextLikes = likes + 1;
    setLikes(nextLikes);

    // Check if new milestone reached
    milestones.forEach((m) => {
      if (!m.unlocked && nextLikes >= m.likesRequired) {
        sound.playFanfare();
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
        setMilestones((prev) =>
          prev.map((item) =>
            item.likesRequired === m.likesRequired ? { ...item, unlocked: true } : item
          )
        );
      }
    });
  };

  const handleOpenBeer = (id: number) => {
    setBeers((prev) =>
      prev.map((b) => (b.id === id ? { ...b, opened: true } : b))
    );
  };

  const handleOpenAllBeers = () => {
    setBeers((prev) => prev.map((b) => ({ ...b, opened: true })));
  };

  const handleEatFry = () => {
    setFriesEaten((prev) => prev + 1);
  };

  const handleFocusFries = () => {
    const el = document.getElementById('fries-station');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col selection:bg-amber-500 selection:text-stone-950 font-sans">
      {/* Top Navbar */}
      <Navbar
        likes={likes}
        openedBeers={openedBeersCount}
        totalBeers={beers.length}
        friesEaten={friesEaten}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onOpenCertificate={() => setShowCertificate(true)}
      />

      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-b from-amber-950/20 via-stone-950 to-stone-950 border-b border-stone-900 py-8 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Хит интернета: Пацан сказал — народ лайкнул — жена купила!</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-3">
            Ящик Пива и <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-300">Та Самая Картошка Фри</span> 🤤
          </h1>

          <p className="text-stone-400 text-sm sm:text-base max-w-2xl mx-auto">
            Интерактивный клуб легендарной семейной сделки. Поддерживайте мужика лайками, открывайте крафтовое пиво, дегустируйте хрустящую картошечку на фоне и рассчитывайте свои сделки!
          </p>
        </div>
      </div>

      {/* Main Content Sections */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-10 flex-1 w-full">
        {/* 1. Viral Post with Photo Proofs and Like Button */}
        <ViralPostCard
          likes={likes}
          onLike={handleLike}
          milestones={milestones}
          onFocusFries={handleFocusFries}
        />

        {/* 2. Interactive Crispy Fries Station */}
        <FriesLoverSection
          friesEaten={friesEaten}
          onEatFry={handleEatFry}
        />

        {/* 3. The 12-Bottle Beer Crate */}
        <BeerCrateSection
          beers={beers}
          onOpenBeer={handleOpenBeer}
          onOpenAllBeers={handleOpenAllBeers}
        />

        {/* 4. Negotiation Simulator */}
        <NegotiationSimulator />

        {/* 5. Community Wall */}
        <CommunityWall />
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-800/80 bg-stone-950 py-8 px-4 text-center text-xs text-stone-500 mt-12">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="flex items-center gap-1.5">
            <span>Сделано с любовью к мужской солидарности и золотым жёнам</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </p>
          <p className="text-stone-400">
            «Ни одна порция картошки фри не пострадала зря!» 🍟🍺
          </p>
        </div>
      </footer>

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={showCertificate}
        onClose={() => setShowCertificate(false)}
        likes={likes}
        openedBeers={openedBeersCount}
        friesEaten={friesEaten}
      />
    </div>
  );
}
