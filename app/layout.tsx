import type { Metadata } from "next";
import StyledComponentsRegistry from './registry';
import { Quicksand } from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: 'Slideshow App',
  description: 'A modern slideshow application',
  themeColor: '#000000',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
  shrinkToFit: 'no',
  userScalable: 'yes',
  viewportFit: 'cover'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
className={`${quicksand.className} antialiased m-0 p-0 bg-[#000000]`}
      >
        <StyledComponentsRegistry>
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
