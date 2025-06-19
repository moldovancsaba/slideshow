'use client';

import React from 'react';
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
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const IframeWrapper = styled.div`
  position: relative;
  width: min(100vw, calc(100vh * 9/8));
  aspect-ratio: 9/8;
  overflow: hidden;
  background: #000;
`;

const ResponsiveIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 4320px;
  height: 3840px;
  border: none;
  transform-origin: 0 0;
  background: #000;
`;

const Slideshow: React.FC = () => {
  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  React.useEffect(() => {
    const handleResize = () => {
      if (iframeRef.current) {
        const container = iframeRef.current.parentElement;
        if (container) {
          const containerWidth = container.clientWidth;
          const containerHeight = container.clientHeight;
          const scaleX = containerWidth / 4320;
          const scaleY = containerHeight / 3840;
          const scale = Math.min(scaleX, scaleY);
          
          iframeRef.current.style.transform = `scale(${scale})`;
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

