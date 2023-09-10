'use client';
import { MagicWandIcon, GearIcon, LockOpen1Icon } from '@radix-ui/react-icons';
import { Container, Flex, Heading, Section, Text, Tabs, Box, Grid, Link } from '@radix-ui/themes';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import Loading from './Loading';
import { Blueprint, Validators } from '@/utils/lucid';
import { useStore } from '@/utils/zustand';

const ConnectWallet = dynamic(() => import('@/components').then((mod) => mod.ConnectWallet), {
  ssr: false,
});

const CustomMint = dynamic(() => import('@/components').then((mod) => mod.CustomMint), {
  ssr: false,
  loading: () => <Loading message="Loading" />,
});

// const Mint = dynamic(() => import("@/components").then((mod) => mod.Mint), {
// 	ssr: false,
// 	loading: () => <p>Loading...</p>,
// });

const Redeem = dynamic(() => import('@/components').then((mod) => mod.Redeem), {
  ssr: false,
  loading: () => <Loading message="Loading" />,
});

const Settings = dynamic(() => import('@/components').then((mod) => mod.Settings), {
  ssr: false,
  loading: () => <Loading message="Loading" />,
});

export interface SectionProps {
  blueprint: Blueprint;
}

const Controller = ({ blueprint }: SectionProps) => {
  const lucid = useStore((state) => state.lucid);
  const [previewBase64Array, setPreviewBase64Array] = useState<string[]>(['']);

  const loadPreview = async () => {
    const preview = await fetch('/api/core/preview', {
      method: 'POST',
      body: JSON.stringify({ lovelace: 100 }),
    }).then((res) => res.json());
    setPreviewBase64Array(preview.base64Array);
  };

  useEffect(() => {
    loadPreview();
  }, []);

  const readValidators = (blueprint: Blueprint): Validators => {
    const redeem = (blueprint as Blueprint).validators.find((v) => v.title === 'oneshot.redeem');

    if (!redeem) {
      throw new Error('Redeem validator not found');
    }

    const giftCard = (blueprint as Blueprint).validators.find((v) => v.title === 'oneshot.gift_card');

    if (!giftCard) {
      throw new Error('Gift Card validator not found');
    }

    return {
      redeem: {
        type: 'PlutusV2',
        script: redeem.compiledCode,
      },
      giftCard: {
        type: 'PlutusV2',
        script: giftCard.compiledCode,
      },
    };
  };

  const validators = readValidators(blueprint);

  if (lucid) {
    return (
      <Container>
        <Section>
          <Tabs.Root defaultValue="mint">
            <Tabs.List aria-label="mint">
              <Tabs.Trigger value="mint">
                <Flex align="center">
                  <MagicWandIcon style={{ paddingRight: '0.5rem' }} />
                  <Text>Mint</Text>
                </Flex>
              </Tabs.Trigger>
              <Tabs.Trigger value="redeem">
                <Flex align="center">
                  <LockOpen1Icon style={{ paddingRight: '0.5rem' }} />
                  <Text>Redeem</Text>
                </Flex>
              </Tabs.Trigger>
              <Tabs.Trigger value="settings">
                <Flex align="center">
                  <GearIcon style={{ paddingRight: '0.5rem' }} />
                  <Text>Settings</Text>
                </Flex>
              </Tabs.Trigger>
            </Tabs.List>

            <Box px="4" pt="3" pb="2">
              <Tabs.Content value="mint">
                <Text size="3" as="div" style={{ marginBottom: '2rem' }}>
                  コントラクトアドレスに任意の数量の ADA をロックし、お好きなアドレスに 「CNFT Gift
                  Card」を送ることができます。
                </Text>
                <CustomMint validators={validators} />
              </Tabs.Content>

              <Tabs.Content value="redeem">
                <Text size="3" as="div" style={{ marginBottom: '2rem' }}>
                  保有している 「CNFT Gift Card」をバーンし、コントラクトアドレスにロックされている ADA
                  をウォレットに償還できます。
                </Text>
                <Redeem validators={validators} />
              </Tabs.Content>

              <Tabs.Content value="settings">
                <Text size="3" as="div" style={{ marginBottom: '2rem' }}>
                  各種設定を行えます。
                </Text>
                <Settings />
              </Tabs.Content>
            </Box>
          </Tabs.Root>
        </Section>
      </Container>
    );
  }

  return (
    <Container>
      <Section>
        <Grid columns="2" gap="3">
          <Grid gap="6">
            <Heading size="9">CNFT Gift Card</Heading>
            <Heading size="6">
              <Link href="https://aiken-lang.org/" target="_blank">
                Aiken{' '}
              </Link>
              と
              <Link href="https://lucid.spacebudz.io/" target="_blank">
                {' '}
                Lucid{' '}
              </Link>
              を使用した Cardano SmartContract Example
            </Heading>
            <Flex direction="row" gap="4" align="center">
              <Heading size="8">Connect with</Heading>
              <ConnectWallet />
            </Flex>
          </Grid>
          <Flex style={{ height: '300px' }} align="center" justify="center">
            <embed src={previewBase64Array.reduce((prev, current) => prev + current)} />
          </Flex>
        </Grid>
      </Section>
    </Container>
  );
};

export default Controller;
