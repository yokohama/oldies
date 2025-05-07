import { Toaster } from 'sonner';
import HomePage from '@/components/home/HomePage';

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-50">
      <Toaster position="top-center" />
      <HomePage />
    </main>
  );
}