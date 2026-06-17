import type { ReactNode } from 'react';

type ModalProps = Readonly<{
  children: ReactNode;
  onDismiss: () => void;
  zIndexClass?: string;
}>;

export function Modal({ children, onDismiss, zIndexClass = 'z-20' }: ModalProps): JSX.Element {
  return (
    <div
      className={`fixed inset-0 ${zIndexClass} flex items-center justify-center bg-black/60 px-4`}
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Close modal"
        onClick={onDismiss}
      />
      {children}
    </div>
  );
}
