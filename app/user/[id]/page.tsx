import UserProfile from '../../../components/UserProfile';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function UserPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const API_BASE = process.env.API_URL || 'http://localhost:8080';
  
  let user = null;
  let res = await fetch(`${API_BASE}/api/users/${id}`, { cache: 'no-store' });
  if (res.ok) {
    user = await res.json();
  } else {
    // Try lookup by name
    res = await fetch(`${API_BASE}/api/users/lookup/${id}`, { cache: 'no-store' });
    if (res.ok) {
      user = await res.json();
    }
  }

  if (!user) {
    notFound();
  }

  const profileUser = {
    ...user,
    favoriteGames: [],
    followersCount: 0,
    followingCount: 0
  };

  return (
    <div className="animate-fade-in">
      <UserProfile profileUser={profileUser} submissions={[]} />
    </div>
  );
}
