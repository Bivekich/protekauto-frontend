import type { Metadata } from 'next';
import { Onest, Golos_Text } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SubscribeBlock from '@/components/SubscribeBlock';
import { AuthProvider } from '@/shared';

const onest = Onest({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '600'],
  variable: '--font-onest',
});

const golosText = Golos_Text({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '600'],
  variable: '--font-golos-text',
});

export const metadata: Metadata = {
  title: 'Протек Авто - Автозапчасти',
  description: 'Интернет-магазин автозапчастей Протек Авто',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${onest.variable} ${golosText.variable} font-onest`}>
        <AuthProvider>
          <Header />
          <main>{children}</main>
          <SubscribeBlock />
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
