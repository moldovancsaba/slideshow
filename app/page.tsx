'use client';

import Slideshow from '../src/components/Slideshow';

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-8">
          Welcome to Slideshow
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Slideshow />
        </div>
      </div>
    </main>
  );
}
