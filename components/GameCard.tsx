'use client';

import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { Game } from '../lib/data';
import { useI18n } from './I18nContext';
import { usePlays } from './usePlays';

interface GameCardProps {
  game: Game;
  size?: 'normal' | 'large' | 'wide' | 'tall';
}

const GameCard = React.memo(function GameCard({ game, size = 'normal' }: GameCardProps) {
  const { t } = useI18n();
  const plays = usePlays(game.id);

  let sizeClass = '';
  if (size === 'large') sizeClass = 'game-card--large';
  if (size === 'wide') sizeClass = 'game-card--wide';
  if (size === 'tall') sizeClass = 'game-card--tall';

  return (
    <Link href={`/game/${game.id}`} className={`game-card ${sizeClass}`}>
      <Image src={game.thumbnail || '/images/logo/PixelGamezLogoNoBackround.png'} alt="" className="game-card__image" fill sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 15vw" loading="lazy" style={{ objectFit: 'cover' }} />
      <div className="game-card__overlay">
        <span className="game-card__title">
          {(() => {
            const translated = t(`game_${game.id}_title`);
            return translated === `game_${game.id}_title` ? game.title : translated;
          })()}
        </span>
        <span className="game-card__plays" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: '#cbd5e1', marginTop: '4px' }}>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
          {plays !== null ? new Intl.NumberFormat('en-US', { notation: "compact", compactDisplay: "short", maximumFractionDigits: 1 }).format(plays) : '...'}
        </span>
      </div>
      {(() => {
        const computedTags: string[] = [];
        
        if (game.tags.includes('new')) {
          computedTags.push('new');
        }
        
        const currentPlays = plays !== null ? plays : game.plays;
        if (currentPlays > 100000 || game.tags.includes('popular')) {
          if (!computedTags.includes('popular')) computedTags.push('popular');
        }

        for (const tag of game.tags) {
          if (computedTags.length >= 2) break;
          if (tag !== 'new' && tag !== 'popular' && !computedTags.includes(tag)) {
            computedTags.push(tag);
          }
        }
        
        if (computedTags.length === 0) {
          computedTags.push(game.category);
        }

        const finalTags = computedTags.slice(0, 2);

        return finalTags.length > 0 ? (
          <div className="game-card__badges" suppressHydrationWarning>
            {finalTags.map(tag => (
              <span key={tag} className={`game-card__badge game-card__badge--${tag.toLowerCase()}`}>
                {t(tag) || tag}
              </span>
            ))}
          </div>
        ) : null;
      })()}
    </Link>
  );
});

export default GameCard;
