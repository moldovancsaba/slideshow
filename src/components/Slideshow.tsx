'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const SLIDESHOW_URL = 'https://api.seyu.hu/seyu/backend/slideshow?event-id=1769&slideshow-id=2192&enable-poster=0&token=eyJhbGciOiJIUzI1NiJ9.eyJzbGlkZXNob3dJZCI6MjE5Mn0.GpxJfbgRUdkuI-NdT3e6qCQ7KNhdmq-MTvShHC5e-CU';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
  overflow: hidden;
  padding: 0;
  margin: 0;
`;

const IframeWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 100vmin;
  aspect-ratio: 9/8;
  overflow: hidden;
`;

const ResponsiveIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  transform-origin: 0 0;
  pointer-events: none; /* Prevent interaction with scaled content */
`;

const ErrorMessage = styled.div`
  color: #ff0000;
  font-size: 1.2rem;
  text-align: center;
  padding: 2rem;
`;

const LoadingSpinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-left: 4px solid #ffffff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

interface SlideshowState {
  loading: boolean;
  error: string | null;
}

const Slideshow: React.FC = () => {
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const [state, setState] = useState<SlideshowState>({
    loading: true,
    error: null
  });

  useEffect(() => {
    // Set loading to false after a brief delay to show loading state
    const timer = setTimeout(() => {
      setState({ loading: false, error: null });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (state.loading || state.error) return;

    const handleResize = () => {
      if (iframeRef.current) {
        // Calculate the scale to fit the 4320x3840 content into the container
        // while maintaining the 9:8 aspect ratio
        const container = iframeRef.current.parentElement;
        if (container) {
          const containerWidth = container.clientWidth;
          const containerHeight = container.clientHeight;
          const scaleX = containerWidth / 4320;
          const scaleY = containerHeight / 3840;
          const scale = Math.min(scaleX, scaleY);
          
          iframeRef.current.style.transform = `scale(${scale})`;
          iframeRef.current.style.width = `${4320}px`;
          iframeRef.current.style.height = `${3840}px`;
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [state.loading, state.error]);

  if (state.error) {
    return (
      <Container>
        <ErrorMessage>{state.error}</ErrorMessage>
      </Container>
    );
  }

  if (state.loading) {
    return (
      <Container>
        <LoadingSpinner />
      </Container>
    );
  }

  return (
    <Container>
      <IframeWrapper>
        <ResponsiveIframe
          ref={iframeRef}
          src={SLIDESHOW_URL}
          title="Slideshow"
          allow="fullscreen"
        />
      </IframeWrapper>
    </Container>
  );
};

export default Slideshow;

