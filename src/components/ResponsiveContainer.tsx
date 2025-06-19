import React, { useEffect, useState, useRef, useCallback } from 'react';
import styled from 'styled-components';

// TypeScript interfaces for props and state
interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  minWidth?: number;
  maxWidth?: number;
}

interface ContainerDimensions {
  width: number;
  height: number;
}

// Styled component that maintains 9:8 aspect ratio
const Container = styled.div<{ dimensions: ContainerDimensions }>`
  width: ${props => props.dimensions.width}px;
  height: ${props => props.dimensions.height}px;
  position: relative;
  margin: 0 auto;
  overflow: hidden;
  transition: width 0.3s ease-in-out, height 0.3s ease-in-out;
`;

const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  children,
  className,
  minWidth = 320, // Minimum width for mobile devices
  maxWidth = 1920, // Maximum width for large screens
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<ContainerDimensions>({
    width: minWidth,
    height: (minWidth * 8) / 9,
  });

  const calculateDimensions = useCallback(() => {
    if (!containerRef.current) return;

    const parentWidth = containerRef.current.parentElement?.clientWidth || window.innerWidth;
    const newWidth = Math.min(Math.max(parentWidth, minWidth), maxWidth);
    const newHeight = (newWidth * 8) / 9; // Maintain 9:8 aspect ratio

    setDimensions({ width: newWidth, height: newHeight });
  }, [minWidth, maxWidth]);

  useEffect(() => {
    calculateDimensions();

    const handleResize = () => {
      calculateDimensions();
    };

    // Add resize event listener
    window.addEventListener('resize', handleResize);

    // Clean up event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [calculateDimensions]);

  return (
    <Container
      ref={containerRef}
      className={className}
      dimensions={dimensions}
    >
      {children}
    </Container>
  );
};

export default ResponsiveContainer;

