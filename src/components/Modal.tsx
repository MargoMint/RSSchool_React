import type { PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import { useEscapeClose } from '../hooks/useEscapeClose';

interface ModalProps {
  onClose: () => void;
  title: string;
}

const Modal = ({ onClose, title, children }: PropsWithChildren<ModalProps>) => {
  useEscapeClose(onClose);

  const portal = document.getElementById('portal');
  if (!portal) return null;

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 bg-black/70 z-40" onClick={onClose} />
      <div className="relative z-50 w-2xl bg-[var(--primary-green)] rounded-2xl p-6 border-2 border-[var(--primary-dark)]">
        <h1 className="text-3xl text-center text-[var(--primary-pink)] uppercase font-bold mb-2 border-b-3">
          {title}
        </h1>
        {children}
      </div>
    </div>,
    portal
  );
};

export default Modal;
