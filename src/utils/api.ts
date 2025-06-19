import axios, { AxiosError } from 'axios';

// Define types for the slideshow data
interface Slide {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  createdAt: string; // ISO 8601 format with milliseconds
  updatedAt: string; // ISO 8601 format with milliseconds
}

interface SlideshowResponse {
  slides: Slide[];
  totalCount: number;
}

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Error types
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public originalError?: Error
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Function to fetch slideshow data
export async function fetchSlideshow(): Promise<SlideshowResponse> {
  try {
    const response = await api.get<SlideshowResponse>('/slideshow');
    
    // Transform dates to ensure ISO 8601 format with milliseconds
    const transformedSlides = response.data.slides.map(slide => ({
      ...slide,
      createdAt: new Date(slide.createdAt).toISOString(),
      updatedAt: new Date(slide.updatedAt).toISOString()
    }));

    return {
      slides: transformedSlides,
      totalCount: response.data.totalCount
    };
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new ApiError(
        error.response?.data?.message || 'Failed to fetch slideshow data',
        error.response?.status || 500,
        error
      );
    }
    throw new ApiError('An unexpected error occurred', 500, error as Error);
  }
}

