export interface SyncAction {
  id: string;
  type: 'vote' | 'favorite';
  gameId: string;
  action: string; // 'like', 'dislike', 'remove' for vote; 'add', 'remove' for favorite
  timestamp: number;
}

const SYNC_QUEUE_KEY = 'pgz_sync_queue';

export function getSyncQueue(): SyncAction[] {
  if (typeof window === 'undefined') return [];
  try {
    const queue = localStorage.getItem(SYNC_QUEUE_KEY);
    return queue ? JSON.parse(queue) : [];
  } catch {
    return [];
  }
}

export function saveToSyncQueue(action: SyncAction) {
  if (typeof window === 'undefined') return;
  const queue = getSyncQueue();
  
  // If a similar action for the same game exists, replace it 
  const existingIndex = queue.findIndex(
    a => a.type === action.type && a.gameId === action.gameId
  );
  
  if (existingIndex >= 0) {
    queue[existingIndex] = action;
  } else {
    queue.push(action);
  }
  
  localStorage.setItem(SYNC_QUEUE_KEY, JSON.stringify(queue));
}

export function removeFromSyncQueue(id: string) {
  if (typeof window === 'undefined') return;
  const queue = getSyncQueue();
  const newQueue = queue.filter(a => a.id !== id);
  localStorage.setItem(SYNC_QUEUE_KEY, JSON.stringify(newQueue));
}

export async function processSyncQueue() {
  if (typeof window === 'undefined') return;
  const queue = getSyncQueue();
  if (queue.length === 0) return;

  for (const item of queue) {
    try {
      if (item.type === 'vote') {
        let method = 'POST';
        if (item.action === 'remove') {
          method = 'DELETE';
        }
        
        const res = await fetch(`/api/votes/${item.gameId}`, {
          method,
          headers: method === 'POST' ? { 'Content-Type': 'application/json' } : undefined,
          body: method === 'POST' ? JSON.stringify({ type: item.action === 'like' ? 'up' : 'down' }) : undefined,
        });
        
        // If the fetch was successful, remove from queue
        // Or if it was a 400 bad request (e.g., already liked), remove it to prevent infinite loop
        if (res.ok || res.status === 400 || res.status === 409) {
          removeFromSyncQueue(item.id);
        }
      } else if (item.type === 'favorite') {
        const res = await fetch(`/api/auth/favorite/${item.gameId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: item.action }),
        });
        
        if (res.ok || res.status === 400 || res.status === 409) {
          removeFromSyncQueue(item.id);
        }
      }
    } catch (e) {
      console.error('Background sync failed for item:', item, e);
      // Leave in queue for next time (e.g., network error)
    }
  }
}
