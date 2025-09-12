import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 20h16" />
      <path d="M4 14h10" />
      <path d="M4 8h16" />
      <path d="M10 20V4" />
      <path d="M16 20V4" />
    </svg>
  );
}
