import './globals.css';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import type { Metadata } from 'next';
import Providers from '@/app/providers';
import ThemeButton from '@/components/ThemeButton';

export const metadata: Metadata = {
  title: 'Cardano Gift',
  description: 'Cardano GiftCard app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Providers>
        <Theme accentColor="orange" grayColor="sand" radius="large" scaling="95%">
          <ThemeButton />
          {children}
        </Theme>
      </Providers>
    </html>
  );
}
