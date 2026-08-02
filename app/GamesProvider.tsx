'use client';

import React, { useRef } from 'react';
import { Game, updateGames } from '../lib/data';

export default function GamesProvider({ children, initialGames }: { children: React.ReactNode, initialGames: Game[] }) {
  const initialized = useRef(false);
  
  if (!initialized.current && initialGames && initialGames.length > 0) {
    updateGames(initialGames);
    initialized.current = true;
  }

  return <>{children}</>;
}
