import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";

// Tiny toast helper. Returns [showToast, element].
// Usage: const [toast, toastEl] = useToast(); toast("Prompt copied");
export function useToast() {
  const [message, setMessage] = useState("");
  const timer = useRef(null);

  const show = useCallback((msg) => {
    setMessage(msg);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMessage(""), 2400);
  }, []);

  useEffect(() => () => clearTimeout(timer.current), []);

  const element = (
    <div className="toast-wrap" aria-live="polite">
      {message && (
        <div className="toast show">
          <Icon name="checkCircle" size={16} /> {message}
        </div>
      )}
    </div>
  );

  return [show, element];
}
