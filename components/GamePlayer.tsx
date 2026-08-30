'use client';

import { useState, useEffect, useCallback } from 'react';
import { Game } from '../lib/data';
import { useAuth } from './AuthContext';
import { useI18n } from './I18nContext';
import { usePlays } from './usePlays';

interface GamePlayerProps {
  game: Game;
  initialPlays?: number;
  initialLikes?: number;
  initialDislikes?: number;
}

export default function GamePlayer({ game, initialPlays, initialLikes, initialDislikes }: GamePlayerProps) {
  const { user, isLoggedIn, openAuthModal, toggleFavorite, addRecentGame } = useAuth();
  const { t } = useI18n();
  const plays = usePlays(game.id) ?? initialPlays ?? 0;
  const [likes, setLikes] = useState(initialLikes ?? 0);
  const [dislikes, setDislikes] = useState(initialDislikes ?? 0);
  const [userVote, setUserVote] = useState<'like' | 'dislike' | null>(null);
  const [isVoting, setIsVoting] = useState(false);
  const [isFaving, setIsFaving] = useState(false);

  const isFavorited = user?.favoriteGames?.includes(game.id) ?? false;

  useEffect(() => {
    if (isLoggedIn) {
      addRecentGame(game.id).catch(() => {});
    }
  }, [game.id, isLoggedIn, addRecentGame]);

  const handleFavorite = async () => {
    if (!isLoggedIn) { openAuthModal(); return; }
    if (isFaving) return;
    setIsFaving(true);
    await toggleFavorite(game.id, isFavorited ? 'remove' : 'add');
    setIsFaving(false);
  };

  const handleFullscreen = () => {
    const iframe = document.getElementById('game-iframe');
    if (iframe) {
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
      } else if ((iframe as any).webkitRequestFullscreen) {
        (iframe as any).webkitRequestFullscreen();
      } else if ((iframe as any).msRequestFullscreen) {
        (iframe as any).msRequestFullscreen();
      }
    }
  };

  const fetchVotes = useCallback(async () => {
    try {
      const res = await fetch(`/api/votes/${game.id}`, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setLikes(data.upvotes || 0);
        setDislikes(data.downvotes || 0);
      }
    } catch {
      
    }
  }, [game.id]);

  useEffect(() => {
    // Only fetch if initial wasn't provided (fallback)
    if (initialLikes === undefined) {
      fetchVotes();
    }
    
    fetch(`/api/games/${game.id}/play`, { method: 'POST' }).catch(() => {});
  }, [game.id, fetchVotes, initialLikes]);

  useEffect(() => {
    // Attempt to fetch actual user vote from backend
    if (isLoggedIn) {
      fetch(`/api/votes/${game.id}/user`, { credentials: 'include' })
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          if (data && data.type) {
            const mappedVote = data.type === 'up' ? 'like' : 'dislike';
            setUserVote(mappedVote);
          }
        })
        .catch(() => {});
    }
  }, [game.id, isLoggedIn]);

  const handleVote = async (type: 'like' | 'dislike') => {
    if (!isLoggedIn) {
      openAuthModal();
      return;
    }
    if (isVoting) return;
    setIsVoting(true);
    
    const previousUserVote = userVote;

    try {
      if (userVote === type) {
        setUserVote(null);
        if (type === 'like') setLikes(l => Math.max(0, l - 1));
        if (type === 'dislike') setDislikes(d => Math.max(0, d - 1));

        try {
          const res = await fetch(`/api/votes/${game.id}`, {
            method: 'DELETE',
            credentials: 'include',
          });
          if (!res.ok && res.status !== 400) {
            throw new Error('Failed to remove vote from API');
          }
        } catch {
          // Revert optimistic update
          setUserVote(type);
          if (type === 'like') setLikes(l => l + 1);
          if (type === 'dislike') setDislikes(d => d + 1);
        }
      } else {
        setUserVote(type);
        if (type === 'like') {
            setLikes(l => l + 1);
            if (previousUserVote === 'dislike') setDislikes(d => Math.max(0, d - 1));
        } else {
            setDislikes(d => d + 1);
            if (previousUserVote === 'like') setLikes(l => Math.max(0, l - 1));
        }

        try {
          const res = await fetch(`/api/votes/${game.id}`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: type === 'like' ? 'up' : 'down' }),
          });
          if (!res.ok && res.status !== 400 && res.status !== 409) {
            throw new Error('Failed to add vote via API');
          }
        } catch {
          // Revert optimistic update
          setUserVote(previousUserVote);
          if (type === 'like') {
              setLikes(l => Math.max(0, l - 1));
              if (previousUserVote === 'dislike') setDislikes(d => d + 1);
          } else {
              setDislikes(d => Math.max(0, d - 1));
              if (previousUserVote === 'like') setLikes(l => l + 1);
          }
        }
      }
    } catch (e) {
      console.error('Vote failed:', e);
    } finally {
      setIsVoting(false);
    }
  };

  return (
    <div className="game-player animate-scale-in">
      <div className="game-player__embed-wrapper" style={{ overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {(() => {
          let finalSrc = game.embedUrl;
          let isItch = false;
          const isHtml = finalSrc.trim().startsWith('<');

          if (!isHtml) {
            const itchZoneMatch = game.embedUrl.match(/itch\.zone\/html\/(\d+)/);
            if (itchZoneMatch) {
              finalSrc = `https://itch.io/embed-upload/${itchZoneMatch[1]}?color=000000`;
              isItch = true;
            } else if (game.embedUrl.includes('itch.io')) {
              isItch = true;
            }
          }

          if (isHtml) {
            return (
              <iframe
                id="game-iframe"
                className="game-player__iframe"
                srcDoc={finalSrc}
                frameBorder="0"
                scrolling="no"
                allow="autoplay; fullscreen; gamepad"
                allowFullScreen
                style={{ width: '100%', height: '100%', border: 'none' }}
              ></iframe>
            );
          }

          return (
            <iframe
              id="game-iframe"
              className="game-player__iframe"
              src={finalSrc}
              frameBorder="0"
              scrolling="no"
              allow="autoplay; fullscreen; gamepad"
              allowFullScreen
              referrerPolicy={isItch ? "no-referrer" : undefined}
              style={{ width: '100%', height: '100%' }}
            ></iframe>
          );
        })()}
      </div>

      <div className="game-player__controls">
        <div className="game-player__info">
          <h1 className="game-player__title">
            {(() => {
              const translated = t(`game_${game.id}_title`);
              return translated === `game_${game.id}_title` ? game.title : translated;
            })()}
          </h1>
            <div className="game-player__tags" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span className="game-player__plays" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.9rem', color: '#94a3b8', fontWeight: 500 }}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
                {new Intl.NumberFormat('en-US', { notation: "compact", compactDisplay: "short", maximumFractionDigits: 1 }).format(plays ?? 0)} Plays
              </span>
              {game.tags.map(tag => (
                <span key={tag} className={`game-player__tag game-player__tag--${tag}`}>{t(tag) || tag}</span>
              ))}
            </div>
        </div>

        <div className="game-player__actions">
          <div className="game-player__votes">
            <button
              className={`game-player__btn game-player__btn--vote ${userVote === 'like' ? 'active' : ''}`}
              style={userVote === 'like' ? { borderColor: '#10b981', boxShadow: '0 0 8px rgba(16, 185, 129, 0.4)', color: '#10b981' } : {}}
              onClick={() => handleVote('like')}
              disabled={isVoting}
              title={!isLoggedIn ? 'Sign in to vote' : undefined}
            >
              <span className="icon"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg></span> {likes}
            </button>
            <button
              className={`game-player__btn game-player__btn--vote ${userVote === 'dislike' ? 'active' : ''}`}
              style={userVote === 'dislike' ? { borderColor: '#ef4444', boxShadow: '0 0 8px rgba(239, 68, 68, 0.4)', color: '#ef4444' } : {}}
              onClick={() => handleVote('dislike')}
              disabled={isVoting}
              title={!isLoggedIn ? 'Sign in to vote' : undefined}
            >
              <span className="icon"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"></path></svg></span> {dislikes}
            </button>
          </div>
          <button
            className={`game-player__btn game-player__btn--fav ${isFavorited ? 'active' : ''}`}
            style={isFavorited ? { borderColor: '#ef4444', boxShadow: '0 0 8px rgba(239, 68, 68, 0.4)', color: '#ef4444' } : {}}
            onClick={handleFavorite}
            disabled={isFaving}
            title={!isLoggedIn ? 'Sign in to favorite' : isFavorited ? 'Remove from favorites' : 'Add to favorites'}
          >
            <span className="icon">
              {isFavorited ? (
                <svg viewBox="0 0 24 24" width="16" height="16" fill="#ef4444" stroke="#ef4444" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              ) : (
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              )}
            </span> {isFavorited ? 'Favorited' : 'Favorite'}
          </button>
          <button
            className="game-player__btn"
            onClick={handleFullscreen}
            title="Fullscreen (100%)"
          >
            <span className="icon">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>
            </span> Fullscreen
          </button>
        </div>
      </div>
    </div>
  );
}
