import type { ReactNode } from 'react';

type ButtonProps = Readonly<{
  children: ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  ariaLabel?: string;
}>;

export function Button({
  children,
  onClick,
  variant = 'primary',
  ariaLabel,
}: ButtonProps): JSX.Element {
  const className =
    variant === 'primary'
      ? 'rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-sky-400'
      : 'rounded-full border border-slate-700 bg-slate-900 p-3 text-slate-200 transition hover:bg-slate-800';

  return (
    <button type="button" onClick={onClick} className={className} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
