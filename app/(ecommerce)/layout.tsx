import Header from "@/components/header";
import Footer from "@/components/footer";

export default function EcommerceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <Header />
        {children}
        <Footer />
    </>
  );
}
