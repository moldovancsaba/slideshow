'use client';

import React from 'react';
import styled from 'styled-components';

// Constants for original content size and target aspect ratio
const ORIGINAL_WIDTH = 4320;
const ORIGINAL_HEIGHT = 3840;
const ASPECT_RATIO = 9/8;

const SLIDESHOW_URL = 'https://api.seyu.hu/seyu/backend/slideshow?event-id=1769&slideshow-id=2192&enable-poster=0&token=eyJhbGciOiJIUzI1NiJ9.eyJzbGlkZXNob3dJZCI6MjE5Mn0.GpxJfbgRUdkuI-NdT3e6qCQ7KNhdmq-MTvShHC5e-CU';

const Container = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--background);
  overflow: hidden;
`;

const IframeWrapper = styled.div`
  background: var(--background);
  overflow: hidden;
  position: relative;
`;

const ResponsiveIframe = styled.iframe`
  border: none;
  background: var(--background);
  position: absolute;
  top: 0;
  left: 0;
  transform-origin: 0 0;
`;

const Slideshow: React.FC = () => {
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const calculateDimensions = () => {
      if (!wrapperRef.current || !iframeRef.current) return;

      // Get viewport dimensions
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let targetWidth, targetHeight;

      // Calculate the maximum size that maintains 9:8 ratio
      if ((viewportWidth / viewportHeight) > ASPECT_RATIO) {
        // Screen is wider than 9:8 - height is limiting factor
        targetHeight = viewportHeight;
        targetWidth = Math.floor(viewportHeight * ASPECT_RATIO);
      } else {
        // Screen is narrower than 9:8 - width is limiting factor
        targetWidth = viewportWidth;
        targetHeight = Math.floor(viewportWidth / ASPECT_RATIO);
      }

      // Set wrapper to target size
      wrapperRef.current.style.width = `${targetWidth}px`;
      wrapperRef.current.style.height = `${targetHeight}px`;

// For testing purposes, triple the scale value
      const scale = (targetWidth / ORIGINAL_WIDTH) * 3;

      // Set iframe to original size and scale it
      iframeRef.current.style.width = `${ORIGINAL_WIDTH}px`;
      iframeRef.current.style.height = `${ORIGINAL_HEIGHT}px`;
      iframeRef.current.style.transform = `scale(${scale})`;

      console.log('Dimensions:', {
        viewport: `${viewportWidth}x${viewportHeight}`,
        target: `${targetWidth}x${targetHeight}`,
        scale: `${(scale * 100).toFixed(3)}%`,
        finalSize: `${Math.round(ORIGINAL_WIDTH * scale)}x${Math.round(ORIGINAL_HEIGHT * scale)}`,
        aspectRatio: (targetWidth / targetHeight).toFixed(3)
      });
    };

    calculateDimensions();
    window.addEventListener('resize', calculateDimensions);

    return () => window.removeEventListener('resize', calculateDimensions);
  }, []);

  return (
    <Container>
      <IframeWrapper ref={wrapperRef}>
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

