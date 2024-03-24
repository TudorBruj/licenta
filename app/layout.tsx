import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import StoreProvider from "@/components/store-provider";
import 'primereact/resources/themes/tailwind-light/theme.css';

export const metadata: Metadata = {
  title: "Ecommerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <Header />
          {children}
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
