import { getGameById, getRelatedGames } from '../../../lib/data';
import GamePlayer from '../../../components/GamePlayer';
import GameGrid from '../../../components/GameGrid';
import GameCard from '../../../components/GameCard';
import AdSlot from '../../../components/AdSlot';
import JsonLd from '../../../components/JsonLd';
import { notFound } from 'next/navigation';
import * as fs from 'fs';
import * as path from 'path';
import { Metadata } from 'next';
import { prisma } from '../../../lib/prisma';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  let game = getGameById(id) as any;
  let seoTitle = 'Game Not Found';
  let seoDescription = '';

  try {
    const { fetchWithCache } = require('../../../lib/cache');
    const dbGame = await fetchWithCache(`game_meta_${id}`, async () => {
      return prisma.game.findUnique({ where: { id }, select: { title: true, description: true } });
    }, 60);
    if (game) {
      seoTitle = `${game.title} - Play Free on PixelGamez`;
      seoDescription = dbGame?.description || game.description;
    } else if (dbGame) {
      seoTitle = `${dbGame.title} - Play Free on PixelGamez`;
      seoDescription = dbGame.description;
    }
  } catch (e) {
    if (game) {
      seoTitle = `${game.title} - Play Free on PixelGamez`;
      seoDescription = game.description;
    }
  }

  return {
    title: seoTitle,
    description: seoDescription,
  };
}

const manualMap: Record<string, string> = {
  'gartic-phone-io': 'GarticPhone.txt',
  'johny-trigger': 'JohnnyTrigger.txt',
  'johny-revenge': 'JohnnyRevenge.txt',
  'moto-x3m-3-pool-party': 'MotoX3M5.txt',
  'moto-x3m-two': 'MotoX3M2.txt',
  'moto-x3m-4-winter': 'MotoX3M4.txt',
  'moto-x3m-6-spooky-land': 'MotoX3M6.txt',
  'worldguessr': 'WorldGuesser.txt',
  'slope-2-players': 'Slope2Player.txt',
  'smash-karts-io': 'SmashKarts.txt',
  'smashkarts-io': 'SmashKarts.txt',
};

