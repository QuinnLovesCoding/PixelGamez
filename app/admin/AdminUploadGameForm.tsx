'use client';

import { useState, useRef, FormEvent } from 'react';
import { categories } from '../../lib/data';

export default function AdminUploadGameForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('action');
  
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [gameFile, setGameFile] = useState<File | null>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title || !description || !category || !gameFile) {
      setResult({ success: false, message: 'Please fill out all required fields and select a game file (.zip or .html).' });
      return;
    }

    setIsSubmitting(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('gameFile', gameFile);
      
      if (thumbnailFile) {
        formData.append('thumbnail', thumbnailFile);
      }

      const res = await fetch('/api/admin/games/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setResult({
          success: true,
          message: `Game "${title}" successfully uploaded and live! Game ID: ${data.gameId}`,
        });
        // Reset form
        setTitle('');
        setDescription('');
        setCategory('action');
        setThumbnailFile(null);
        setGameFile(null);
      } else {
        setResult({ success: false, message: data.error || 'Upload failed.' });
      }
    } catch (err) {
      setResult({ success: false, message: 'Network error. Try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '1rem',
    borderRadius: '12px',
    border: '1px solid rgba(255,255,255,0.1)',
    background: 'rgba(0,0,0,0.2)',
    color: 'var(--text-primary)',
    fontSize: '1rem',
    outline: 'none',
    transition: 'all 0.3s ease',
  };

  const focusStyle = (e: any) => {
    e.target.style.border = '1px solid var(--accent-primary)';
    e.target.style.boxShadow = '0 0 0 4px rgba(99, 102, 241, 0.1)';
  };

  const blurStyle = (e: any) => {
    e.target.style.border = '1px solid rgba(255,255,255,0.1)';
    e.target.style.boxShadow = 'none';
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: 600,
    fontSize: '0.95rem',
    color: 'var(--text-secondary)',
    letterSpacing: '0.02em'
  };

  return (
    <div className="admin-card" style={{
      background: 'var(--bg-secondary)',
      border: '1px solid var(--border-color)',
      borderRadius: '16px',
      overflow: 'hidden',
      padding: '0'
    }}>
      <div className="admin-card__header" style={{
        padding: '2rem 2.5rem',
        borderBottom: '1px solid var(--border-color)',
        background: 'var(--bg-tertiary)'
      }}>
        <h2 className="admin-card__title" style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>
          Direct Game Upload
        </h2>
        <p style={{ marginTop: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.5 }}>
          Upload a <code style={{background:'var(--bg-primary)', padding:'2px 6px', borderRadius:'4px', color:'var(--text-primary)'}}>.zip</code> file containing an HTML5/Godot game (with an <code style={{background:'var(--bg-primary)', padding:'2px 6px', borderRadius:'4px', color:'var(--text-primary)'}}>index.html</code>) or a single <code style={{background:'var(--bg-primary)', padding:'2px 6px', borderRadius:'4px', color:'var(--text-primary)'}}>.html</code> file. It will be instantly added to the database and hosted locally.
        </p>
      </div>

      <div className="admin-card__body" style={{ padding: '2.5rem' }}>
        {result && (
          <div style={{
            padding: '1.25rem',
            borderRadius: '12px',
            marginBottom: '2rem',
            background: result.success ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            border: `1px solid ${result.success ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
            color: result.success ? '#4ade80' : '#f87171',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontWeight: 500
          }}>
            {result.success ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            )}
            {result.message}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.75rem' }}>
            <div>
              <label style={labelStyle}>Title <span style={{color: 'var(--accent-primary)'}}>*</span></label>
              <input 
                type="text" 
                value={title} 
                onChange={e => setTitle(e.target.value)} 
                onFocus={focusStyle}
                onBlur={blurStyle}
                required
                placeholder="E.g. Super Awesome Game"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Category <span style={{color: 'var(--accent-primary)'}}>*</span></label>
              <select 
                value={category} 
                onChange={e => setCategory(e.target.value)}
                onFocus={focusStyle}
                onBlur={blurStyle}
                style={{...inputStyle, appearance: 'none', backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23cbd5e1\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'%3E%3C/polyline%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center'}}
              >
                {categories.map(c => (
                  <option key={c.id} value={c.id} style={{background: '#1e293b'}}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label style={labelStyle}>Description <span style={{color: 'var(--accent-primary)'}}>*</span></label>
            <textarea 
              value={description} 
              onChange={e => setDescription(e.target.value)} 
              onFocus={focusStyle}
              onBlur={blurStyle}
              required
              rows={4}
              placeholder="What is this game about? How do you play?"
              style={{...inputStyle, resize: 'vertical'}}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.75rem' }}>
            {/* Thumbnail Upload Area */}
            <div>
              <label style={labelStyle}>Thumbnail <span style={{fontWeight: 400, opacity: 0.5}}>(Optional)</span></label>
              <label 
                htmlFor="thumbnail-upload"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '2.5rem 1.5rem',
                  border: '2px dashed rgba(255,255,255,0.1)',
                  borderRadius: '16px',
                  background: 'rgba(0,0,0,0.2)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  color: thumbnailFile ? '#4ade80' : 'var(--text-dim)',
                  height: '180px'
                }}
                onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--accent-primary)'; e.currentTarget.style.background = 'rgba(99, 102, 241, 0.05)'; }}
                onMouseOut={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.background = 'rgba(0,0,0,0.2)'; }}
              >
                {thumbnailFile ? (
                   <>
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginBottom: '12px' }}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    <span style={{ fontWeight: 600, fontSize: '1rem', color: '#fff', textAlign: 'center' }}>{thumbnailFile.name}</span>
                    <span style={{ fontSize: '0.8rem', color: '#4ade80', marginTop: '6px' }}>Ready to upload</span>
                   </>
                ) : (
                  <>
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '12px' }}>
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                    <span style={{ fontWeight: 500, fontSize: '1rem', color: 'var(--text-secondary)' }}>Click to upload image</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '6px' }}>JPG, PNG or GIF</span>
                  </>
                )}
              </label>
              <input 
                id="thumbnail-upload"
                type="file" 
                accept="image/*"
                onChange={e => setThumbnailFile(e.target.files?.[0] || null)}
                style={{ display: 'none' }}
              />
            </div>

            {/* Game ZIP Upload Area */}
            <div>
              <label style={labelStyle}>Game File <span style={{color: 'var(--accent-primary)'}}>*</span></label>
              <label 
                htmlFor="game-upload"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '2.5rem 1.5rem',
                  border: '2px dashed rgba(255,255,255,0.1)',
                  borderRadius: '16px',
                  background: 'rgba(0,0,0,0.2)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  color: gameFile ? 'var(--accent-primary)' : 'var(--text-dim)',
                  height: '180px'
                }}
                onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--accent-primary)'; e.currentTarget.style.background = 'rgba(99, 102, 241, 0.05)'; }}
                onMouseOut={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.background = 'rgba(0,0,0,0.2)'; }}
              >
                {gameFile ? (
                   <>
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginBottom: '12px' }}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                    <span style={{ fontWeight: 600, fontSize: '1rem', color: '#fff', textAlign: 'center' }}>{gameFile.name}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', marginTop: '6px' }}>{(gameFile.size / 1024 / 1024).toFixed(2)} MB</span>
                   </>
                ) : (
                  <>
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '12px' }}>
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                    <span style={{ fontWeight: 500, fontSize: '1rem', color: 'var(--text-secondary)' }}>Click to upload game</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '6px' }}>.ZIP or .HTML</span>
                  </>
                )}
              </label>
              <input 
                id="game-upload"
                type="file" 
                accept=".zip,.html"
                onChange={e => setGameFile(e.target.files?.[0] || null)}
                required
                style={{ display: 'none' }}
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            style={{
              marginTop: '1.5rem',
              padding: '1.25rem',
              fontSize: '1.1rem',
              fontWeight: 600,
              borderRadius: '8px',
              border: 'none',
              background: isSubmitting ? 'var(--bg-tertiary)' : 'var(--accent-primary)',
              color: isSubmitting ? 'var(--text-dim)' : '#fff',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px'
            }}
            onMouseOver={(e) => { if(!isSubmitting) e.currentTarget.style.background = 'var(--accent-hover)'; }}
            onMouseOut={(e) => { if(!isSubmitting) e.currentTarget.style.background = 'var(--accent-primary)'; }}
          >
            {isSubmitting ? (
              <>
                <div style={{ width: '20px', height: '20px', border: '3px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                Uploading & Extracting...
              </>
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                Deploy Game Live
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
