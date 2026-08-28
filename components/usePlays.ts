import { useState, useEffect } from 'react';

let cachedPlays: Record<string, number> | null = null;
if (typeof window !== 'undefined') {
  const ls = localStorage.getItem('pixelgamez_plays');
  if (ls) {
    try { cachedPlays = JSON.parse(ls); } catch {}
  }
}
let fetchPromise: Promise<Record<string, number>> | null = null;

export function usePlays(gameId: string) {
  const [plays, setPlays] = useState<number | null>(null);

  useEffect(() => {
    if (cachedPlays) {
      setPlays(cachedPlays[gameId] ?? 0);
    }

    if (!fetchPromise) {
      fetchPromise = fetch('/api/games/plays')
        .then(res => res.json())
        .then(data => {
          cachedPlays = data;
          if (typeof window !== 'undefined') {
            localStorage.setItem('pixelgamez_plays', JSON.stringify(data));
          }
          return data;
        })
        .catch(() => {
          return null;
        });
    }

    fetchPromise.then(data => {
      if (data === null) {
        setPlays(null);
      } else {
        setPlays(data[gameId] ?? 0);
      }
    });
  }, [gameId]);

  return plays;
}
