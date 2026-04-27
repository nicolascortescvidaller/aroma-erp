import { useEffect } from "react";

interface ModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ open, title, onClose, children }: ModalProps) {
  useEffect(() => {
    function onEsc(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-2xl rounded-xl bg-white p-4 shadow-xl">
        <div className="mb-3 flex items-center justify-between border-b border-slate-200 pb-2">
          <h3 className="text-lg font-semibold text-brand-ink">{title}</h3>
          <button className="btn-secondary" onClick={onClose}>
            Cerrar
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
