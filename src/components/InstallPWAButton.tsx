'use client';

import { useEffect, useState } from 'react';
import { Download, X } from 'lucide-react';
import { toast } from 'sonner';

const DISMISS_KEY = 'copyexpress-install-dismissed';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

/**
 * Floating "install app" button for visitors.
 *
 * Uses the standard beforeinstallprompt flow (Chrome/Edge/Samsung/Android).
 * Browsers that don't fire the event (iOS Safari) simply never show the
 * button — iOS users can still install via Safari's "Add to Home Screen"
 * thanks to the manifest + apple-touch-icon metadata.
 */
export default function InstallPWAButton() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    try {
      setDismissed(window.localStorage.getItem(DISMISS_KEY) === '1');
    } catch {
      setDismissed(false);
    }

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    };
    window.addEventListener('beforeinstallprompt', onPrompt);
    return () => window.removeEventListener('beforeinstallprompt', onPrompt);
  }, []);

  // Hide once the app is installed / the prompt stops being offered
  useEffect(() => {
    const onInstalled = () => {
      setDeferred(null);
      toast.success('¡CopyExpress instalado!');
    };
    window.addEventListener('appinstalled', onInstalled);
    return () => window.removeEventListener('appinstalled', onInstalled);
  }, []);

  if (!deferred || dismissed) return null;

  const handleInstall = async () => {
    try {
      await deferred.prompt();
      const choice = await deferred.userChoice;
      if (choice.outcome === 'accepted') {
        setDeferred(null);
      }
    } catch {
      toast.error('No se pudo iniciar la instalación');
    }
  };

  const handleDismiss = () => {
    setDismissed(true);
    try {
      window.localStorage.setItem(DISMISS_KEY, '1');
    } catch {
      // ignore storage failures
    }
  };

  return (
    <div className="fixed bottom-5 left-4 z-40 flex items-center gap-1 rounded-full border border-[#C9A94E]/30 bg-[#0F1D32]/95 py-1 pl-1 pr-2 shadow-2xl backdrop-blur">
      <button
        type="button"
        onClick={handleInstall}
        className="flex items-center gap-2 rounded-full bg-[#C9A94E] px-3.5 py-2.5 text-xs font-semibold text-[#0A1628] transition-colors hover:bg-[#D4B965]"
      >
        <Download className="h-4 w-4" />
        Instalar CopyExpress
      </button>
      <button
        type="button"
        onClick={handleDismiss}
        aria-label="Cerrar sugerencia de instalación"
        className="flex h-7 w-7 items-center justify-center rounded-full text-[#94A3B8] transition-colors hover:bg-white/10 hover:text-white"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
