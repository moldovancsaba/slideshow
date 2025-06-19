'use client';

import dynamic from 'next/dynamic';
import styled from 'styled-components';

const Slideshow = dynamic(() => import('../src/components/Slideshow'), {
  loading: () => (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  ),
  ssr: false
});

const Title = styled.h1`
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translate(-50%, -60%);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
  }
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 72px;
  font-weight: 700;
  color: var(--text);
  text-align: center;
  z-index: 40;
  text-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  pointer-events: none;
  font-family: 'Quicksand', sans-serif;
  letter-spacing: -1px;
  opacity: 0;
  animation: fadeIn 1s ease-out forwards;
  white-space: nowrap;
  mix-blend-mode: difference;
`;


export default function Home() {
  return (
    <>
      <main className="fixed inset-0 overflow-hidden bg-[var(--background)]" style={{ height: '100dvh' }}>
        <Title>WE LOVE ROMA</Title>
        <Slideshow />
      </main>
    </>
  );
}
