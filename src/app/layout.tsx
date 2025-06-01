import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ApolloWrapper } from '@/lib/apollo-wrapper';
import Header from '@/components/header';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Next.js + Apollo Client + RSC 테스트',
  description: 'React Server Components에서 Apollo Client PreloadQuery와 useSuspenseQuery 테스트',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ApolloWrapper>
          <Header />
          <main className="min-h-screen bg-gray-50">{children}</main>
        </ApolloWrapper>
      </body>
    </html>
  );
}
