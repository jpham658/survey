import './globals.css'
import type { Metadata } from 'next'
import { Kosugi_Maru, DM_Sans } from 'next/font/google'

const kosugi_maru = Kosugi_Maru({ subsets: ['latin'], weight: '400' })
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
