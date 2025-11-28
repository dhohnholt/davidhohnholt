import { ReactNode } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'; // ✅ Make sure this path matches your file

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}