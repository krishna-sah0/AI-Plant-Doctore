import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { ToastMessage } from '../types';

export { type ToastMessage };

interface ToastContainerProps {
  toasts: ToastMessage[];
  onRemoveToast?: (id: string) => void;
  onDismiss?: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  onRemoveToast,
  onDismiss,
}) => {
  const handleDismiss = (id: string) => {
    if (onRemoveToast) onRemoveToast(id);
    if (onDismiss) onDismiss(id);
  };

  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        handleDismiss(toasts[0].id);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toasts]);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-md w-full px-4 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl shadow-2xl border backdrop-blur-md transition-all duration-300 transform translate-y-0 ${
            toast.type === 'success'
              ? 'bg-stone-950/95 text-emerald-50 border-emerald-500/40'
              : toast.type === 'error'
              ? 'bg-stone-950/95 text-rose-50 border-rose-500/40'
              : 'bg-stone-950/95 text-stone-100 border-stone-700/60'
          }`}
        >
          <div className="mt-0.5 shrink-0">
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
            {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-400" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-sky-400" />}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold tracking-tight text-white">{toast.title}</h4>
            <p className="text-xs text-stone-300 mt-0.5 leading-relaxed">{toast.message}</p>
          </div>
          <button
            onClick={() => handleDismiss(toast.id)}
            className="text-stone-400 hover:text-white transition-colors p-1 -mr-1 rounded-lg"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

export const Toast = ToastContainer;
