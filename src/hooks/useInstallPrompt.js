import { useEffect, useState } from "react";

// Captures Chrome's install prompt so we can offer our own Install button,
// and detects when the app is already running installed.
export function useInstallPrompt() {
  const [event, setEvent] = useState(null);
  const [installed, setInstalled] = useState(
    () =>
      window.matchMedia?.("(display-mode: standalone)").matches ||
      window.navigator.standalone === true
  );

  useEffect(() => {
    const onPrompt = (e) => {
      e.preventDefault(); // stop Chrome's mini-infobar; we show our own button
      setEvent(e);
    };
    const onInstalled = () => {
      setInstalled(true);
      setEvent(null);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const promptInstall = async () => {
    if (!event) return "unavailable";
    event.prompt();
    const { outcome } = await event.userChoice;
    if (outcome === "accepted") setInstalled(true);
    setEvent(null);
    return outcome;
  };

  return { canInstall: !!event, installed, promptInstall };
}

// is this an iOS device? (Safari has no install prompt — manual steps only)
export const isIOS = () =>
  /iphone|ipad|ipod/i.test(navigator.userAgent) && !window.navigator.standalone;
