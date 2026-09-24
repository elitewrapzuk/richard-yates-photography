import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Richard Yates — Self Portraiture',
  description: 'Contemporary photographic self-portraiture by Richard Yates.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>
}
