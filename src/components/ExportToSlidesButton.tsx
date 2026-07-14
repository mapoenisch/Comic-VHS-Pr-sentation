import React, { useState, useEffect } from 'react';
import { Presentation, Loader2 } from 'lucide-react';
import { initAuth, googleSignIn, getAccessToken, logout } from '../lib/firebase';
import { User } from 'firebase/auth';

export function ExportToSlidesButton() {
  const [needsAuth, setNeedsAuth] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = initAuth(
      (u) => {
        setUser(u);
        setNeedsAuth(false);
      },
      () => {
        setUser(null);
        setNeedsAuth(true);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setNeedsAuth(false);
      }
    } catch (err) {
      console.error('Login failed:', err);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleExport = async () => {
    if (!window.confirm('Möchten Sie diese Präsentation als neues Dokument in Ihr Google Drive exportieren?')) return;
    
    setIsExporting(true);
    try {
      const token = await getAccessToken();
      if (!token) throw new Error('No access token');
      
      const res = await fetch('/api/export-slides', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ slides: (await import('../data/slides')).slides })
      });
      
      const data = await res.json();
      if (data.presentationId) {
        window.open(`https://docs.google.com/presentation/d/${data.presentationId}/edit`, '_blank');
      } else {
        alert('Fehler beim Exportieren: ' + JSON.stringify(data));
      }
    } catch (err) {
      console.error('Export failed:', err);
      alert('Export failed. Please check console for details.');
    } finally {
      setIsExporting(false);
    }
  };

  if (needsAuth) {
    return (
      <button 
        onClick={handleLogin}
        disabled={isLoggingIn}
        className="flex items-center gap-2 p-3 text-[#EEEBE1] hover:bg-white/10 rounded-xl transition-colors disabled:opacity-50"
        title="Mit Google anmelden für Export"
      >
        {isLoggingIn ? <Loader2 className="w-5 h-5 animate-spin" /> : <Presentation className="w-5 h-5" />}
        <span className="text-sm font-medium hidden sm:inline">Mit Google anmelden</span>
      </button>
    );
  }

  return (
    <button 
      onClick={handleExport}
      disabled={isExporting}
      className="flex items-center gap-2 p-3 text-amber-300 hover:bg-white/10 hover:text-amber-200 rounded-xl transition-colors disabled:opacity-50"
      title="Als Google Slides exportieren"
    >
      {isExporting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Presentation className="w-5 h-5" />}
      <span className="text-sm font-medium hidden sm:inline">
        {isExporting ? 'Exportiere...' : 'Zu Google Slides'}
      </span>
    </button>
  );
}
