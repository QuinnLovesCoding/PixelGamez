export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface Game {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  thumbnail: string;
  embedUrl: string;
  rating: number;
  plays: number;
  discordUrl?: string;
  originalUrl?: string;
  developerLink?: string;
  developerName?: string;
  steamUrl?: string;
  itchUrl?: string;
  twitterUrl?: string;
  videoUrl?: string;
  downloadUrl?: string;
  createdAt?: string;
}

export interface Submission {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  embedUrl: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  plays: number;
  rating: number;
  tags: string[];
  discordUrl?: string;
  originalUrl?: string;
  developerLink?: string;
  developerName?: string;
  steamUrl?: string;
}

export const categories: Category[] = [
  { id: 'action', name: 'Action', icon: 'action' },

  { id: 'arcade', name: 'Arcade', icon: 'arcade' },
  { id: 'clicker', name: 'Clicker', icon: 'clicker' },
  { id: 'driving', name: 'Driving', icon: 'driving' },
  { id: 'io', name: '.io', icon: 'io' },
  { id: 'puzzle', name: 'Puzzle', icon: 'puzzle' },
  { id: 'shooting', name: 'Shooting', icon: 'shooting' },
  { id: 'simulation', name: 'Simulation', icon: 'simulation' },
  { id: 'sports', name: 'Sports', icon: 'sports' },
];


const categoryColors: Record<string, { bg: string; fg: string }> = {
  action:     { bg: 'DC2626', fg: 'FECACA' },
  adventure:  { bg: '7C3AED', fg: 'DDD6FE' },
  arcade:     { bg: '2563EB', fg: 'BFDBFE' },
  board:      { bg: '92400E', fg: 'FDE68A' },
  card:       { bg: '065F46', fg: 'A7F3D0' },
  clicker:    { bg: 'DB2777', fg: 'FBCFE8' },
  driving:    { bg: 'EA580C', fg: 'FED7AA' },
  io:         { bg: '0891B2', fg: 'CFFAFE' },
  puzzle:     { bg: '4F46E5', fg: 'C7D2FE' },
  shooting:   { bg: '991B1B', fg: 'FECACA' },
  simulation: { bg: '15803D', fg: 'BBF7D0' },
  sports:     { bg: '1D4ED8', fg: 'BFDBFE' },
};

function makeThumbnail(title: string, category: string): string {
  const colors = categoryColors[category] || { bg: '1A1B28', fg: 'A78BFA' };
  return `https://placehold.co/400x225/${colors.bg}/${colors.fg}?text=${encodeURIComponent(title)}&font=raleway`;
}

const EMBED_BASE = '/placeholder.html';

function makeEmbed(seed: string): string {
  return `${EMBED_BASE}?seed=${seed}`;
}




