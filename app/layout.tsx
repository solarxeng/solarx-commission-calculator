import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Solar X Commission Calculator',
  description: 'Commission calculator for Solar X sales reps',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
