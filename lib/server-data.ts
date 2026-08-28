const API_BASE = process.env.API_URL || 'http://localhost:8080';

export async function getAllGames() {
  try {
    const res = await fetch(`${API_BASE}/api/games`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    console.error("Error fetching games:", e);
    return [];
  }
}

export async function getGameById(id: string) {
  try {
    const res = await fetch(`${API_BASE}/api/games/${id}`, { cache: 'no-store' });
    if (!res.ok) return undefined;
    return res.json();
  } catch (e) {
    console.error(`Error fetching game ${id}:`, e);
    return undefined;
  }
}

export async function getGamesByCategory(categoryId: string) {
  try {
    const res = await fetch(`${API_BASE}/api/games/category/${categoryId}`, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    console.error(`Error fetching games for category ${categoryId}:`, e);
    return [];
  }
}
