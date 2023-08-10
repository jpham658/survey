import './globals.css'
import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'

const dm_sans = DM_Sans({ subsets: ['latin'], weight: '500'})

export const metadata: Metadata = {
  title: 'survey',
  description: 'to test database links',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={dm_sans.className}>{children}</body>
    </html>
  )
}
