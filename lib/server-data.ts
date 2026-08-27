const API_BASE = process.env.API_URL || 'http://localhost:8080';

export async function getAllGames() {
  const res = await fetch(`${API_BASE}/api/games`, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export async function getGameById(id: string) {
  const res = await fetch(`${API_BASE}/api/games/${id}`, { cache: 'no-store' });
  if (!res.ok) return undefined;
  return res.json();
}

export async function getGamesByCategory(categoryId: string) {
  const res = await fetch(`${API_BASE}/api/games/category/${categoryId}`, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}
