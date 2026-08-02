import { prisma } from './prisma';

export async function getAllGames() {
  const games = await prisma.game.findMany({
    orderBy: { createdAt: 'desc' }
  });
  return games.map(g => ({
    ...g,
    createdAt: g.createdAt?.toISOString()
  }));
}

export async function getGameById(id: string) {
  const g = await prisma.game.findUnique({ where: { id } });
  if (!g) return undefined;
  return {
    ...g,
    createdAt: g.createdAt?.toISOString()
  };
}

export async function getGamesByCategory(categoryId: string) {
  const games = await prisma.game.findMany({
    where: { category: categoryId },
    orderBy: { createdAt: 'desc' }
  });
  return games.map(g => ({
    ...g,
    createdAt: g.createdAt?.toISOString()
  }));
}
