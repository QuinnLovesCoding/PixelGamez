'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode, useRef } from 'react';
import { saveToSyncQueue, processSyncQueue } from '../lib/syncService';

interface User {
  id: string;
  email: string;
  displayName: string;
  role: 'user' | 'moderator' | 'owner';
  roles?: string[];
  avatarUrl: string;
  aboutMe: string;
  workingOn: string;
  country: string;
  favoriteGames: string[];
  recentGames: string[];
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isModerator: boolean;
  isOwner: boolean;
  loading: boolean;
  showAuthModal: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  loginWithGoogle: (credential: string) => Promise<{ error?: string; isNewUser?: boolean }>;
  register: (email: string, password: string, displayName: string, code: string) => Promise<{ error?: string }>;
  requestOTP: (email: string) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
  uploadAvatar: (file: File) => Promise<{ error?: string }>;
  updateBio: (data: { aboutMe?: string; workingOn?: string; country?: string }) => Promise<{ error?: string }>;
  toggleFavorite: (gameId: string, action: 'add' | 'remove') => Promise<{ error?: string }>;
  addRecentGame: (gameId: string) => Promise<void>;
  refreshUser: () => Promise<void>;
  updateDisplayName: (displayName: string) => Promise<{ error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('pixelgamez_user');
      if (stored) {
        try { return JSON.parse(stored); } catch {}
      }
    }
    return null;
  });
  const [loading, setLoading] = useState(!user);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const updateUserState = useCallback((newUser: User | null) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem('pixelgamez_user', JSON.stringify(newUser));
    } else {
      localStorage.removeItem('pixelgamez_user');
    }
  }, []);

  const fetchUser = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/me', {
      credentials: 'include',
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      const data = await res.json();
      // /api/auth/me returns the user object directly, not wrapped in a user field
      const fetchedUser = res.ok && data.id ? data : null;
      updateUserState(fetchedUser);
    } catch {
      updateUserState(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    // Start background sync interval
    const interval = setInterval(() => {
      processSyncQueue();
    }, 5000); // Check every 5 seconds
    
    // Also try to sync when returning online
    const handleOnline = () => {
      processSyncQueue();
    };
    
    if (typeof window !== 'undefined') {
      window.addEventListener('online', handleOnline);
    }
    
    return () => {
      clearInterval(interval);
      if (typeof window !== 'undefined') {
        window.removeEventListener('online', handleOnline);
      }
    };
  }, []);

  const login = async (email: string, password: string) => {
    const res = await fetch('/api/auth/login', {
      credentials: 'include',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) return { error: data.error || 'Login failed.' };
    updateUserState(data.user);
    return { success: true };
  };

  const loginWithGoogle = async (credential: string) => {
    const res = await fetch('/api/auth/google', {
      credentials: 'include',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken: credential }),
    });
    const data = await res.json();
    if (!res.ok) return { error: data.error || 'Google login failed.' };
    updateUserState(data.user);
    return { success: true, isNewUser: data.isNewUser };
  };

  const requestOTP = async (email: string) => {
    const res = await fetch('/api/auth/register-otp', {
      credentials: 'include',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (!res.ok) return { error: data.error || 'Failed to send OTP.' };
    return {};
  };

  const register = async (email: string, password: string, displayName: string, code: string) => {
    const res = await fetch('/api/auth/register', {
      credentials: 'include',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, displayName, code }),
    });
    const data = await res.json();
    if (!res.ok) return { error: data.error || 'Registration failed.' };
    updateUserState(data.user);
    return { success: true };
  };

  const logout = async () => {
    await fetch('/api/auth/logout', {
      credentials: 'include', method: 'POST' });
    updateUserState(null);
  };

  const uploadAvatar = async (file: File) => {
    const formData = new FormData();
    formData.append('avatar', file);
    const res = await fetch('/api/auth/avatar', {
      credentials: 'include', method: 'POST', body: formData });
    const data = await res.json();
    if (!res.ok) return { error: data.error || 'Upload failed.' };
    updateUserState(data.user);
    return {};
  };

  const refreshUser = async () => {
    await fetchUser();
  };

  const updateBio = async (data: { aboutMe?: string; workingOn?: string; country?: string }) => {
    const res = await fetch('/api/auth/bio', {
      credentials: 'include',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) return { error: result.error || 'Update failed.' };
    updateUserState(result.user);
    return {};
  };

  const updateDisplayName = async (displayName: string) => {
    const res = await fetch('/api/auth/display-name', {
      credentials: 'include',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ displayName }),
    });
    const result = await res.json();
    if (!res.ok) return { error: result.error || 'Update failed.' };
    updateUserState(result.user);
    return {};
  };

  const toggleFavorite = async (gameId: string, action: 'add' | 'remove') => {
    let previousFavorites: string[] = [];
    if (user) {
      previousFavorites = user.favoriteGames || [];
      const newFavorites = action === 'add' ? [...previousFavorites, gameId] : previousFavorites.filter(id => id !== gameId);
      updateUserState({ ...user, favoriteGames: newFavorites });
    }
    try {
      const res = await fetch(`/api/auth/favorite/${gameId}`, {
        credentials: 'include',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      });
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || 'Failed.');
      }
    } catch (e) {
      // Save action to offline sync queue instead of reverting
      saveToSyncQueue({
        id: Date.now().toString() + Math.random().toString(36).substring(2),
        type: 'favorite',
        gameId,
        action,
        timestamp: Date.now()
      });
    }
    return {};
  };

  const addRecentGame = async (gameId: string) => {
    if (!user) return;
    const res = await fetch('/api/user/recent', {
      credentials: 'include',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gameId })
    });
    if (res.ok) {
      const data = await res.json();
      updateUserState(data.user);
    }
  };

  // Removed global loading spinner to fix hydration errors and improve SSR.
  // Individual components that require auth should check the `loading` state instead.

  return (
    <AuthContext.Provider value={{
      user,
      isLoggedIn: !!user,
      isModerator: user?.role === 'moderator' || user?.role === 'owner',
      isOwner: user?.role === 'owner',
      loading,
      showAuthModal,
      openAuthModal: () => setShowAuthModal(true),
      closeAuthModal: () => setShowAuthModal(false),
      login,
      loginWithGoogle,
      register,
      requestOTP,
      logout,
      uploadAvatar,
      updateBio,
      toggleFavorite,
      addRecentGame,
      refreshUser,
      updateDisplayName,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