export const games: Game[] = [
  { id: 'tennis-physics', title: 'Tennis Physics', description: 'A fun and chaotic 2-player tennis game with wacky physics.', category: 'sports', tags: ['action'], thumbnail: '/images/games/sports/tennis-physics.png', embedUrl: 'https://www.twoplayergames.org/embed/tennis-physics', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
  { id: 'soccer-physics', title: 'Soccer Physics', description: 'Experience the hilarity of 1-button soccer with ridiculous physics.', category: 'sports', tags: ['action', 'popular'], thumbnail: '/images/soccer-physics.png', embedUrl: 'https://www.twoplayergames.org/embed/soccer-physics', rating: 4.7, plays: 38, createdAt: '2026-06-13T23:22:41.028Z' },
  { id: 'soccer-physics-2', title: 'Soccer Physics 2', description: 'The sequel to the crazy 1-button soccer game with more wacky physics.', category: 'sports', tags: ['action'], thumbnail: '/images/games/sports/soccer-physics-2.png', embedUrl: 'https://www.twoplayergames.org/embed/soccer-physics-2', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
  { id: 'dino-game', title: 'Dino Game', description: 'The classic endless runner featuring the T-Rex.', category: 'arcade', tags: ['popular'], thumbnail: '/images/DinoGame.webp', embedUrl: 'https://www.twoplayergames.org/embed/dino-game', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
  { id: 'pixel-battles', title: 'Pixel Battles', description: 'Intense pixelated battles for 2 players. Outsmart and outshoot your opponent!', category: 'action', tags: ['arcade'], thumbnail: '/images/PixelBattles.jpeg', embedUrl: 'https://www.twoplayergames.org/embed/pixel-battles', rating: 0, plays: 12, createdAt: '2026-06-13T23:22:41.028Z' },
  { id: 'pixel-kart', title: 'Pixel Kart', description: 'Retro 2D go-kart racing. Drift, boost, and win!', category: 'driving', tags: ['arcade'], thumbnail: '/images/PixelKart.webp', embedUrl: 'https://www.twoplayergames.org/embed/pixel-kart', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
  { id: 'helifight', title: 'HeliFight', description: 'Control a helicopter and try to take down your opponent in this 2-player aerial battle.', category: 'action', tags: ['arcade'], thumbnail: '/images/HeliFight.jfif', embedUrl: 'https://www.twoplayergames.org/embed/helifight', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
  
  { id: 'mope-io', title: 'Mope.io', description: 'Survive and climb the food chain in this fun multiplayer animal evolution game.', category: 'io', tags: ['popular', 'action'], thumbnail: '/images/games/io/mope-io.png', embedUrl: 'https://mope.io/', rating: 0, plays: 11, createdAt: '2026-06-13T23:22:41.028Z' },
  
  
  { id: 'basket-random', title: 'Basket Random', description: 'A fun, chaotic, and completely random physics-based basketball game!', category: 'sports', tags: ['new', 'popular'], thumbnail: '/images/games/sports/basket-random.png', embedUrl: 'https://unblockedgames66.gitlab.io/basket-random/', rating: 0, plays: 11, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'boxing-random', title: 'Boxing Random', description: 'A fun, chaotic, and completely random physics-based boxing game.', category: 'sports', tags: ['new', 'popular', 'action'], thumbnail: '/images/games/sports/boxing-random.png', embedUrl: 'https://unblockedgames66.gitlab.io/boxing-random/', rating: 0, plays: 14, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'basketball-legends', title: 'Basketball Legends', description: 'A fun, chaotic, and completely random physics-based basketball game.', category: 'sports', tags: ['new', 'popular', 'action'], thumbnail: '/images/games/sports/basketball-legends.png', embedUrl: 'https://unblockedgames66.gitlab.io/basketball-legends/', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'soccer-random', title: 'Soccer Random', description: 'Experience soccer like never before in this completely unpredictable, physics-based soccer game!', category: 'sports', tags: ['new', 'popular', 'action'], thumbnail: '/images/games/sports/soccer-random.png', embedUrl: 'https://unblockedgames66.gitlab.io/soccer-random/', rating: 0, plays: 10, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'rooftop-snipers', title: 'Rooftop Snipers', description: 'A chaotic two-button sniper game. Try to shoot your opponent off the roof!', category: 'shooting', tags: ['popular', 'action'], thumbnail: '/images/games/shooting/rooftop-snipers.png', embedUrl: 'https://unblockedgames66.gitlab.io/rooftop-snipers/', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
  { id: 'rooftop-snipers-2', title: 'Rooftop Snipers 2', description: 'The sequel to the classic! More chaos, more weapons, more fun!', category: 'shooting', tags: ['new', 'action'], thumbnail: '/images/games/shooting/rooftop-snipers-2.png', embedUrl: 'https://unblockedgames66.gitlab.io/rooftop-snipers-2/', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'volley-random', title: 'Volley Random', description: 'Physics-based volleyball madness. Expect the unexpected in every serve!', category: 'sports', tags: ['new', 'popular'], thumbnail: '/images/games/sports/volley-random.png', embedUrl: 'https://unblockedgames66.gitlab.io/volley-random/', rating: 0, plays: 2, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'raft-wars-2', title: 'Raft Wars 2', description: 'Infiltrate the water park and find your buried treasure in this hilarious sequel!', category: 'shooting', tags: ['action', 'popular'], thumbnail: '/images/games/shooting/raft-wars-2.png', embedUrl: 'https://unblockedgames66.gitlab.io/raft-wars-2/', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
  { id: 'boxing-physics-2', title: 'Boxing Physics 2', description: 'Experience the craziest boxing matches with bizarre physics and characters.', category: 'sports', tags: ['action', 'new'], thumbnail: '/images/games/sports/boxing-physics-2.png', embedUrl: 'https://unblockedgames66.gitlab.io/boxing-physics-2/', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'royale-dudes', title: 'Royale Dudes', description: 'A fast-paced 2D multiplayer battle royale game. Loot, shoot, and survive!', category: 'io', tags: ['action', 'popular', 'new'], thumbnail: '/images/games/io/royale-dudes.png', embedUrl: 'https://unblockedgames66.gitlab.io/royale-dudes/', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'moto-x3m-3-pool-party', title: 'Moto X3M Pool Party', description: 'Take your dirt bike to the pool party! Perform stunts and avoid deadly traps.', category: 'driving', tags: ['action', 'popular'], thumbnail: '/images/games/driving/moto-x3m-3-pool-party.png', embedUrl: 'https://unblockedgames66.gitlab.io/moto-x3m-3-pool-party/', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
  { id: 'moto-x3m-6-spooky-land', title: 'Moto X3M Spooky Land', description: 'A terrifyingly fun dirt bike experience through a haunted landscape!', category: 'driving', tags: ['action', 'popular'], thumbnail: '/images/games/driving/moto-x3m-6-spooky-land.png', embedUrl: 'https://unblockedgames66.gitlab.io/moto-x3m-6-spooky-land/', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
  { id: 'moto-x3m-two', title: 'Moto X3M 2', description: 'The second installment of the legendary dirt bike racing series.', category: 'driving', tags: ['action'], thumbnail: '/images/games/driving/moto-x3m-two.png', embedUrl: 'https://unblockedgames66.gitlab.io/moto-x3m-two/', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
  { id: 'moto-x3m-4-winter', title: 'Moto X3M 4 Winter', description: 'Race your bike across icy mountains and festive tracks in this winter edition!', category: 'driving', tags: ['action', 'popular'], thumbnail: '/images/games/driving/moto-x3m-4-winter.png', embedUrl: 'https://unblockedgames66.gitlab.io/moto-x3m4-winter/', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
  { id: 'gartic-phone-io', title: 'Gartic Phone', description: 'The telephone game meets drawing! Hilarious fun with friends.', category: 'io', tags: ['popular', 'new'], thumbnail: '/images/games/io/gartic-phone-io.png', embedUrl: 'https://unblockedgames66.gitlab.io/gartic-phone-io/', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'crossy-road', title: 'Crossy Road', description: 'Why did the chicken cross the road? Find out in this classic endless hopper!', category: 'arcade', tags: ['popular'], thumbnail: '/images/games/arcade/crossy-road.png', embedUrl: 'https://unblockedgames66.gitlab.io/crossy-road/', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
  { id: 'bob-the-robber-2', title: 'Bob The Robber 2', description: 'Sneak past guards and cameras to steal the loot!', category: 'puzzle', tags: ['popular'], thumbnail: '/images/games/puzzle/bob-the-robber-2.png', embedUrl: 'https://unblockedgames66.gitlab.io/bob-the-robber-2/', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
  { id: 'drive-mad', title: 'Drive Mad', description: 'Physics-based driving game where you must reach the finish line in one piece.', category: 'driving', tags: ['popular'], thumbnail: '/images/games/driving/drive-mad.png', embedUrl: 'https://unblockedgames66.gitlab.io/drive-mad/', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
  { id: 'pixel-smash-duel', title: 'Pixel Smash Duel', description: 'Intense pixelated duels. Knock your opponent off the platform!', category: 'action', tags: ['action'], thumbnail: '/images/games/action/pixel-smash-duel.png', embedUrl: 'https://unblockedgames66.gitlab.io/pixel-smash-duel/', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
  { id: 'aquapark-io', title: 'Aquapark.io', description: 'Race down the massive water slide and knock others off!', category: 'io', tags: ['popular', 'action'], thumbnail: '/images/games/io/aquapark-io.png', embedUrl: 'https://unblockedgames66.gitlab.io/aquapark-io/', rating: 4.5, plays: 28, createdAt: '2026-06-13T23:22:41.028Z' },
  { id: 'hole-io', title: 'Hole.io', description: 'Consume everything in your path and become the biggest black hole!', category: 'io', tags: ['popular', 'action'], thumbnail: '/images/games/io/hole-io.png', embedUrl: 'https://unblockedgames66.gitlab.io/hole-io/', rating: 4.7, plays: 13, createdAt: '2026-06-13T23:22:41.028Z' },
  { id: 'idle-mining-empire', title: 'Idle Mining Empire', description: 'Manage your mining facilities and become an industrial tycoon.', category: 'clicker', tags: ['popular'], thumbnail: '/images/games/clicker/idle-mining-empire.png', embedUrl: 'https://unblockedgames66.gitlab.io/idle-mining-empire/', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
  { id: 'idle-breakout', title: 'Idle Breakout', description: 'Breakout meets idle clicking. Upgrade your balls to destroy blocks faster.', category: 'clicker', tags: ['popular'], thumbnail: '/images/games/clicker/idle-breakout.png', embedUrl: 'https://unblockedgames66.gitlab.io/idle-breakout/', rating: 4.6, plays: 21, createdAt: '2026-06-13T23:22:41.028Z' },
  { id: 'burger-clicker', title: 'Burger Clicker', description: 'Click to make burgers and build your fast food empire!', category: 'clicker', tags: [], thumbnail: '/images/games/clicker/burger-clicker.png', embedUrl: 'https://unblockedgames66.gitlab.io/burger-clicker/', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
  { id: 'idle-restaurants', title: 'Idle Restaurants', description: 'Manage and upgrade your restaurant business.', category: 'clicker', tags: [], thumbnail: '/images/games/clicker/idle-restaurants.png', embedUrl: 'https://unblockedgames66.gitlab.io/idle-restaurants/', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
  { id: 'flip-bottle', title: 'Flip Bottle', description: 'Can you master the bottle flip challenge?', category: 'arcade', tags: ['popular'], thumbnail: '/images/games/arcade/flip-bottle.png', embedUrl: 'https://unblockedgames66.gitlab.io/flip-bottle/', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
  { id: 'baldis-basics', title: 'Baldi\'s Basics', description: 'A surreal horror educational game. Collect 7 notebooks and escape!', category: 'adventure', tags: ['popular', 'action'], thumbnail: '/images/games/adventure/baldis-basics.png', embedUrl: 'https://unblockedgames66.gitlab.io/baldis-basics/', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
  { id: 'happy-wheels', title: 'Happy Wheels', description: 'A ragdoll physics-based platformer. Dodge deadly obstacles!', category: 'action', tags: ['popular'], thumbnail: '/images/games/action/happy-wheels.png', embedUrl: 'https://unblockedgames66.gitlab.io/happy-wheels/', rating: 4.8, plays: 49, createdAt: '2026-06-13T23:22:41.028Z' },
  { id: 'sausage-flip', title: 'Sausage Flip', description: 'Fling the sausage to the finish line in this weirdly fun physics game.', category: 'arcade', tags: [], thumbnail: '/images/games/arcade/sausage-flip.png', embedUrl: 'https://unblockedgames66.gitlab.io/sausage-flip/', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
  { id: 'slope-2-players', title: 'Slope 2 Players', description: 'Roll down the endless slope and compete with a friend!', category: 'arcade', tags: ['popular'], thumbnail: '/images/games/arcade/slope-2-players.png', embedUrl: 'https://unblockedgames66.gitlab.io/slope-2-players/', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
  { id: 'stack-bump-3d', title: 'Stack Bump 3D', description: 'Smash through the helix platforms and reach the bottom.', category: 'arcade', tags: [], thumbnail: '/images/games/arcade/stack-bump-3d.png', embedUrl: 'https://unblockedgames66.gitlab.io/stack-bump-3d/', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
  { id: 'snake-io', title: 'Snake.io', description: 'Slither your way to the top in this competitive multiplayer snake game.', category: 'io', tags: ['popular'], thumbnail: '/images/games/io/snake-io.png', embedUrl: 'https://unblockedgames66.gitlab.io/snake-io/', rating: 4.6, plays: 31, createdAt: '2026-06-13T23:22:41.028Z' },
  { id: 'smash-karts-io', title: 'Smash Karts', description: 'Multiplayer kart battle arena! Collect weapons and blow up your opponents.', category: 'io', tags: ['popular', 'action', 'driving'], thumbnail: '/images/games/io/smash-karts-io.png', embedUrl: 'https://unblockedgames66.gitlab.io/smash-karts-io/', rating: 4.8, plays: 34, createdAt: '2026-06-13T23:22:41.028Z' },
  
  { id: 'johny-revenge', title: 'Johnny Revenge', description: 'Flip, shoot, and take down the bad guys in slow motion.', category: 'shooting', tags: ['action'], thumbnail: '/images/games/shooting/johny-revenge.png', embedUrl: 'https://unblockedgames66.gitlab.io/johny-revenge/', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
  { id: 'johny-trigger', title: 'Johnny Trigger', description: 'More slow-motion shooting action as you clear out rooms of enemies.', category: 'shooting', tags: ['action', 'popular'], thumbnail: '/images/games/shooting/johny-trigger.png', embedUrl: 'https://unblockedgames66.gitlab.io/johny-trigger/', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
  { id: 'stickman-hook', title: 'Stickman Hook', description: 'Swing like Spider-Man through hundreds of challenging levels.', category: 'action', tags: ['popular'], thumbnail: '/images/games/action/stickman-hook.png', embedUrl: 'https://unblockedgames66.gitlab.io/stickman-hook/', rating: 4.8, plays: 39, createdAt: '2026-06-13T23:22:41.028Z' },
  
  { id: 'bloxd-io', title: 'Bloxd.io', description: 'A adventure game.', category: 'adventure', tags: ['popular', 'action'], thumbnail: '/images/games/adventure/bloxd-io.png', embedUrl: 'https://bloxd.io', rating: 4.7, plays: 15, createdAt: '2026-06-13T23:22:41.028Z' },
  
  { id: 'papas-pizzeria', title: 'Papa\'s Pizzeria', description: 'Run your own restaurant in Papa\'s Pizzeria and serve delicious food to your customers!', category: 'simulation', tags: ['simulation', 'casual'], thumbnail: '/images/PapasPizzeria.jfif', embedUrl: 'https://papaspizzeria.io/papas-pizzeria.embed', rating: 4.8, plays: 16, createdAt: '2026-06-13T23:22:41.028Z' },
  { id: 'papas-scooperia', title: 'Papa\'s Scooperia', description: 'Run your own restaurant in Papa\'s Scooperia and serve delicious food to your customers!', category: 'simulation', tags: ['simulation', 'casual'], thumbnail: '/images/PapasScooperia.jfif', embedUrl: 'https://papaspizzeria.io/papas-scooperia.embed', rating: 4.8, plays: 9, createdAt: '2026-06-13T23:22:41.028Z' },
  { id: 'papas-sushiria', title: 'Papa\'s Sushiria', description: 'Run your own restaurant in Papa\'s Sushiria and serve delicious food to your customers!', category: 'simulation', tags: ['simulation', 'casual'], thumbnail: '/images/PapasSushiria.jfif', embedUrl: 'https://papaspizzeria.io/papas-sushiria.embed', rating: 4.8, plays: 12, createdAt: '2026-06-13T23:22:41.028Z' },
  { id: 'papas-cheeseria', title: 'Papa\'s Cheeseria', description: 'Run your own restaurant in Papa\'s Cheeseria and serve delicious food to your customers!', category: 'simulation', tags: ['simulation', 'casual'], thumbnail: '/images/PapasCheeseria.jfif', embedUrl: 'https://papaspizzeria.io/papas-cheeseria.embed', rating: 4.8, plays: 10, createdAt: '2026-06-13T23:22:41.028Z' },
  { id: 'papas-wingeria', title: 'Papa\'s Wingeria', description: 'Run your own restaurant in Papa\'s Wingeria and serve delicious food to your customers!', category: 'simulation', tags: ['simulation', 'casual'], thumbnail: '/images/PapasWingeria.jfif', embedUrl: 'https://papaspizzeria.io/papas-wingeria.embed', rating: 4.8, plays: 9, createdAt: '2026-06-13T23:22:41.028Z' },
  { id: 'papas-cupcakeria', title: 'Papa\'s Cupcakeria', description: 'Run your own restaurant in Papa\'s Cupcakeria and serve delicious food to your customers!', category: 'simulation', tags: ['simulation', 'casual'], thumbnail: '/images/PapasCupcakeria.jfif', embedUrl: 'https://papaspizzeria.io/papas-cupcakeria.embed', rating: 4.8, plays: 12, createdAt: '2026-06-13T23:22:41.028Z' },
  { id: 'papas-pancakeria', title: 'Papa\'s Pancakeria', description: 'Run your own restaurant in Papa\'s Pancakeria and serve delicious food to your customers!', category: 'simulation', tags: ['simulation', 'casual'], thumbnail: '/images/PapasPancakeria.webp', embedUrl: 'https://papaspizzeria.io/papas-pancakeria.embed', rating: 4.8, plays: 12, createdAt: '2026-06-13T23:22:41.028Z' },
  { id: 'papas-freezeria', title: 'Papa\'s Freezeria', description: 'Run your own restaurant in Papa\'s Freezeria and serve delicious food to your customers!', category: 'simulation', tags: ['simulation', 'casual'], thumbnail: '/images/PapasFreezeria.jfif', embedUrl: 'https://papaspizzeria.io/papas-freezeria.embed', rating: 4.8, plays: 15, createdAt: '2026-06-13T23:22:41.028Z' },
  { id: 'papas-donuteria', title: 'Papa\'s Donuteria', description: 'Run your own restaurant in Papa\'s Donuteria and serve delicious food to your customers!', category: 'simulation', tags: ['simulation', 'casual'], thumbnail: '/images/PapasDonuteria.webp', embedUrl: 'https://papaspizzeria.io/papas-donuteria.embed', rating: 4.8, plays: 11, createdAt: '2026-06-13T23:22:41.028Z' },
  { id: 'papas-pastaria', title: 'Papa\'s Pastaria', description: 'Run your own restaurant in Papa\'s Pastaria and serve delicious food to your customers!', category: 'simulation', tags: ['simulation', 'casual'], thumbnail: '/images/PapasPastaria.webp', embedUrl: 'https://papaspizzeria.io/papas-pastaria.embed', rating: 4.8, plays: 10, createdAt: '2026-06-13T23:22:41.028Z' },
  { id: 'papas-burgeria', title: 'Papa\'s Burgeria', description: 'Run your own restaurant in Papa\'s Burgeria and serve delicious food to your customers!', category: 'simulation', tags: ['simulation', 'casual'], thumbnail: '/images/PapasBurgeria.webp', embedUrl: 'https://papaspizzeria.io/papas-burgeria.embed', rating: 4.8, plays: 17, createdAt: '2026-06-13T23:22:41.028Z' },
  { id: 'papas-hot-doggeria', title: 'Papa\'s Hot Doggeria', description: 'Run your own restaurant in Papa\'s Hot Doggeria and serve delicious food to your customers!', category: 'simulation', tags: ['simulation', 'casual'], thumbnail: '/images/PapasHotDoggeria.webp', embedUrl: 'https://papaspizzeria.io/papas-hot-doggeria.embed', rating: 4.8, plays: 15, createdAt: '2026-06-13T23:22:41.028Z' },
  { id: 'papas-bakeria', title: 'Papa\'s Bakeria', description: 'Run your own restaurant in Papa\'s Bakeria and serve delicious food to your customers!', category: 'simulation', tags: ['simulation', 'casual'], thumbnail: '/images/PapasBakeria.webp', embedUrl: 'https://papaspizzeria.io/papas-bakeria.embed', rating: 4.8, plays: 11, createdAt: '2026-06-13T23:22:41.028Z' },
  { id: 'level-devil', title: 'Level Devil', description: 'Level Devil is a challenging puzzle platformer with unexpected traps.', category: 'puzzle', tags: ['platformer', 'hard', 'funny'], thumbnail: '/images/games/puzzle/level-devil.png', embedUrl: 'https://leveldevil-trollgame.github.io/', rating: 0, plays: 0, createdAt: '2026-06-13T23:22:41.028Z' },
  { id: 'worldguessr', title: 'Worldguessr', description: 'Explore the world and guess your location in this free alternative to Geoguessr.', category: 'puzzle', tags: ['exploration', 'geography', 'multiplayer'], thumbnail: '/images/games/puzzle/worldguessr.png', embedUrl: 'https://www.worldguessr.com/', rating: 4.9, plays: 20, createdAt: '2026-06-13T23:22:41.028Z' },
  { id: 'snake-2048-io', title: 'Snake 2048.io', description: 'Play Snake 2048.io on PixelGamez.', category: 'io', tags: ['new', 'featured'], thumbnail: '/images/games/io/snake-2048-io.png', embedUrl: 'https://www.twoplayergames.org/embed/snake-2048-io', rating: 0, plays: 6, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'digit-shooter', title: 'Digit Shooter', description: 'Play Digit Shooter on PixelGamez.', category: 'arcade', tags: ['new', 'featured'], thumbnail: '/images/games/arcade/digit-shooter.png', embedUrl: 'https://www.twoplayergames.org/embed/digit-shooter', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'jelly-run-2048', title: 'Jelly Run 2048', description: 'Play Jelly Run 2048 on PixelGamez.', category: 'arcade', tags: ['new', 'featured'], thumbnail: '/images/games/arcade/jelly-run-2048.png', embedUrl: 'https://www.twoplayergames.org/embed/jelly-run-2048', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'bouncing-balls-2', title: 'Bouncing Balls 2', description: 'Play Bouncing Balls 2 on PixelGamez.', category: 'arcade', tags: ['new', 'featured'], thumbnail: '/images/games/arcade/bouncing-balls-2.png', embedUrl: 'https://www.twoplayergames.org/embed/bouncing-balls-2', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'bouncing-balls', title: 'Bouncing Balls', description: 'Play Bouncing Balls on PixelGamez.', category: 'arcade', tags: ['new'], thumbnail: '/images/games/arcade/bouncing-balls.png', embedUrl: 'https://www.twoplayergames.org/embed/bouncing-balls', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'going-balls', title: 'Going Balls', description: 'Play Going Balls on PixelGamez.', category: 'arcade', tags: ['new'], thumbnail: '/images/games/arcade/going-balls.png', embedUrl: 'https://www.twoplayergames.org/embed/going-balls', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'going-balls-2', title: 'Going Balls 2', description: 'Play Going Balls 2 on PixelGamez.', category: 'arcade', tags: ['new'], thumbnail: '/images/games/arcade/going-balls-2.png', embedUrl: 'https://www.twoplayergames.org/embed/going-balls-2', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
  
  { id: 'flip-master', title: 'Flip Master', description: 'Play Flip Master on PixelGamez.', category: 'sports', tags: ['new'], thumbnail: '/images/games/sports/flip-master.png', embedUrl: 'https://www.twoplayergames.org/embed/flip-master', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'flipper-master-3d', title: 'Flipper Master 3D', description: 'Play Flipper Master 3D on PixelGamez.', category: 'sports', tags: ['new'], thumbnail: '/images/games/sports/flipper-master-3d.png', embedUrl: 'https://www.twoplayergames.org/embed/flipper-master-3d', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'knife-storm', title: 'Knife Storm', description: 'Play Knife Storm on PixelGamez.', category: 'action', tags: ['new'], thumbnail: '/images/games/action/knife-storm.png', embedUrl: 'https://www.twoplayergames.org/embed/knife-storm', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'slice-it-all', title: 'Slice It All', description: 'Play Slice It All on PixelGamez.', category: 'action', tags: ['new'], thumbnail: '/images/games/action/slice-it-all.png', embedUrl: 'https://www.twoplayergames.org/embed/slice-it-all', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'knife-hit', title: 'Knife Hit', description: 'Play Knife Hit on PixelGamez.', category: 'action', tags: ['new'], thumbnail: '/images/games/action/knife-hit.png', embedUrl: 'https://www.twoplayergames.org/embed/knife-hit', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'wood-carving', title: 'Wood Carving', description: 'Play Wood Carving on PixelGamez.', category: 'simulation', tags: ['new'], thumbnail: '/images/games/simulation/wood-carving.png', embedUrl: 'https://www.twoplayergames.org/embed/wood-carving', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'townscaper', title: 'Townscaper', description: 'Play Townscaper on PixelGamez.', category: 'simulation', tags: ['new'], thumbnail: '/images/games/simulation/townscaper.png', embedUrl: 'https://www.twoplayergames.org/embed/townscaper', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'elastic-man', title: 'Elastic Man', description: 'Play Elastic Man on PixelGamez.', category: 'simulation', tags: ['new'], thumbnail: '/images/games/simulation/elastic-man.png', embedUrl: 'https://www.twoplayergames.org/embed/elastic-man', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'blob-bridge-run', title: 'Blob Bridge Run', description: 'Play Blob Bridge Run on PixelGamez.', category: 'action', tags: ['new'], thumbnail: '/images/games/action/blob-bridge-run.png', embedUrl: 'https://www.twoplayergames.org/embed/blob-bridge-run', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'blob-opera', title: 'Blob Opera', description: 'Play Blob Opera on PixelGamez.', category: 'simulation', tags: ['new'], thumbnail: '/images/games/simulation/blob-opera.png', embedUrl: 'https://www.twoplayergames.org/embed/blob-opera', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'blob-tank-wars', title: 'Blob Tank Wars', description: 'Play Blob Tank Wars on PixelGamez.', category: 'action', tags: ['new'], thumbnail: '/images/games/action/blob-tank-wars.png', embedUrl: 'https://www.twoplayergames.org/embed/blob-tank-wars', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'summer-rider-3d', title: 'Summer Rider 3D', description: 'Play Summer Rider 3D on PixelGamez.', category: 'sports', tags: ['new'], thumbnail: '/images/games/sports/summer-rider-3d.png', embedUrl: 'https://www.twoplayergames.org/embed/summer-rider-3d', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'duck-duck-clicker', title: 'Duck Duck Clicker', description: 'Play Duck Duck Clicker on PixelGamez.', category: 'clicker', tags: ['new'], thumbnail: '/images/games/clicker/duck-duck-clicker.png', embedUrl: 'https://www.twoplayergames.org/embed/duck-duck-clicker', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'among-us-online', title: 'Among Us Online', description: 'Play Among Us Online on PixelGamez.', category: 'action', tags: ['new'], thumbnail: '/images/games/action/among-us-online.png', embedUrl: 'https://www.twoplayergames.org/embed/among-us-online', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'prison-pump', title: 'Prison Pump', description: 'Play Prison Pump on PixelGamez.', category: 'action', tags: ['new'], thumbnail: '/images/games/action/prison-pump.png', embedUrl: 'https://www.twoplayergames.org/embed/prison-pump', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'bitlife-life-simulator', title: 'BitLife Life Simulator', description: 'Play BitLife Life Simulator on PixelGamez.', category: 'simulation', tags: ['new'], thumbnail: '/images/games/simulation/bitlife-life-simulator.png', embedUrl: 'https://www.twoplayergames.org/embed/bitlife-life-simulator', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'melon-sandbox', title: 'Melon Sandbox', description: 'Play Melon Sandbox on PixelGamez.', category: 'simulation', tags: ['new'], thumbnail: '/images/games/simulation/melon-sandbox.png', embedUrl: 'https://www.twoplayergames.org/embed/melon-sandbox', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'stickman-dismounting', title: 'Stickman Dismounting', description: 'Play Stickman Dismounting on PixelGamez.', category: 'simulation', tags: ['new'], thumbnail: '/images/games/simulation/stickman-dismounting.png', embedUrl: 'https://www.twoplayergames.org/embed/stickman-dismounting', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'slow-roads-io', title: 'Slow Roads.io', description: 'Play Slow Roads.io on PixelGamez.', category: 'driving', tags: ['new'], thumbnail: '/images/games/driving/slow-roads-io.png', embedUrl: 'https://www.twoplayergames.org/embed/slow-roads-io', rating: 0, plays: 18, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'mx-offroad-mountain-bike', title: 'MX Offroad Mountain Bike', description: 'Play MX Offroad Mountain Bike on PixelGamez.', category: 'driving', tags: ['new'], thumbnail: '/images/games/driving/mx-offroad-mountain-bike.png', embedUrl: 'https://www.twoplayergames.org/embed/mx-offroad-mountain-bike', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'get-on-top', title: 'Get On Top', description: 'Play Get On Top on PixelGamez.', category: 'action', tags: ['new'], thumbnail: '/images/games/action/get-on-top.png', embedUrl: 'https://www.twoplayergames.org/embed/get-on-top', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'slicer-duo', title: 'Slicer Duo', description: 'Play Slicer Duo on PixelGamez.', category: 'action', tags: ['new'], thumbnail: '/images/games/action/slicer-duo.png', embedUrl: 'https://www.twoplayergames.org/embed/slicer-duo', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'youtuber-idle', title: 'Youtuber Idle', description: 'Play Youtuber Idle on PixelGamez.', category: 'simulation', tags: ['new'], thumbnail: '/images/games/simulation/youtuber-idle.png', embedUrl: 'https://www.twoplayergames.org/embed/youtuber-idle', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'idle-money-factory', title: 'Idle Money Factory', description: 'Play Idle Money Factory on PixelGamez.', category: 'simulation', tags: ['new'], thumbnail: '/images/games/simulation/idle-money-factory.png', embedUrl: 'https://www.twoplayergames.org/embed/idle-money-factory', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'build-your-furniture-store', title: 'Build Your Furniture Store', description: 'Play Build Your Furniture Store on PixelGamez.', category: 'simulation', tags: ['new'], thumbnail: '/images/games/simulation/build-your-furniture-store.png', embedUrl: 'https://www.twoplayergames.org/embed/build-your-furniture-store', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'food-empire-inc', title: 'Food Empire Inc', description: 'Play Food Empire Inc on PixelGamez.', category: 'simulation', tags: ['new'], thumbnail: '/images/games/simulation/food-empire-inc.png', embedUrl: 'https://www.twoplayergames.org/embed/food-empire-inc', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'drive-in-cinema-idle-game', title: 'Drive In Cinema Idle Game', description: 'Play Drive In Cinema Idle Game on PixelGamez.', category: 'simulation', tags: ['new'], thumbnail: '/images/games/simulation/drive-in-cinema-idle-game.png', embedUrl: 'https://www.twoplayergames.org/embed/drive-in-cinema-idle-game', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'cinema-business-idle', title: 'Cinema Business Idle', description: 'Play Cinema Business Idle on PixelGamez.', category: 'simulation', tags: ['new'], thumbnail: '/images/games/simulation/cinema-business-idle.png', embedUrl: 'https://www.twoplayergames.org/embed/cinema-business-idle', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'candy-clicker', title: 'Candy Clicker', description: 'Play Candy Clicker on PixelGamez.', category: 'clicker', tags: ['new'], thumbnail: '/images/games/clicker/candy-clicker.png', embedUrl: 'https://www.twoplayergames.org/embed/candy-clicker', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'candy-clicker-2', title: 'Candy Clicker 2', description: 'Play Candy Clicker 2 on PixelGamez.', category: 'clicker', tags: ['new'], thumbnail: '/images/games/clicker/candy-clicker-2.png', embedUrl: 'https://www.twoplayergames.org/embed/candy-clicker-2', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'cookie-clicker', title: 'Cookie Clicker', description: 'Play Cookie Clicker on PixelGamez.', category: 'clicker', tags: ['new'], thumbnail: '/images/games/clicker/cookie-clicker.png', embedUrl: 'https://www.twoplayergames.org/embed/cookie-clicker', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'planet-clicker', title: 'Planet Clicker', description: 'Play Planet Clicker on PixelGamez.', category: 'clicker', tags: ['new'], thumbnail: '/images/games/clicker/planet-clicker.png', embedUrl: 'https://www.twoplayergames.org/embed/planet-clicker', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'fire-and-water', title: 'Fire And Water', description: 'Play Fire And Water on PixelGamez.', category: 'puzzle', tags: ['adventure', 'new'], thumbnail: '/images/games/puzzle/fire-and-water.png', embedUrl: 'https://www.twoplayergames.org/embed/fire-and-water', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'fireboy-and-watergirl-in-the-forest-temple', title: 'Fireboy And Watergirl In The Forest Temple', description: 'Play Fireboy And Watergirl In The Forest Temple on PixelGamez.', category: 'puzzle', tags: ['adventure', 'new'], thumbnail: '/images/games/puzzle/fireboy-and-watergirl-in-the-forest-temple.png', embedUrl: 'https://www.twoplayergames.org/embed/fireboy-and-watergirl-in-the-forest-temple', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'fireboy-and-watergirl-2-in-the-light-temple', title: 'Fireboy And Watergirl 2 In The Light Temple', description: 'Play Fireboy And Watergirl 2 In The Light Temple on PixelGamez.', category: 'puzzle', tags: ['adventure', 'new'], thumbnail: '/images/games/puzzle/fireboy-and-watergirl-2-in-the-light-temple.png', embedUrl: 'https://www.twoplayergames.org/embed/fireboy-and-watergirl-2-in-the-light-temple', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'fireboy-and-watergirl-3-in-the-ice-temple', title: 'Fireboy And Watergirl 3 In The Ice Temple', description: 'Play Fireboy And Watergirl 3 In The Ice Temple on PixelGamez.', category: 'puzzle', tags: ['adventure', 'new'], thumbnail: '/images/games/puzzle/fireboy-and-watergirl-3-in-the-ice-temple.png', embedUrl: 'https://www.twoplayergames.org/embed/fireboy-and-watergirl-3-in-the-ice-temple', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'fireboy-and-watergirl-4-the-crystal-temple', title: 'Fireboy And Watergirl 4 The Crystal Temple', description: 'Play Fireboy And Watergirl 4 The Crystal Temple on PixelGamez.', category: 'puzzle', tags: ['adventure', 'new'], thumbnail: '/images/games/puzzle/fireboy-and-watergirl-4-the-crystal-temple.png', embedUrl: 'https://www.twoplayergames.org/embed/fireboy-and-watergirl-4-the-crystal-temple', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'fireboy-and-watergirl-5-elements', title: 'Fireboy And Watergirl 5 Elements', description: 'Play Fireboy And Watergirl 5 Elements on PixelGamez.', category: 'puzzle', tags: ['adventure', 'new'], thumbnail: '/images/games/puzzle/fireboy-and-watergirl-5-elements.png', embedUrl: 'https://www.twoplayergames.org/embed/fireboy-and-watergirl-5-elements', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'hangman-with-buddies', title: 'Hangman With Buddies', description: 'Play Hangman With Buddies on PixelGamez.', category: 'puzzle', tags: ['new'], thumbnail: '/images/games/puzzle/hangman-with-buddies.png', embedUrl: 'https://www.twoplayergames.org/embed/hangman-with-buddies', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'arrow-slide-puzzle', title: 'Arrow Slide Puzzle', description: 'Play Arrow Slide Puzzle on PixelGamez.', category: 'puzzle', tags: ['new'], thumbnail: '/images/games/puzzle/arrow-slide-puzzle.png', embedUrl: 'https://www.twoplayergames.org/embed/arrow-slide-puzzle', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'park-me', title: 'Park Me', description: 'Play Park Me on PixelGamez.', category: 'puzzle', tags: ['new'], thumbnail: '/images/games/puzzle/park-me.png', embedUrl: 'https://www.twoplayergames.org/embed/park-me', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'unroll-ball-slide', title: 'Unroll Ball Slide', description: 'Play Unroll Ball Slide on PixelGamez.', category: 'puzzle', tags: ['new'], thumbnail: '/images/games/puzzle/unroll-ball-slide.png', embedUrl: 'https://www.twoplayergames.org/embed/unroll-ball-slide', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'hexa-puzzle', title: 'Hexa Puzzle', description: 'Play Hexa Puzzle on PixelGamez.', category: 'puzzle', tags: ['new'], thumbnail: '/images/games/puzzle/hexa-puzzle.png', embedUrl: 'https://www.twoplayergames.org/embed/hexa-puzzle', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'color-sand-puzzle', title: 'Color Sand Puzzle', description: 'Play Color Sand Puzzle on PixelGamez.', category: 'puzzle', tags: ['new'], thumbnail: '/images/games/puzzle/color-sand-puzzle.png', embedUrl: 'https://www.twoplayergames.org/embed/color-sand-puzzle', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'bubble-shooter', title: 'Bubble Shooter', description: 'Play Bubble Shooter on PixelGamez.', category: 'puzzle', tags: ['new'], thumbnail: '/images/games/puzzle/bubble-shooter.png', embedUrl: 'https://www.twoplayergames.org/embed/bubble-shooter', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'bubble-shooter-2', title: 'Bubble Shooter 2', description: 'Play Bubble Shooter 2 on PixelGamez.', category: 'puzzle', tags: ['new'], thumbnail: '/images/games/puzzle/bubble-shooter-2.png', embedUrl: 'https://www.twoplayergames.org/embed/bubble-shooter-2', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'territory-war', title: 'Territory War', description: 'Play Territory War on PixelGamez.', category: 'shooting', tags: ['new'], thumbnail: '/images/games/shooting/territory-war.png', embedUrl: 'https://www.twoplayergames.org/embed/territory-war', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'territory-war-2', title: 'Territory War 2', description: 'Play Territory War 2 on PixelGamez.', category: 'shooting', tags: ['new'], thumbnail: '/images/games/shooting/territory-war-2.png', embedUrl: 'https://www.twoplayergames.org/embed/territory-war-2', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'territory-war-3', title: 'Territory War 3', description: 'Play Territory War 3 on PixelGamez.', category: 'shooting', tags: ['new'], thumbnail: '/images/games/shooting/territory-war-3.png', embedUrl: 'https://www.twoplayergames.org/embed/territory-war-3', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'gun-mayhem-redux', title: 'Gun Mayhem Redux', description: 'Play Gun Mayhem Redux on PixelGamez.', category: 'shooting', tags: ['new'], thumbnail: '/images/games/shooting/gun-mayhem-redux.png', embedUrl: 'https://www.twoplayergames.org/embed/gun-mayhem-redux', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'fortz', title: 'Fortz', description: 'Play Fortz on PixelGamez.', category: 'shooting', tags: ['new'], thumbnail: '/images/games/shooting/fortz.png', embedUrl: 'https://www.twoplayergames.org/embed/fortz', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'gangsters', title: 'Gangsters', description: 'Play Gangsters on PixelGamez.', category: 'shooting', tags: ['new'], thumbnail: '/images/games/shooting/gangsters.png', embedUrl: 'https://www.twoplayergames.org/embed/gangsters', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'click-click-clicker', title: 'Click Click Clicker', description: 'Play Click Click Clicker on PixelGamez.', category: 'clicker', tags: ['new'], thumbnail: '/images/games/clicker/click-click-clicker.png', embedUrl: 'https://www.twoplayergames.org/embed/click-click-clicker', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'fun-clicker', title: 'Fun Clicker', description: 'Play Fun Clicker on PixelGamez.', category: 'clicker', tags: ['new'], thumbnail: '/images/games/clicker/fun-clicker.png', embedUrl: 'https://www.twoplayergames.org/embed/fun-clicker', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'scritchy-scratchy', title: 'Scritchy Scratchy', description: 'Play Scritchy Scratchy on PixelGamez.', category: 'clicker', tags: ['new'], thumbnail: '/images/games/clicker/scritchy-scratchy.png', embedUrl: 'https://www.twoplayergames.org/embed/scritchy-scratchy', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'minibattles-2-6-players', title: 'Minibattles 2 6 Players', description: 'Play Minibattles 2 6 Players on PixelGamez.', category: 'action', tags: ['new'], thumbnail: '/images/games/action/minibattles-2-6-players.png', embedUrl: 'https://www.twoplayergames.org/embed/minibattles-2-6-players', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'mechastick-fighter', title: 'Mechastick Fighter', description: 'Play Mechastick Fighter on PixelGamez.', category: 'action', tags: ['new'], thumbnail: '/images/games/action/mechastick-fighter.png', embedUrl: 'https://www.twoplayergames.org/embed/mechastick-fighter', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'tank-stars', title: 'Tank Stars', description: 'Play Tank Stars on PixelGamez.', category: 'action', tags: ['new'], thumbnail: '/images/games/action/tank-stars.png', embedUrl: 'https://www.twoplayergames.org/embed/tank-stars', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'operation-desert-road', title: 'Operation Desert Road', description: 'Play Operation Desert Road on PixelGamez.', category: 'action', tags: ['new'], thumbnail: '/images/games/action/operation-desert-road.png', embedUrl: 'https://www.twoplayergames.org/embed/operation-desert-road', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'grand-extreme-racing', title: 'Grand Extreme Racing', description: 'Play Grand Extreme Racing on PixelGamez.', category: 'driving', tags: ['new'], thumbnail: '/images/games/driving/grand-extreme-racing.png', embedUrl: 'https://www.twoplayergames.org/embed/grand-extreme-racing', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'ultimate-flying-car', title: 'Ultimate Flying Car', description: 'Play Ultimate Flying Car on PixelGamez.', category: 'driving', tags: ['new'], thumbnail: '/images/games/driving/ultimate-flying-car.png', embedUrl: 'https://www.twoplayergames.org/embed/ultimate-flying-car', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'night-city-racing', title: 'Night City Racing', description: 'Play Night City Racing on PixelGamez.', category: 'driving', tags: ['new'], thumbnail: '/images/games/driving/night-city-racing.png', embedUrl: 'https://www.twoplayergames.org/embed/night-city-racing', rating: 0, plays: 0, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'hexanaut-io', title: 'Hexanaut Io', description: 'Play Hexanaut Io on PixelGamez.', category: 'io', tags: ['new'], thumbnail: '/images/games/io/hexanaut-io.png', embedUrl: 'https://hexanaut.io/', rating: 0, plays: 6, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'tileman-io', title: 'Tileman Io', description: 'Play Tileman Io on PixelGamez.', category: 'io', tags: ['new'], thumbnail: '/images/games/io/tileman-io.png', embedUrl: 'https://tileman.io/', rating: 0, plays: 5, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'skribbl-io', title: 'Skribbl Io', description: 'Play Skribbl Io on PixelGamez.', category: 'io', tags: ['new'], thumbnail: '/images/games/io/skribbl-io.png', embedUrl: 'https://skribbl.io/', rating: 0, plays: 9, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'copter-io', title: 'Copter Io', description: 'Play Copter Io on PixelGamez.', category: 'io', tags: ['new'], thumbnail: '/images/games/io/copter-io.png', embedUrl: 'https://www.copter.io/', rating: 0, plays: 14, createdAt: '2026-07-13T23:22:41.028Z' },
  { id: 'dashcraft-io', title: 'Dashcraft Io', description: 'Play Dashcraft Io on PixelGamez.', category: 'io', tags: ['driving', 'new'], thumbnail: '/images/games/io/dashcraft-io.png', embedUrl: 'https://dashcraft.io/', rating: 0, plays: 19, createdAt: '2026-07-13T23:22:41.028Z' },

  { id: '1-speed-keyboard-lucky-escape', title: '+1 Speed Keyboard Lucky Escape', description: 'Play +1 Speed Keyboard Lucky Escape online for free!', category: 'action', tags: ['new'], thumbnail: 'https://images.twoplayergames.org/files/games/g1/1speed-keyboard-lucky-escape-v1/1speed-keyboard-lucky-escape.jpg?auto=format&w=100', embedUrl: 'https://www.twoplayergames.org/embed/1-speed-keyboard-lucky-escape', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.656Z' },
  { id: 'goalheads-io', title: 'GoalHeads io', description: 'Play GoalHeads io online for free!', category: 'action', tags: ['new'], thumbnail: 'https://images.twoplayergames.org/files/games/other/goalheads-io.jpg?auto=format&w=100', embedUrl: 'https://www.twoplayergames.org/embed/goalheads-io', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.657Z' },
  { id: 'flip-duel', title: 'Flip Duel', description: 'Play Flip Duel online for free!', category: 'action', tags: ['new'], thumbnail: 'https://images.twoplayergames.org/files/games/g1/flip-duel-v1b/flip-duel-v3.jpg?auto=format&w=100', embedUrl: 'https://www.twoplayergames.org/embed/flip-duel', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.657Z' },
  { id: 'pikwip', title: 'PikWip', description: 'Play PikWip online for free!', category: 'action', tags: ['new'], thumbnail: 'https://images.twoplayergames.org/files/games/o6/PikWip/PikWip.jpg?auto=format&w=100', embedUrl: 'https://www.twoplayergames.org/embed/pikwip', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.657Z' },
  { id: '2p-dino-run', title: '2P Dino Run', description: 'Play 2P Dino Run online for free!', category: 'action', tags: ['new'], thumbnail: 'https://images.twoplayergames.org/files/games/o6/2p-dino-run/2-player-dino-run.jpg?auto=format&w=100', embedUrl: 'https://www.twoplayergames.org/embed/2p-dino-run', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.657Z' },
  { id: 'pico-park-scratch', title: 'Pico Park Scratch', description: 'Play Pico Park Scratch online for free!', category: 'action', tags: ['new'], thumbnail: 'https://images.twoplayergames.org/files/games/o6/pico-park/pico-park.jpg?auto=format&w=100', embedUrl: 'https://www.twoplayergames.org/embed/pico-park-scratch', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.657Z' },
  { id: 'tennis-masters-2026', title: 'Tennis Masters 2026', description: 'Play Tennis Masters 2026 online for free!', category: 'action', tags: ['new'], thumbnail: 'https://images.twoplayergames.org/files/games/other/tennis-masters-2026.jpg?auto=format&w=100', embedUrl: 'https://www.twoplayergames.org/embed/tennis-masters-2026', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.657Z' },
  { id: 'sniper-for-brainrots', title: 'Sniper for Brainrots', description: 'Play Sniper for Brainrots online for free!', category: 'action', tags: ['new'], thumbnail: 'https://images.twoplayergames.org/files/games/g1/sniper-for-brainrots-v1/sniper-for-brainrots.jpg?auto=format&w=100', embedUrl: 'https://www.twoplayergames.org/embed/sniper-for-brainrots', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.657Z' },
  { id: 'escape-the-alien-prison', title: 'Escape the Alien Prison', description: 'Play Escape the Alien Prison online for free!', category: 'action', tags: ['new'], thumbnail: 'https://images.twoplayergames.org/files/games/g1/escape-the-alien-prison-v1a/escape-the-alien-prison.jpg?auto=format&w=100', embedUrl: 'https://www.twoplayergames.org/embed/escape-the-alien-prison', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.657Z' },
  { id: 'collect-brainrot-arena', title: 'Collect Brainrot Arena', description: 'Play Collect Brainrot Arena online for free!', category: 'action', tags: ['new'], thumbnail: 'https://images.twoplayergames.org/files/games/g1/collect-brainrot-arena-v1a/collect-brainrot-arena.jpg?auto=format&w=100', embedUrl: 'https://www.twoplayergames.org/embed/collect-brainrot-arena', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.657Z' },
  { id: 'soccer-physics-world-cup', title: 'Soccer Physics World Cup', description: 'Play Soccer Physics World Cup online for free!', category: 'action', tags: ['new'], thumbnail: 'https://images.twoplayergames.org/files/games/o6/soccer-physics-world-cup-v4/soccer-physics-world-cup.jpg?auto=format&w=100', embedUrl: 'https://www.twoplayergames.org/embed/soccer-physics-world-cup', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.657Z' },
  { id: '2048-duel', title: '2048 Duel', description: 'Play 2048 Duel online for free!', category: 'action', tags: ['new'], thumbnail: 'https://images.twoplayergames.org/files/games/o6/2048-duel-v3/2048-duel.jpg?auto=format&w=100', embedUrl: 'https://www.twoplayergames.org/embed/2048-duel', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.657Z' },
  { id: 'pogo-masters', title: 'Pogo Masters', description: 'Play Pogo Masters online for free!', category: 'action', tags: ['new'], thumbnail: 'https://images.twoplayergames.org/files/games/other/pogo-masters.jpg?auto=format&w=100', embedUrl: 'https://www.twoplayergames.org/embed/pogo-masters', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.657Z' },
  { id: 'retro-sports-champion', title: 'Retro Sports Champion', description: 'Play Retro Sports Champion online for free!', category: 'action', tags: ['new'], thumbnail: 'https://images.twoplayergames.org/files/games/other/retro-sports-champion.jpg?auto=format&w=100', embedUrl: 'https://www.twoplayergames.org/embed/retro-sports-champion', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.657Z' },
  { id: 'float-for-brainrots', title: 'Float for Brainrots', description: 'Play Float for Brainrots online for free!', category: 'action', tags: ['new'], thumbnail: 'https://images.twoplayergames.org/files/games/g1/float-for-brainrots-v1a/float-for-brainrots.jpg?auto=format&w=100', embedUrl: 'https://www.twoplayergames.org/embed/float-for-brainrots', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.657Z' },
  { id: 'world-cup-soccer-caps', title: 'World Cup Soccer Caps', description: 'Play World Cup Soccer Caps online for free!', category: 'action', tags: ['new'], thumbnail: 'https://images.twoplayergames.org/files/games/other/world-cup-soccer-caps.jpg?auto=format&w=100', embedUrl: 'https://www.twoplayergames.org/embed/world-cup-soccer-caps', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.657Z' },
  { id: 'kick-lucky-blocks-online', title: 'Kick Lucky Blocks Online', description: 'Play Kick Lucky Blocks Online online for free!', category: 'action', tags: ['new'], thumbnail: 'https://images.twoplayergames.org/files/games/h1/kick-lucky-blocks-online/kick-lucky-blocks-online.jpg?auto=format&w=100', embedUrl: 'https://www.twoplayergames.org/embed/kick-lucky-blocks-online', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.657Z' },
  { id: 'football-legends-2026', title: 'Football Legends 2026', description: 'Play Football Legends 2026 online for free!', category: 'action', tags: ['new'], thumbnail: 'https://images.twoplayergames.org/files/games/other/football-legends-2026-v2.jpg?auto=format&w=100', embedUrl: 'https://www.twoplayergames.org/embed/football-legends-2026', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.657Z' },
  { id: 'fireboy-and-watergirl-7-and-friends', title: 'Fireboy and Watergirl 7: And Friends', description: 'Play Fireboy and Watergirl 7: And Friends online for free!', category: 'action', tags: ['new'], thumbnail: 'https://images.twoplayergames.org/files/games/other/fireboy-and-watergirl-7.jpg?auto=format&w=100', embedUrl: 'https://www.twoplayergames.org/embed/fireboy-and-watergirl-7-and-friends', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.657Z' },
  { id: 'euro-soccer-cup', title: 'Euro Soccer Cup', description: 'Play Euro Soccer Cup online for free!', category: 'action', tags: ['new'], thumbnail: 'https://images.twoplayergames.org/files/games/o6/euro-soccer-cup/euro-soccer-cup.jpg?auto=format&w=100', embedUrl: 'https://www.twoplayergames.org/embed/euro-soccer-cup', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.657Z' },
  { id: 'lucky-brainrot-blocks-online', title: 'Lucky Brainrot Blocks Online', description: 'Play Lucky Brainrot Blocks Online online for free!', category: 'action', tags: ['new'], thumbnail: 'https://images.twoplayergames.org/files/games/h1/lucky-brainrot-blocks-online/lucky-brainrot-blocks-online-var1.jpg?auto=format&w=100', embedUrl: 'https://www.twoplayergames.org/embed/lucky-brainrot-blocks-online', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.657Z' },
  { id: 'choir', title: 'Choir', description: 'Play Choir online for free!', category: 'action', tags: ['new'], thumbnail: 'https://images.twoplayergames.org/files/games/o6/choir/choir.jpg?auto=format&w=100', embedUrl: 'https://www.twoplayergames.org/embed/choir', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.657Z' },
  { id: 'lazy-bear', title: 'Lazy Bear', description: 'Play Lazy Bear online for free!', category: 'action', tags: ['new'], thumbnail: 'https://images.twoplayergames.org/files/games/o6/lazy-bear/lazy-bear.jpg?auto=format&w=100', embedUrl: 'https://www.twoplayergames.org/embed/lazy-bear', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.657Z' },
  { id: 'the-machinegg', title: 'The MachinEGG', description: 'Play The MachinEGG online for free!', category: 'action', tags: ['new'], thumbnail: 'https://images.twoplayergames.org/files/games/o6/the-machinegg/the-machinegg.jpg?auto=format&w=100', embedUrl: 'https://www.twoplayergames.org/embed/the-machinegg', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.657Z' },
  { id: 'run-for-brainrots', title: 'Run for Brainrots', description: 'Play Run for Brainrots online for free!', category: 'action', tags: ['new'], thumbnail: 'https://images.twoplayergames.org/files/games/other/run-for-brainrots.jpg?auto=format&w=100', embedUrl: 'https://www.twoplayergames.org/embed/run-for-brainrots', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.657Z' },
  { id: 'cuphead', title: 'Cuphead', description: 'Play Cuphead online for free!', category: 'action', tags: ['new'], thumbnail: 'https://images.twoplayergames.org/files/games/o6/cuphead/cuphead.jpg?auto=format&w=100', embedUrl: 'https://www.twoplayergames.org/embed/cuphead', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.657Z' },
  { id: 'richup-io', title: 'Richup io', description: 'Play Richup io online for free!', category: 'action', tags: ['new'], thumbnail: 'https://images.twoplayergames.org/files/games/o6/richup.jpg?auto=format&w=100', embedUrl: 'https://www.twoplayergames.org/embed/richup-io', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.657Z' },
  { id: 'epic-escape-from-barrys-prison', title: 'Epic Escape from Barrys Prison', description: 'Play Epic Escape from Barrys Prison online for free!', category: 'action', tags: ['new'], thumbnail: 'https://images.twoplayergames.org/files/games/other/epic-espace-from-barry-prison.jpg?auto=format&w=100', embedUrl: 'https://www.twoplayergames.org/embed/epic-escape-from-barrys-prison', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.657Z' },
  { id: 'eaglercraft', title: 'Eaglercraft', description: 'Play Eaglercraft online for free!', category: 'action', tags: ['new'], thumbnail: 'https://images.twoplayergames.org/files/games/o6/eaglercraft/eaglercraft.jpg?auto=format&w=100', embedUrl: 'https://www.twoplayergames.org/embed/eaglercraft', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.657Z' },
  { id: 'punch-the-annoying-boss', title: 'Punch the Annoying Boss', description: 'Play Punch the Annoying Boss online for free!', category: 'action', tags: ['new'], thumbnail: 'https://images.twoplayergames.org/files/games/other/boss-punch.jpg?auto=format&w=100', embedUrl: 'https://www.twoplayergames.org/embed/punch-the-annoying-boss', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.657Z' },
  { id: 'mineland', title: 'Mineland', description: 'Play Mineland online for free!', category: 'action', tags: ['new'], thumbnail: 'https://images.twoplayergames.org/files/games/other/mineland.jpg?auto=format&w=100', embedUrl: 'https://www.twoplayergames.org/embed/mineland', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.657Z' },
  { id: 'meccha-hunt', title: 'Meccha Hunt', description: 'Play Meccha Hunt online for free!', category: 'action', tags: ['new'], thumbnail: 'https://images.twoplayergames.org/files/games/other/meccha.jpg?auto=format&w=100', embedUrl: 'https://www.twoplayergames.org/embed/meccha-hunt', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.657Z' },
  { id: 'baldis-basics-classic-remastered', title: 'Baldi’s Basics Classic Remastered', description: 'Play Baldi’s Basics Classic Remastered online for free!', category: 'action', tags: ['new'], thumbnail: 'https://images.twoplayergames.org/files/games/o6/baldis-remastered/baldis-basic-remastered.jpg?auto=format&w=100', embedUrl: 'https://www.twoplayergames.org/embed/baldis-basics-classic-remastered', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.657Z' },
  { id: 'granny-6', title: 'Granny 6', description: 'Play Granny 6 online for free!', category: 'action', tags: ['new'], thumbnail: 'https://images.twoplayergames.org/files/games/o6/granny6/granny-6.jpg?auto=format&w=100', embedUrl: 'https://www.twoplayergames.org/embed/granny-6', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.657Z' },
  { id: 'tomb-of-the-mask', title: 'Tomb of the Mask', description: 'Play Tomb of the Mask online for free!', category: 'action', tags: ['new'], thumbnail: 'https://images.twoplayergames.org/files/games/o6/tomb-of-the-mask/tomb-of-the-mask.jpg?auto=format&w=100', embedUrl: 'https://www.twoplayergames.org/embed/tomb-of-the-mask', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.657Z' },
  { id: 'dinosaur-game', title: 'Dinosaur Game', description: 'Play Dinosaur Game online for free!', category: 'action', tags: ['new'], thumbnail: 'https://images.twoplayergames.org/files/games/o6/the-dinosaur-game/dinosaur-game.jpg?auto=format&w=100', embedUrl: 'https://www.twoplayergames.org/embed/dinosaur-game', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.657Z' },
  { id: '1-speed-keyboard-escape', title: '+1 Speed Keyboard Escape', description: 'Play +1 Speed Keyboard Escape online for free!', category: 'action', tags: ['new'], thumbnail: 'https://images.twoplayergames.org/files/games/other/1-speed-keyboard-escape.jpg?auto=format&w=100', embedUrl: 'https://www.twoplayergames.org/embed/1-speed-keyboard-escape', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.657Z' },
  { id: 'grow-a-garden-for-brainrots', title: 'Grow a Garden for Brainrots', description: 'Play Grow a Garden for Brainrots online for free!', category: 'action', tags: ['new'], thumbnail: 'https://images.twoplayergames.org/files/games/other/grow-a-garden-for-brainrots.jpg?auto=format&w=100', embedUrl: 'https://www.twoplayergames.org/embed/grow-a-garden-for-brainrots', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.657Z' },
  { id: 'we-become-what-we-behold', title: 'We Become What We Behold', description: 'Play We Become What We Behold online for free!', category: 'action', tags: ['new'], thumbnail: 'https://images.twoplayergames.org/files/games/o6/we-become-what-behold/webecome-whatbehold.jpg?auto=format&w=100', embedUrl: 'https://unblockedgames66.gitlab.io/we-become-what-we-behold/', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.657Z' },
  { id: 'backyard-dig-hole-3d', title: 'Backyard Dig Hole 3D', description: 'Play Backyard Dig Hole 3D online for free!', category: 'action', tags: ['new'], thumbnail: 'https://images.twoplayergames.org/files/games/other/backyard-dig-hole-3d.jpg?auto=format&w=100', embedUrl: 'https://www.twoplayergames.org/embed/backyard-dig-hole-3d', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.657Z' },
  { id: 'fish-eat-getting-big', title: 'Fish Eat Getting Big', description: 'Play Fish Eat Getting Big online for free!', category: 'action', tags: ['new', 'top'], thumbnail: 'https://images.twoplayergames.org/files/games/o1/Fish_Eat_Getting_Big/Fish_Eat_Getting_Big.jpg?auto=format&amp;w=100', embedUrl: 'https://www.twoplayergames.org/embed/fish-eat-getting-big', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.722Z' },
  { id: 'geometry-vibes', title: 'Geometry Vibes', description: 'Play Geometry Vibes online for free!', category: 'action', tags: ['new', 'top'], thumbnail: 'https://images.twoplayergames.org/files/games/g1/geometry-vibes-v11/geometry-vibes.jpg?auto=format&amp;w=100', embedUrl: 'https://www.twoplayergames.org/embed/geometry-vibes', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.723Z' },
  { id: 'g-switch-3', title: 'G-Switch 3', description: 'Play G-Switch 3 online for free!', category: 'action', tags: ['new', 'top'], thumbnail: 'https://images.twoplayergames.org/files/games/other/G-Switch_3/g-switch-3-v4.jpg?auto=format&amp;w=100', embedUrl: 'https://www.twoplayergames.org/embed/g-switch-3', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.723Z' },
  { id: 'getaway-shootout', title: 'Getaway Shootout', description: 'Play Getaway Shootout online for free!', category: 'action', tags: ['new', 'top'], thumbnail: 'https://images.twoplayergames.org/files/games/other/Getaway_Shootout/getaway-shootout-v2.jpg?auto=format&amp;w=100', embedUrl: 'https://www.twoplayergames.org/embed/getaway-shootout', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.723Z' },
  { id: 'mx-offroad-master', title: 'MX OffRoad Master', description: 'Play MX OffRoad Master online for free!', category: 'action', tags: ['new', 'top'], thumbnail: 'https://images.twoplayergames.org/files/games/other/MX-offroad-master-2.jpg?auto=format&amp;w=100', embedUrl: 'https://www.twoplayergames.org/embed/mx-offroad-master', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.723Z' },
  { id: 'house-of-hazards', title: 'House of Hazards', description: 'Play House of Hazards online for free!', category: 'action', tags: ['new', 'top'], thumbnail: 'https://images.twoplayergames.org/files/games/o1/House_of_Hazards/house-of-hazards.jpg?auto=format&amp;w=100', embedUrl: 'https://www.twoplayergames.org/embed/house-of-hazards', rating: 0, plays: 13, createdAt: '2026-08-29T23:06:38.723Z' },
  { id: 'two-ball-3d', title: 'Two Ball 3D', description: 'Play Two Ball 3D online for free!', category: 'action', tags: ['new', 'top'], thumbnail: 'https://images.twoplayergames.org/files/games/other/TwoBall3D/two-ball-3d-v2.jpg?auto=format&amp;w=100', embedUrl: 'https://www.twoplayergames.org/embed/two-ball-3d', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.723Z' },
  { id: 'super-fighters', title: 'Super Fighters', description: 'Play Super Fighters online for free!', category: 'action', tags: ['new', 'top'], thumbnail: 'https://images.twoplayergames.org/files/games/other/superfighters.jpg?auto=format&amp;w=100', embedUrl: 'https://www.twoplayergames.org/embed/super-fighters', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.723Z' },
  { id: 'gun-mayhem-2-more-mayhem', title: 'Gun Mayhem 2 More Mayhem', description: 'Play Gun Mayhem 2 More Mayhem online for free!', category: 'action', tags: ['new', 'top'], thumbnail: 'https://images.twoplayergames.org/files/games/o3/gun-mayhem-2-more-mayhem.jpg?auto=format&amp;w=100', embedUrl: 'https://www.twoplayergames.org/embed/gun-mayhem-2-more-mayhem', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.723Z' },
  { id: 'stickman-kombat-2d', title: 'Stickman Kombat 2D', description: 'Play Stickman Kombat 2D online for free!', category: 'action', tags: ['new', 'top'], thumbnail: 'https://images.twoplayergames.org/files/games/other/stickman-kombat-2d.jpg?auto=format&amp;w=100', embedUrl: 'https://www.twoplayergames.org/embed/stickman-kombat-2d', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.723Z' },
  { id: 'tag-run', title: 'Tag Run', description: 'Play Tag Run online for free!', category: 'action', tags: ['new', 'top'], thumbnail: 'https://images.twoplayergames.org/files/games/h1/tag-run/tag-run-var4.jpg?auto=format&amp;w=100', embedUrl: 'https://www.twoplayergames.org/embed/tag-run', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.723Z' },
  { id: 'double-bike-battle', title: 'Double Bike Battle', description: 'Play Double Bike Battle online for free!', category: 'action', tags: ['new', 'top'], thumbnail: 'https://images.twoplayergames.org/files/games/other/double-bike-battles.jpg?auto=format&amp;w=100', embedUrl: 'https://www.twoplayergames.org/embed/double-bike-battle', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.723Z' },
  { id: 'stickman-battle-1-4-players', title: 'Stickman Battle 1-4 Players', description: 'Play Stickman Battle 1-4 Players online for free!', category: 'action', tags: ['new', 'top'], thumbnail: 'https://images.twoplayergames.org/files/games/other/stickmanbattle-1-4-players.jpg?auto=format&amp;w=100', embedUrl: 'https://www.twoplayergames.org/embed/stickman-battle-1-4-players', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.723Z' },
  { id: '2-3-4-player-games', title: '2-3-4 Player Games', description: 'Play 2-3-4 Player Games online for free!', category: 'action', tags: ['new', 'top'], thumbnail: 'https://images.twoplayergames.org/files/games/o2/234_Player_Games/234-playergames.jpg?auto=format&amp;w=100', embedUrl: 'https://www.twoplayergames.org/embed/2-3-4-player-games', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.723Z' },
  { id: 'geometry-vibes-x-ball', title: 'Geometry Vibes X-Ball', description: 'Play Geometry Vibes X-Ball online for free!', category: 'action', tags: ['new', 'top'], thumbnail: 'https://images.twoplayergames.org/files/games/g1/geometry-vibes-x-ball/geometry-vibes-x-ball.jpg?auto=format&amp;w=100', embedUrl: 'https://www.twoplayergames.org/embed/geometry-vibes-x-ball', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.723Z' },
  { id: 'boxhead-2play', title: 'Boxhead 2Play', description: 'Play Boxhead 2Play online for free!', category: 'action', tags: ['new', 'top'], thumbnail: 'https://images.twoplayergames.org/files/games/o1/boxhead_2Play.jpg?auto=format&amp;w=100', embedUrl: 'https://www.twoplayergames.org/embed/boxhead-2play', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.723Z' },
  { id: 'steal-car-duel', title: 'Steal Car Duel', description: 'Play Steal Car Duel online for free!', category: 'action', tags: ['new', 'top'], thumbnail: 'https://images.twoplayergames.org/files/games/g1/steal-car-duel-v1/steal-car-duel.jpg?auto=format&amp;w=100', embedUrl: 'https://www.twoplayergames.org/embed/steal-car-duel', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.723Z' },
  { id: 'janissary-tower', title: 'Janissary Tower', description: 'Play Janissary Tower online for free!', category: 'action', tags: ['new', 'top'], thumbnail: 'https://images.twoplayergames.org/files/games/other/Janissary_Tower_v2/Janissary_Tower.jpg?auto=format&amp;w=100', embedUrl: 'https://www.twoplayergames.org/embed/janissary-tower', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.723Z' },
  { id: 'basketball-stars-2026', title: 'Basketball Stars 2026', description: 'Play Basketball Stars 2026 online for free!', category: 'action', tags: ['new', 'top'], thumbnail: 'https://images.twoplayergames.org/files/games/other/basketball-stars-2026.jpg?auto=format&amp;w=100', embedUrl: 'https://www.twoplayergames.org/embed/basketball-stars-2026', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.723Z' },
  { id: 'city-minibus-driver', title: 'City Minibus Driver', description: 'Play City Minibus Driver online for free!', category: 'action', tags: ['new', 'top'], thumbnail: 'https://images.twoplayergames.org/files/games/o1/City_Minibus_Driver/city-minibus-driver.jpg?auto=format&amp;w=100', embedUrl: 'https://www.twoplayergames.org/embed/city-minibus-driver', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.723Z' },
  { id: 'fly-car-stunt-5', title: 'Fly Car Stunt 5', description: 'Play Fly Car Stunt 5 online for free!', category: 'action', tags: ['new', 'top'], thumbnail: 'https://images.twoplayergames.org/files/games/other/Fly_Car_Stunt_5/fly-car-stunt-5.jpg?auto=format&amp;w=100', embedUrl: 'https://www.twoplayergames.org/embed/fly-car-stunt-5', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.723Z' },
  { id: 'stick-arena-battle', title: 'Stick Arena: Battle', description: 'Play Stick Arena: Battle online for free!', category: 'action', tags: ['new', 'top'], thumbnail: 'https://images.twoplayergames.org/files/games/other/stick-arena-battle.jpg?auto=format&amp;w=100', embedUrl: 'https://www.twoplayergames.org/embed/stick-arena-battle', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.723Z' },
  { id: 'grand-city-racing', title: 'Grand City Racing', description: 'Play Grand City Racing online for free!', category: 'action', tags: ['new', 'top'], thumbnail: 'https://images.twoplayergames.org/files/games/o1/Grand_City_Racing/grand-city-racing.jpg?auto=format&amp;w=100', embedUrl: 'https://www.twoplayergames.org/embed/grand-city-racing', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.723Z' },
  { id: 'janissary-battles', title: 'Janissary Battles', description: 'Play Janissary Battles online for free!', category: 'action', tags: ['new', 'top'], thumbnail: 'https://images.twoplayergames.org/files/games/other/Janissary_Battles/Janissary_Battles.jpg?auto=format&amp;w=100', embedUrl: 'https://www.twoplayergames.org/embed/janissary-battles', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.723Z' },
  { id: 'fireboy-and-watergirl-6-fairy-tales', title: 'Fireboy and Watergirl 6: Fairy Tales', description: 'Play Fireboy and Watergirl 6: Fairy Tales online for free!', category: 'action', tags: ['new', 'top'], thumbnail: 'https://images.twoplayergames.org/files/games/other/Fireboy_and_Watergirl_6.jpg?auto=format&amp;w=100', embedUrl: 'https://www.twoplayergames.org/embed/fireboy-and-watergirl-6-fairy-tales', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.723Z' },
  { id: 'grand-city-stunts', title: 'Grand City Stunts', description: 'Play Grand City Stunts online for free!', category: 'action', tags: ['new', 'top'], thumbnail: 'https://images.twoplayergames.org/files/games/o1/Grand_City_Stunts/Grand_City_Stunts.jpg?auto=format&amp;w=100', embedUrl: 'https://www.twoplayergames.org/embed/grand-city-stunts', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.723Z' },
  { id: 'super-smash-flash-2', title: 'Super Smash Flash 2', description: 'Play Super Smash Flash 2 online for free!', category: 'action', tags: ['new', 'top'], thumbnail: 'https://images.twoplayergames.org/files/games/o3/super-smash-flash-2-v1.3/super-smash-flash2.jpg?auto=format&amp;w=100', embedUrl: 'https://www.twoplayergames.org/embed/super-smash-flash-2', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.723Z' },
  { id: 'stickman-battle-fighting', title: 'Stickman Battle Fighting', description: 'Play Stickman Battle Fighting online for free!', category: 'action', tags: ['new', 'top'], thumbnail: 'https://images.twoplayergames.org/files/games/other/stickman-battle-fighting.jpg?auto=format&amp;w=100', embedUrl: 'https://www.twoplayergames.org/embed/stickman-battle-fighting', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.723Z' },
  { id: 'cat', title: 'Cat', description: 'Play Cat online for free!', category: 'action', tags: ['new', 'top'], thumbnail: 'https://images.twoplayergames.org/files/games/o1/cat-upt.jpg?auto=format&amp;w=100', embedUrl: 'https://www.twoplayergames.org/embed/cat', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.723Z' },
  { id: 'cool-supercars-stunts', title: 'Cool SuperCars Stunts', description: 'Play Cool SuperCars Stunts online for free!', category: 'action', tags: ['new', 'top'], thumbnail: 'https://images.twoplayergames.org/files/games/other/cool-supercars-stunts.jpg?auto=format&amp;w=100', embedUrl: 'https://www.twoplayergames.org/embed/cool-supercars-stunts', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.723Z' },
  { id: 'fish-eat-fish', title: 'Fish Eat Fish', description: 'Play Fish Eat Fish online for free!', category: 'action', tags: ['new', 'top'], thumbnail: 'https://images.twoplayergames.org/files/games/o5/Fish_Eat_Fish/fish-eat-fish.jpg?auto=format&amp;w=100', embedUrl: 'https://www.twoplayergames.org/embed/fish-eat-fish', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.723Z' },
  { id: 'snow-rush-3d', title: 'Snow Rush 3D', description: 'Play Snow Rush 3D online for free!', category: 'action', tags: ['new', 'top'], thumbnail: 'https://images.twoplayergames.org/files/games/g1/snow-rush-3d-v2/Snow-Rush-3D-v2.jpg?auto=format&amp;w=100', embedUrl: 'https://www.twoplayergames.org/embed/snow-rush-3d', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.723Z' },
  { id: 'dragon-ball-z-battle', title: 'Dragon Ball Z Battle', description: 'Play Dragon Ball Z Battle online for free!', category: 'action', tags: ['new', 'top'], thumbnail: 'https://images.twoplayergames.org/files/games/o5/dragon-ball-z-battle.jpg?auto=format&amp;w=100', embedUrl: 'https://www.twoplayergames.org/embed/dragon-ball-z-battle', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.723Z' },
  { id: 'city-bike-stunt-2', title: 'City Bike Stunt 2', description: 'Play City Bike Stunt 2 online for free!', category: 'action', tags: ['new', 'top'], thumbnail: 'https://images.twoplayergames.org/files/games/o1/City_Bike_Stunt_2/City_Bike_Stunt_2.jpg?auto=format&amp;w=100', embedUrl: 'https://www.twoplayergames.org/embed/city-bike-stunt-2', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.723Z' },
  { id: 'stick-war-infinity-duel', title: 'Stick War: Infinity Duel', description: 'Play Stick War: Infinity Duel online for free!', category: 'action', tags: ['new', 'top'], thumbnail: 'https://images.twoplayergames.org/files/games/other/Stick_War_Infinity_Duel.jpg?auto=format&amp;w=100', embedUrl: 'https://www.twoplayergames.org/embed/stick-war-infinity-duel', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.723Z' },
  { id: 'wresle-bros', title: 'Wrestle Bros', description: 'Play Wrestle Bros online for free!', category: 'action', tags: ['new', 'top'], thumbnail: 'https://images.twoplayergames.org/files/games/other/WrestleBros.jpg?auto=format&amp;w=100', embedUrl: 'https://www.twoplayergames.org/embed/wresle-bros', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.723Z' },
  { id: 'soccer-bros', title: 'Soccer Bros', description: 'Play Soccer Bros online for free!', category: 'action', tags: ['new', 'top'], thumbnail: 'https://images.twoplayergames.org/files/games/other/soccer-bros.jpg?auto=format&amp;w=100', embedUrl: 'https://www.twoplayergames.org/embed/soccer-bros', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.723Z' },
  { id: 'crazy-bike-stunts', title: 'Crazy Bike Stunts', description: 'Play Crazy Bike Stunts online for free!', category: 'action', tags: ['new', 'top'], thumbnail: 'https://images.twoplayergames.org/files/games/other/crazy-bike-stunts.jpg?auto=format&amp;w=100', embedUrl: 'https://www.twoplayergames.org/embed/crazy-bike-stunts', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.723Z' },
  { id: 'rolling-balls-sea-race', title: 'Rolling Balls Sea Race', description: 'Play Rolling Balls Sea Race online for free!', category: 'action', tags: ['new', 'top'], thumbnail: 'https://images.twoplayergames.org/files/games/g1/rolling-balls-sea-race/rolling-balls-sea-race.jpg?auto=format&amp;w=100', embedUrl: 'https://www.twoplayergames.org/embed/rolling-balls-sea-race', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.723Z' },
  { id: 'dragon-fist-3', title: 'Dragon Fist 3', description: 'Play Dragon Fist 3 online for free!', category: 'action', tags: ['new', 'top'], thumbnail: 'https://images.twoplayergames.org/files/games/o3/dragon-fist-3.jpg?auto=format&amp;w=100', embedUrl: 'https://www.twoplayergames.org/embed/dragon-fist-3', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.723Z' },
  { id: 'bleach-vs-naruto', title: 'Bleach vs Naruto', description: 'Play Bleach vs Naruto online for free!', category: 'action', tags: ['new', 'top'], thumbnail: 'https://images.twoplayergames.org/files/games/o5/bleach-vs-naruto/bleach-vs-naruto.jpg?auto=format&amp;w=100', embedUrl: 'https://www.twoplayergames.org/embed/bleach-vs-naruto', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.723Z' },
  { id: 'master-chess', title: 'Master Chess', description: 'Play Master Chess online for free!', category: 'action', tags: ['new', 'top'], thumbnail: 'https://images.twoplayergames.org/files/games/mobile/o1/Master_Chess/master-chess-v2.jpg?auto=format&amp;w=100', embedUrl: 'https://www.twoplayergames.org/embed/master-chess', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.723Z' },
  { id: 'two-player-gold-miner', title: 'Two Player Gold Miner', description: 'Play Two Player Gold Miner online for free!', category: 'action', tags: ['new', 'top'], thumbnail: 'https://images.twoplayergames.org/files/games/o1/Two_Player_Gold_Miner.jpg?auto=format&amp;w=100', embedUrl: 'https://www.twoplayergames.org/embed/two-player-gold-miner', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.723Z' },
  { id: 'gun-mayhem', title: 'Gun Mayhem', description: 'Play Gun Mayhem online for free!', category: 'action', tags: ['new', 'top'], thumbnail: 'https://images.twoplayergames.org/files/games/o3/gun-mayhem-v3.jpg?auto=format&amp;w=100', embedUrl: 'https://www.twoplayergames.org/embed/gun-mayhem', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.723Z' },
  { id: 'two-punk-racing', title: 'Two Punk Racing', description: 'Play Two Punk Racing online for free!', category: 'action', tags: ['new', 'top'], thumbnail: 'https://images.twoplayergames.org/files/games/other/two-punk-racing.jpg?auto=format&amp;w=100', embedUrl: 'https://www.twoplayergames.org/embed/two-punk-racing', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.723Z' },
  { id: 'atv-ultimate-offroad', title: 'ATV Ultimate OffRoad', description: 'Play ATV Ultimate OffRoad online for free!', category: 'action', tags: ['new', 'top'], thumbnail: 'https://images.twoplayergames.org/files/games/o1/ATV_Ultimate_OffRoad/ATV_Ultimate_OffRoad.jpg?auto=format&amp;w=100', embedUrl: 'https://www.twoplayergames.org/embed/atv-ultimate-offroad', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.723Z' },
  { id: 'zombie-mission-3', title: 'Zombie Mission 3', description: 'Play Zombie Mission 3 online for free!', category: 'action', tags: ['new', 'top'], thumbnail: 'https://images.twoplayergames.org/files/games/other/Zombie_Mission_3v2/Zombie_Mission_3_180x135.jpg?auto=format&amp;w=100', embedUrl: 'https://www.twoplayergames.org/embed/zombie-mission-3', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.723Z' },
  { id: 'zombie-mission-2', title: 'Zombie Mission 2', description: 'Play Zombie Mission 2 online for free!', category: 'action', tags: ['new', 'top'], thumbnail: 'https://images.twoplayergames.org/files/games/other/Zombie_Mission_2/Zombie_Mission_2_180x135.jpg?auto=format&amp;w=100', embedUrl: 'https://www.twoplayergames.org/embed/zombie-mission-2', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.723Z' },
  { id: 'zombie-mission-5', title: 'Zombie Mission 5', description: 'Play Zombie Mission 5 online for free!', category: 'action', tags: ['new', 'top'], thumbnail: 'https://images.twoplayergames.org/files/games/o1/Zombie_Mission_5/Zombie_Mission_5.jpg?auto=format&amp;w=100', embedUrl: 'https://www.twoplayergames.org/embed/zombie-mission-5', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.723Z' },
  { id: 'ludo-online', title: 'Ludo Online', description: 'Play Ludo Online online for free!', category: 'action', tags: ['new', 'top'], thumbnail: 'https://images.twoplayergames.org/files/games/other/Ludo-Online/Ludo_Online_180x135.jpg?auto=format&amp;w=100', embedUrl: 'https://www.twoplayergames.org/embed/ludo-online', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.723Z' },
  { id: 'two-bike-stunts', title: 'Two Bike Stunts', description: 'Play Two Bike Stunts online for free!', category: 'action', tags: ['new', 'top'], thumbnail: 'https://images.twoplayergames.org/files/games/o1/Two_Bike_Stunts/two-bike-stunts.jpg?auto=format&amp;w=100', embedUrl: 'https://www.twoplayergames.org/embed/two-bike-stunts', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.723Z' },
  { id: 'bad-ice-cream', title: 'Bad Ice-Cream', description: 'Play Bad Ice-Cream online for free!', category: 'action', tags: ['new', 'top'], thumbnail: 'https://images.twoplayergames.org/files/games/o3/Bad_ice_Cream_180x135.jpg?auto=format&amp;w=100', embedUrl: 'https://www.twoplayergames.org/embed/bad-ice-cream', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.723Z' },
  { id: 'football-legends-2021', title: 'Football Legends 2021', description: 'Play Football Legends 2021 online for free!', category: 'action', tags: ['new', 'top'], thumbnail: 'https://images.twoplayergames.org/files/games/other/Football-Legends-2021.jpg?auto=format&amp;w=100', embedUrl: 'https://www.twoplayergames.org/embed/football-legends-2021', rating: 0, plays: 0, createdAt: '2026-08-29T23:06:38.723Z' },
];;

games.forEach(g => {
  if (!g.thumbnail) {
    g.thumbnail = makeThumbnail(g.title, g.category);
  }
});

export function getAllGames(): Game[] {
  return games;
}

export function updateGames(newGames: Game[]) {
  games.length = 0;
  games.push(...newGames.map(g => ({ ...g, tags: g.tags || [] })));
}

export function getGameById(id: string): Game | undefined {
  return games.find(g => g.id === id);
}

export function getGamesByCategory(categoryId: string): Game[] {
  return games.filter(g => g.category === categoryId);
}

export function getFeaturedGames(): Game[] {
  return games.filter(g => g.tags && g.tags.includes('featured'));
}

export function getPopularGames(playsMap?: Record<string, number>): Game[] {
  const list = [...games];
  if (playsMap) {
    return list.sort((a, b) => (playsMap[b.id] ?? b.plays) - (playsMap[a.id] ?? a.plays));
  }
  return list.sort((a, b) => b.plays - a.plays);
}

export function getNewGames(): Game[] {
  const tenDaysMs = 10 * 24 * 60 * 60 * 1000;
  const now = Date.now();
  return games.filter(g => {
    if (!g.createdAt) return false;
    const addedAt = new Date(g.createdAt).getTime();
    return now - addedAt <= tenDaysMs;
  });
}

export function getTrendingGames(playsMap?: Record<string, number>): Game[] {
  const trending = games.filter(g => g.tags && g.tags.includes('trending'));
  if (trending.length > 0) {
    return trending.sort((a, b) => {
      const aPlays = playsMap?.[a.id] ?? a.plays;
      const bPlays = playsMap?.[b.id] ?? b.plays;
      return bPlays - aPlays;
    });
  }
  return [...games].sort((a, b) => {
    const aPlays = playsMap?.[a.id] ?? a.plays;
    const bPlays = playsMap?.[b.id] ?? b.plays;
    return bPlays - aPlays;
  }).slice(0, 18);
}

export function getUpAndComingGames(playsMap?: Record<string, number>): Game[] {
  const now = Date.now();
  return [...games].sort((a, b) => {
    const aPlays = playsMap?.[a.id] ?? a.plays;
    const bPlays = playsMap?.[b.id] ?? b.plays;
    const aDays = a.createdAt ? Math.max(1, (now - new Date(a.createdAt).getTime()) / (1000 * 60 * 60 * 24)) : 30;
    const bDays = b.createdAt ? Math.max(1, (now - new Date(b.createdAt).getTime()) / (1000 * 60 * 60 * 24)) : 30;
    const aVelocity = aPlays / aDays;
    const bVelocity = bPlays / bDays;
    return bVelocity - aVelocity;
  });
}

export function getMostVisitedGames(playsMap?: Record<string, number>): Game[] {
  const list = [...games];
  if (playsMap) {
    return list.sort((a, b) => (playsMap[b.id] ?? b.plays) - (playsMap[a.id] ?? a.plays));
  }
  return list.sort((a, b) => b.plays - a.plays);
}

export function getRecommendedGames(): Game[] {
  const recommended = games.filter(g => g.rating >= 4.5);
  if (recommended.length > 0) {
    return recommended.sort((a, b) => {
      if (b.rating === a.rating) return b.plays - a.plays;
      return b.rating - a.rating;
    });
  }
  return [...games].sort((a, b) => b.plays - a.plays).slice(0, 18);
}


export function searchGames(query: string): Game[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return games.filter(g =>
    g.title.toLowerCase().includes(q) ||
    g.description.toLowerCase().includes(q) ||
    g.category.toLowerCase().includes(q) ||
    (g.tags && g.tags.some(t => t.toLowerCase().includes(q)))
  );
}

export function getRelatedGames(gameId: string, limit: number = 6): Game[] {
  const game = getGameById(gameId);
  if (!game) return [];
  return games
    .filter(g => g.id !== gameId && g.category === game.category)
    .slice(0, limit);
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find(c => c.id === id);
}

export function getGameCountByCategory(categoryId: string): number {
  return games.filter(g => g.category === categoryId).length;
}

export function formatPlays(plays: number): string {
  if (plays >= 1000000) return `${(plays / 1000000).toFixed(1)}M`;
  if (plays >= 1000) return `${(plays / 1000).toFixed(0)}K`;
  return plays.toString();
}
