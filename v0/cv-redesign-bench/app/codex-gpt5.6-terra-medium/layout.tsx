import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Ricardo Jorge — AI Product Engineer', description: 'CV of Ricardo Jorge, AI Product Engineer.' }

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) { return children }
