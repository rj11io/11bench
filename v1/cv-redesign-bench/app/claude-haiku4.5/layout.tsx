import { ReactNode } from 'react';

export const metadata = {
  title: 'Ricardo Jorge — CV',
  description: 'AI Product Engineer with a decade of TypeScript, React, Next.js, and AI/LLM experience. Based in Lisbon.',
  robots: 'index, follow',
  openGraph: {
    title: 'Ricardo Jorge — AI Product Engineer',
    description: 'CV and portfolio of Ricardo Jorge, an AI Product Engineer specializing in TypeScript, React, Next.js, and product design.',
    type: 'profile',
  },
};

export default function CVLayout({ children }: { children: ReactNode }) {
  return children;
}
