'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Next.js Error Boundary caught an error:", error);
  }, [error]);

  return (
    <div style={{ 
      padding: '40px', 
      margin: '40px auto', 
      maxWidth: '800px', 
      backgroundColor: '#fef2f2', 
      border: '4px solid #ef4444', 
      borderRadius: '8px', 
      color: '#7f1d1d',
      fontFamily: 'monospace'
    }}>
      <h2 style={{ fontSize: '24px', marginBottom: '16px', fontWeight: 'bold' }}>⚠️ Game Page Error Boundary Caught an Error!</h2>
      <p style={{ marginBottom: '8px', fontSize: '18px' }}><strong>Message:</strong> {error.message}</p>
      {error.digest && <p style={{ marginBottom: '16px' }}><strong>Digest:</strong> {error.digest}</p>}
      
      <div style={{ backgroundColor: '#fee2e2', padding: '16px', borderRadius: '4px', overflowX: 'auto', marginBottom: '24px' }}>
        <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
          {error.stack}
        </pre>
      </div>

      <button
        onClick={() => reset()}
        style={{
          padding: '12px 24px',
          backgroundColor: '#ef4444',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '16px'
        }}
      >
        Try Again
      </button>
    </div>
  );
}
