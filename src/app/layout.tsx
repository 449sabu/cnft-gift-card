import './globals.css';
import '@radix-ui/themes/styles.css';
import { Container, Flex, Theme } from '@radix-ui/themes';
import type { Metadata } from 'next';
import Providers from '@/app/providers';
import { ClientWrapper } from '@/components';
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
          <header>
            <Container>
              <Flex align="center" justify="end" height="9" gap="3">
                <ClientWrapper />
                <ThemeButton />
              </Flex>
            </Container>
          </header>
          {children}
        </Theme>
      </Providers>
    </html>
  );
}
