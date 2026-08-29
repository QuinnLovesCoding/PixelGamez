'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '../../../../components/AuthContext';
import GamePlayer from '../../../../components/GamePlayer';
import Link from 'next/link';

interface Submission {
  id: string;
  title: string;
  description: string;
  category: string;
  gameType: string;
  embedUrl: string;
  developerName: string;
  submittedAt: string;
  status: string;
}

export default function AdminTestGamePage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const { isLoggedIn, isOwner, isModerator, loading } = useAuth();
  
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [fetching, setFetching] = useState(true);
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (loading) return;
    
    if (!isLoggedIn || (!isOwner && !isModerator)) {
      setFetching(false);
      return;
    }

    const fetchSubmission = async () => {
      try {
        const res = await fetch(`/api/admin/pending-games/${id}`);
        if (res.ok) {
          setSubmission(await res.json());
        } else {
          setError('Submission not found or already processed.');
        }
      } catch (err) {
        setError('Failed to load submission.');
      } finally {
        setFetching(false);
      }
    };

    fetchSubmission();
  }, [id, loading, isLoggedIn, isOwner, isModerator]);

  async function handleAction(action: 'approve' | 'reject') {
    if (!submission) return;
    
    const confirmMessage = action === 'approve' 
      ? `Are you sure you want to approve "${submission.title}"? It will go live immediately.` 
      : `Are you sure you want to reject "${submission.title}"?`;
      
    if (!confirm(confirmMessage)) return;

    setActionInProgress(action);
    try {
      const res = await fetch(`/api/admin/${action}/${submission.id}`, { method: 'POST' });
      if (res.ok) {
        router.push('/admin');
      } else {
        alert(`Failed to ${action} game.`);
        setActionInProgress(null);
      }
    } catch {
      alert('Network error.');
      setActionInProgress(null);
    }
  }

  if (loading || fetching) {
    return <div style={{ padding: '100px 20px', textAlign: 'center' }}>Loading...</div>;
  }

  if (!isLoggedIn || (!isOwner && !isModerator)) {
    return <div style={{ padding: '100px 20px', textAlign: 'center' }}>Access Denied</div>;
  }

  if (error || !submission) {
    return (
      <div style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h2>{error || 'Not found'}</h2>
        <Link href="/admin" style={{ color: 'var(--accent-primary)', marginTop: '20px', display: 'inline-block' }}>
          &larr; Back to Admin
        </Link>
      </div>
    );
  }

  // Create a mock Game object for the GamePlayer component
  const mockGame = {
    id: submission.id,
    title: submission.title,
    embedUrl: submission.embedUrl,
    category: submission.category,
    description: submission.description,
    thumbnail: '',
    tags: [],
    plays: 0,
    likes: 0,
    dislikes: 0,
    rating: 0
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }} className="animate-fade-in">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <Link href="/admin" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: '0.9rem', marginBottom: '8px', display: 'inline-block' }}>
            &larr; Back to Pending
          </Link>
          <h1 style={{ margin: '0' }}>Testing: {submission.title}</h1>
          <div style={{ color: 'var(--text-dim)', fontSize: '0.9rem', marginTop: '4px' }}>
            Submitted by <strong>{submission.developerName}</strong> &bull; Category: {submission.category}
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => handleAction('approve')}
            disabled={actionInProgress !== null}
            style={{
              background: '#10b981',
              color: '#fff',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '6px',
              fontWeight: 'bold',
              cursor: actionInProgress ? 'not-allowed' : 'pointer',
              opacity: actionInProgress ? 0.7 : 1
            }}
          >
            {actionInProgress === 'approve' ? 'Approving...' : '✓ Approve & Publish'}
          </button>
          
          <button
            onClick={() => handleAction('reject')}
            disabled={actionInProgress !== null}
            style={{
              background: 'transparent',
              color: '#ef4444',
              border: '1px solid #ef4444',
              padding: '10px 20px',
              borderRadius: '6px',
              fontWeight: 'bold',
              cursor: actionInProgress ? 'not-allowed' : 'pointer',
              opacity: actionInProgress ? 0.7 : 1
            }}
          >
            {actionInProgress === 'reject' ? 'Rejecting...' : '✕ Reject'}
          </button>
        </div>
      </div>

      <div style={{ background: 'var(--bg-secondary)', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
        <GamePlayer game={mockGame} />
      </div>
      
      <div style={{ marginTop: '24px', padding: '24px', background: 'var(--bg-secondary)', borderRadius: '12px' }}>
        <h3>Description</h3>
        <p style={{ color: 'var(--text-dim)', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>{submission.description}</p>
        
        <div style={{ marginTop: '20px', fontSize: '0.9rem', color: 'var(--text-dim)' }}>
          <strong>Embed URL:</strong> <a href={submission.embedUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--accent-primary)' }}>{submission.embedUrl}</a>
        </div>
      </div>
    </div>
  );
}
