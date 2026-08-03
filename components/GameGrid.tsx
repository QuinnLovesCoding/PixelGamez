import { Game } from '../lib/data';
import GameCard from './GameCard';
import Link from 'next/link';

interface GameGridProps {
  title: string;
  games: Game[];
  viewMoreLink?: string;
}

export default function GameGrid({ title, games, viewMoreLink }: GameGridProps) {
  if (games.length === 0) return null;

  return (
    <section className="game-grid-section">
      <div className="game-grid-header">
        <h2 className="game-grid-title">{title}</h2>
        {viewMoreLink && (
          <Link href={viewMoreLink} className="game-grid-view-more">
            View more
          </Link>
        )}
      </div>
      <div className="game-grid">
        {games.map((game, i) => {
          let size: 'normal' | 'large' | 'wide' | 'tall' = 'normal';
          // Deterministic pattern for CrazyGames style layout
          if (i === 0 || i === 8) size = 'large';
          else if (i === 3 || i === 11) size = 'wide';
          else if (i === 6) size = 'tall';

          return <GameCard key={game.id} game={game} size={size} />;
        })}
      </div>

    </section>
  );
}
