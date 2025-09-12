import { PageTransitionWrapper } from '@/components/animations/page-transition-wrapper';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <PageTransitionWrapper>{children}</PageTransitionWrapper>
      </main>
      <Footer />
    </div>
  );
}
