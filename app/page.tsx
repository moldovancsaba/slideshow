'use client';

import dynamic from 'next/dynamic';

const Slideshow = dynamic(() => import('../src/components/Slideshow'), {
  loading: () => (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  ),
  ssr: false
});

export default function Home() {
  return (
    <main className="min-h-screen w-screen overflow-hidden bg-black">
      <Slideshow />
    </main>
  );
}
