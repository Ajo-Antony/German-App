import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DeutschMeister — German Learning App',
  description: 'Master German with speaking practice, flashcards, AI feedback, and more',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
