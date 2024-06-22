import type { Metadata } from 'next';
import './globals.css';
import StoreProvider from '@/components/store-provider';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import { auth } from '@/auth';
import { SessionProvider } from 'next-auth/react';

export const metadata: Metadata = {
  title: 'Ecommerce',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang='en'>
      <body>
        <StoreProvider>
          <SessionProvider session={session}>
            {/* <Header /> */}
            {children}
            {/* <Footer /> */}
          </SessionProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
