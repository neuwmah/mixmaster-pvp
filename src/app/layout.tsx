import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from './components/Header';
import Footer from './components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MixMaster PVP',
  description: 'Hi.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="text-[62.5%]" lang="en">
      <body className={`${inter.className} flex flex-col min-h-[100vh] text-white bg-black`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}