function parseMarkdown(md: string): string {
  // Convert headers (## Header)
  let html = md.replace(/^## (.*$)/gim, '<h2 class="game-description__section-title">$1</h2>');
  html = html.replace(/^### (.*$)/gim, '<h3 class="game-description__subsection-title">$1</h3>');
  html = html.replace(/^# (.*$)/gim, '<h2 class="game-description__title">$1</h2>');

  // Convert bold (**text**)
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // Convert lists (bullet points)
  const lines = html.split('\n');
  let inList = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('- ') || line.startsWith('* ')) {
      const content = line.substring(2);
      if (!inList) {
        lines[i] = '<ul class="game-description__list">\n<li>' + content + '</li>';
        inList = true;
      } else {
        lines[i] = '<li>' + content + '</li>';
      }
    } else {
      if (inList) {
        lines[i - 1] = lines[i - 1] + '\n</ul>';
        inList = false;
      }
      if (line && !line.startsWith('<h') && !line.startsWith('<ul') && !line.startsWith('<li')) {
        lines[i] = '<p class="game-description__paragraph">' + line + '</p>';
      }
    }
  }
  if (inList) {
    lines[lines.length - 1] = lines[lines.length - 1] + '\n</ul>';
  }

  return lines.join('\n');
}

async function loadDescription(gameId: string, gameTitle: string): Promise<string | null> {
  try {
    const publicDir = path.join(process.cwd(), 'public');
    let targetFilename = manualMap[gameId];

    if (!targetFilename) {
      // Try to find a direct match in public folder
      const files = await fs.promises.readdir(publicDir);
      const txtFiles = files.filter(f => f.endsWith('.txt'));

      const cleanString = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
      const cleanedId = cleanString(gameId);
      const cleanedTitle = cleanString(gameTitle);

      for (const file of txtFiles) {
        const cleanedFile = cleanString(path.basename(file, '.txt'));
        if (cleanedFile === cleanedId || cleanedFile === cleanedTitle) {
          targetFilename = file;
          break;
        }
      }
    }

    if (targetFilename) {
      const filePath = path.join(publicDir, targetFilename);
      const content = await fs.promises.readFile(filePath, 'utf8');
      return parseMarkdown(content);
    }
  } catch (err) {
    console.error(`Failed to load description for ${gameId}:`, err);
  }
  return null;
}

export default async function GamePage({ params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    let gameData: any = getGameById(id);

    let initialLikes = 0;
    let initialDislikes = 0;
    let initialPlays = 0;

    let dbGame = null;
    let likesCount = 0;
    let dislikesCount = 0;

    try {
      const { fetchWithCache } = require('../../../lib/cache');
      const stats = await fetchWithCache(`game_stats_${id}`, async () => {
        const [game, likes, dislikes] = await Promise.all([
          prisma.game.findUnique({ where: { id } }),
          prisma.vote.count({ where: { gameId: id, type: 'up' } }),
          prisma.vote.count({ where: { gameId: id, type: 'down' } })
        ]);
        return { game, likes, dislikes };
      }, 5);

      dbGame = stats.game;
      initialLikes = stats.likes;
      initialDislikes = stats.dislikes;

      if (!gameData && dbGame) {
        gameData = {
          id: dbGame.id,
          title: dbGame.title,
          description: dbGame.description,
          category: dbGame.category,
          tags: [], 
          thumbnail: dbGame.thumbnail || '',
          embedUrl: dbGame.embedUrl,
          rating: 0, 
          plays: dbGame.plays,
          discordUrl: dbGame.discordUrl || undefined,
          steamUrl: dbGame.steamUrl || undefined,
          itchUrl: dbGame.itchUrl || undefined,
          twitterUrl: dbGame.twitterUrl || undefined,
          videoUrl: dbGame.videoUrl || undefined,
          downloadUrl: dbGame.downloadUrl || undefined,
          developerLink: dbGame.developerLink || undefined,
          developerName: dbGame.developerName || undefined,
        };
      } else if (gameData) {
        gameData = { ...gameData };
        if (dbGame) {
          initialPlays = dbGame.plays;
          if (dbGame.discordUrl) gameData.discordUrl = dbGame.discordUrl;
          if (dbGame.steamUrl) gameData.steamUrl = dbGame.steamUrl;
          if (dbGame.itchUrl) gameData.itchUrl = dbGame.itchUrl;
          if (dbGame.twitterUrl) gameData.twitterUrl = dbGame.twitterUrl;
          if (dbGame.videoUrl) gameData.videoUrl = dbGame.videoUrl;
          if (dbGame.downloadUrl) gameData.downloadUrl = dbGame.downloadUrl;
          if (dbGame.developerLink) gameData.developerLink = dbGame.developerLink;
          if (dbGame.developerName) gameData.developerName = dbGame.developerName;
        }
      }
    } catch (err) {
      console.error('Failed to fetch initial stats', err);
    }

    if (!gameData) {
      notFound();
    }

    const detailedDescriptionHtml = await loadDescription(gameData.id, gameData.title);
    const relatedGames = getRelatedGames(gameData.id, 30);

    const videoGameSchema = {
      "@context": "https://schema.org",
      "@type": "VideoGame",
      "name": gameData.title,
      "description": gameData.description,
      "genre": gameData.category,
      "image": `https://www.pixelgamez.com${gameData.thumbnail}`,
      "playMode": "SinglePlayer", // Default, can be adjusted
      "applicationCategory": "Game",
      "operatingSystem": "WebBrowser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      },
      ...(initialLikes + initialDislikes > 0 && {
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": ((initialLikes / (initialLikes + initialDislikes)) * 5).toFixed(1),
          "ratingCount": initialLikes + initialDislikes,
          "bestRating": "5",
          "worstRating": "1"
        }
      })
    };

    return (
      <div className="game-page animate-fade-in">
        <JsonLd data={videoGameSchema} />
        <div className="game-player-fullwidth" style={{ width: '100%', marginBottom: '24px' }}>
          <GamePlayer
            game={gameData}
            initialLikes={initialLikes}
            initialDislikes={initialDislikes}
            initialPlays={initialPlays}
          />

          <div 
            className="game-player__description-container" 
            style={{ display: 'flex', flexDirection: 'column', gap: '24px', userSelect: 'none' }}
          >
            <div className="game-player__description-card" style={{ backgroundColor: 'var(--surface-color)', padding: '24px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <AdSlot placement="game-above" />
              <h2 style={{ marginBottom: '16px', fontSize: '1.5rem', fontWeight: 600 }}>About {gameData.title}</h2>
              {detailedDescriptionHtml ? (
                <div
                  className="game-player__detailed-desc"
                  dangerouslySetInnerHTML={{ __html: detailedDescriptionHtml }}
                />
              ) : (
                <p className="game-player__desc" style={{ color: 'var(--text-secondary)' }}>{gameData.description}</p>
              )}

              {(gameData.discordUrl || gameData.steamUrl || gameData.developerLink || gameData.itchUrl || gameData.twitterUrl || gameData.videoUrl || gameData.downloadUrl) && (
                <div className="game-player__links" style={{ display: 'flex', gap: '12px', marginTop: '16px', flexWrap: 'wrap' }}>
                  {gameData.discordUrl && (
                    <a href={gameData.discordUrl} target="_blank" rel="noopener noreferrer" className="game-player__btn" style={{ textDecoration: 'none' }}>
                      <span className="icon">💬</span> Discord
                    </a>
                  )}
                  {gameData.steamUrl && (
                    <a href={gameData.steamUrl} target="_blank" rel="noopener noreferrer" className="game-player__btn" style={{ textDecoration: 'none' }}>
                      <span className="icon">🎮</span> Steam
                    </a>
                  )}
                  {gameData.itchUrl && (
                    <a href={gameData.itchUrl} target="_blank" rel="noopener noreferrer" className="game-player__btn" style={{ textDecoration: 'none', backgroundColor: '#fa5c5c', color: '#fff' }}>
                      <span className="icon">🕹️</span> Itch.io
                    </a>
                  )}
                  {gameData.twitterUrl && (
                    <a href={gameData.twitterUrl} target="_blank" rel="noopener noreferrer" className="game-player__btn" style={{ textDecoration: 'none', backgroundColor: '#1DA1F2', color: '#fff' }}>
                      <span className="icon">🐦</span> Twitter
                    </a>
                  )}
                  {gameData.videoUrl && (
                    <a href={gameData.videoUrl} target="_blank" rel="noopener noreferrer" className="game-player__btn" style={{ textDecoration: 'none', backgroundColor: '#FF0000', color: '#fff' }}>
                      <span className="icon">▶️</span> Video Trailer
                    </a>
                  )}
                  {gameData.downloadUrl && (
                    <a href={gameData.downloadUrl} target="_blank" rel="noopener noreferrer" className="game-player__btn" style={{ textDecoration: 'none', backgroundColor: '#10B981', color: '#fff' }}>
                      <span className="icon">⬇️</span> Download Game
                    </a>
                  )}
                  {gameData.developerLink && (
                    <a href={gameData.developerLink} target="_blank" rel="noopener noreferrer" className="game-player__btn" style={{ textDecoration: 'none', backgroundColor: '#6D28D9', color: '#fff' }}>
                      <span className="icon">💖</span> Support Creator
                    </a>
                  )}
                </div>
              )}
            </div>
            <AdSlot placement="game-below" />
          </div>
        </div>

        <div className="game-layout-container">
          {relatedGames.length > 0 && (
            <aside className="game-side-content">
              <h3 className="side-title">Related Games</h3>
              <div className="side-grid">
                {relatedGames.slice(0, 12).map(g => (
                  <GameCard key={g.id} game={g} />
                ))}
              </div>
            </aside>
          )}
        </div>

        {relatedGames.length > 12 && (
          <GameGrid title="More Games You Might Like" games={relatedGames.slice(12, 30)} />
        )}
      </div>
    );
  } catch (error: any) {
    if (error && typeof error === 'object') {
      const isNotFound = error.message === 'NEXT_NOT_FOUND' || 
                         error.digest === 'NEXT_NOT_FOUND' || 
                         (error.message && error.message.includes('NEXT_HTTP_ERROR_FALLBACK'));
      if (isNotFound) {
        throw error;
      }
    }
    
    return (
      <div style={{ padding: '50px', color: 'white', background: 'red', borderRadius: '8px', margin: '20px' }}>
        <h1>Production Error Debug:</h1>
        <pre style={{ whiteSpace: 'pre-wrap' }}>{error.stack || error.message || String(error)}</pre>
      </div>
    );
  }
}
