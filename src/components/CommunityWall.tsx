import React, { useState } from 'react';
import { CommunityComment } from '../types';
import { INITIAL_COMMENTS, FUNNY_TOASTS } from '../data/mockData';
import { sound } from '../utils/audio';
import { Heart, MessageSquare, Send, Sparkles, Flame, User } from 'lucide-react';

interface CommunityWallProps {
  onAddCommentCount?: () => void;
}

const AVATAR_OPTIONS = ['🧔', '👨‍🦱', '🍟', '🍻', '😎', '🔧', '🚗', '👑', '🧑‍🍳'];

export const CommunityWall: React.FC<CommunityWallProps> = ({ onAddCommentCount }) => {
  const [comments, setComments] = useState<CommunityComment[]>(INITIAL_COMMENTS);
  const [authorName, setAuthorName] = useState('');
  const [newComment, setNewComment] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('🧔');

  const handleLikeComment = (id: string) => {
    sound.playLikePop();
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, likes: c.likes + 1 } : c))
    );
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    sound.playBeerOpen();

    const created: CommunityComment = {
      id: 'c_' + Date.now(),
      author: authorName.trim() || 'Брат_по_оружию',
      avatar: selectedAvatar,
      timeAgo: 'Только что',
      text: newComment.trim(),
      likes: 1,
      badge: 'Свежий тост',
      isCustom: true
    };

    setComments([created, ...comments]);
    setNewComment('');
    if (onAddCommentCount) onAddCommentCount();
  };

  const handlePickRandomToast = () => {
    sound.playLikePop();
    const rand = FUNNY_TOASTS[Math.floor(Math.random() * FUNNY_TOASTS.length)];
    setNewComment(rand);
  };

  return (
    <section className="bg-stone-900/80 border border-stone-800 rounded-2xl p-5 sm:p-8 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">💬</span>
            <span className="text-xs uppercase font-extrabold tracking-wider px-2.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
              Голос Народа
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Стена Братской Поддержки
          </h2>
          <p className="text-stone-300 text-sm mt-1">
            Те самые мужики, благодаря которым этот ящик пива и картошка стали реальностью!
          </p>
        </div>

        <button
          onClick={handlePickRandomToast}
          className="self-start sm:self-center flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-750 text-amber-300 text-xs font-semibold border border-stone-700 transition-colors cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Вставить случайный тост</span>
        </button>
      </div>

      {/* New Comment Input Form */}
      <form onSubmit={handlePostComment} className="bg-stone-950/70 p-4 rounded-xl border border-stone-800 mb-6">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <div className="flex items-center gap-1 bg-stone-900 px-2 py-1 rounded-lg border border-stone-800">
            <span className="text-xs text-stone-400 mr-1">Аватар:</span>
            {AVATAR_OPTIONS.slice(0, 5).map((av) => (
              <button
                key={av}
                type="button"
                onClick={() => setSelectedAvatar(av)}
                className={`w-6 h-6 rounded flex items-center justify-center text-sm cursor-pointer ${
                  selectedAvatar === av ? 'bg-amber-500 text-stone-950 scale-110 font-bold' : 'hover:bg-stone-800'
                }`}
              >
                {av}
              </button>
            ))}
          </div>

          <input
            type="text"
            placeholder="Ваш никнейм (например, Толик_Автомеханик)..."
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="flex-1 min-w-[200px] text-xs p-2 rounded-lg bg-stone-900 border border-stone-800 text-white placeholder-stone-500 focus:outline-none focus:border-amber-400"
          />
        </div>

        <div className="flex gap-2">
          <textarea
            rows={2}
            placeholder="Напишите слова поддержки, поднимите тост или выразите респект картошке на фоне..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="flex-1 text-xs p-2.5 rounded-lg bg-stone-900 border border-stone-800 text-white placeholder-stone-500 focus:outline-none focus:border-amber-400 resize-none"
          />
          <button
            type="submit"
            disabled={!newComment.trim()}
            className="px-4 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed text-stone-950 font-bold text-xs flex items-center justify-center gap-1 transition-all cursor-pointer shadow-md"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Отправить</span>
          </button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-3">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className={`p-4 rounded-xl border transition-all ${
              comment.isCustom
                ? 'bg-amber-950/20 border-amber-500/40 shadow-md'
                : 'bg-stone-950/50 border-stone-800/80 hover:border-stone-700'
            }`}
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-stone-800 border border-stone-700 flex items-center justify-center text-lg">
                  {comment.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-white text-xs sm:text-sm">
                      {comment.author}
                    </span>
                    {comment.badge && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 font-semibold">
                        {comment.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-stone-500">{comment.timeAgo}</span>
                </div>
              </div>

              {/* Comment Like button */}
              <button
                onClick={() => handleLikeComment(comment.id)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-800 text-xs text-stone-300 hover:text-rose-400 transition-colors cursor-pointer"
              >
                <Heart className="w-3.5 h-3.5 fill-rose-500/20 text-rose-400" />
                <span className="tabular-nums font-semibold">{comment.likes}</span>
              </button>
            </div>

            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed pl-10">
              {comment.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
