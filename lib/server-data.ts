import { prisma } from './prisma';
import { fetchWithCache } from './cache';

export async function getAllGames() {
  return fetchWithCache('games:all', async () => {
    const games = await prisma.game.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return games.map(g => ({
      ...g,
      createdAt: g.createdAt?.toISOString()
    }));
  }, 5); // Cache for 5 mins
}

export async function getGameById(id: string) {
  return fetchWithCache(`games:id:${id}`, async () => {
    const g = await prisma.game.findUnique({ where: { id } });
    if (!g) return undefined;
    return {
      ...g,
      createdAt: g.createdAt?.toISOString()
    };
  }, 5);
}

export async function getGamesByCategory(categoryId: string) {
  return fetchWithCache(`games:cat:${categoryId}`, async () => {
    const games = await prisma.game.findMany({
      where: { category: categoryId },
      orderBy: { createdAt: 'desc' }
    });
    return games.map(g => ({
      ...g,
      createdAt: g.createdAt?.toISOString()
    }));
  }, 5);
}
