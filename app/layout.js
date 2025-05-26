import Providers from './providers';
import './globals.css';

export const metadata = {
  title: 'Next.js App Router with Apollo Client',
  description: 'A sample app using Next.js App Router with Apollo Client',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
