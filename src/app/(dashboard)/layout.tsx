import { PageTransitionWrapper } from '@/components/animations/page-transition-wrapper';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen overflow-hidden">
      <PageTransitionWrapper>{children}</PageTransitionWrapper>
    </div>
  );
}
