import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import Landing from '@/components/Landing'
import TopBar from '@/components/TopBar'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MixMaster PVP ⚔️',
  description: 'No grind. Log in and go fight.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isStaging = (process.env.NEXT_PUBLIC_APP_ENV ?? process.env.NODE_ENV) === 'production';

  return (
    <html className="text-[62.5%] h-[100%] min-h-[100%]" lang="en">
      <body className={`${inter.className} flex flex-col min-h-[100%] text-white bg-black`}>
        {isStaging
          ? <Landing />
          : 
          <>
            <TopBar />
            <Header />
            {children}
            <Footer />
          </>
        }
      </body>
    </html>
  );
}
