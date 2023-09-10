'use client';
import { Box, Button, Card, Dialog, Flex, Grid, Link, Text, TextField } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { z } from 'zod';
// import { SelectRules } from '@/components';
import { TokenMetadata } from '@/types';
import { AppliedValidators, applyParams, Validators } from '@/utils/lucid';
import { mintTransaction } from '@/utils/lucid/tx';
import { useStore } from '@/utils/zustand';

export interface CustomMintProps {
  validators: Validators;
}

const CustomMint = ({ validators }: CustomMintProps) => {
  const tokenName = 'CNFT Gift Card';
  const lucid = useStore((state) => state.lucid);
  const [sendAddress, setSendAddress] = useState<string>('');
  const [adaAmount, setAdaAmount] = useState<string | null>(null);
  const [parameterizedContracts, setParameterizedContracts] = useState<AppliedValidators | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [txHash, setTxHash] = useState<string>('');
  const [txChecking, setTxChecking] = useState<boolean>(false);

  const adaAmountSchema = z.number().min(1).max(1000);

  const {
    data: address,
    isError: isErrorAddress,
    isFetching: isFetchingAddress,
  } = useQuery({
    queryKey: ['address', { sendAddress }],
    queryFn: async () => {
      const address = await fetch('/api/blockfrost/address', {
        method: 'POST',
        body: JSON.stringify({ address: sendAddress }),
      }).then((res) => res.json());
      return address;
    },
    // enabled: false,
    retryOnMount: false,
    retry: false,
  });

  const { data: cnftImageArray } = useQuery({
    queryKey: ['base64_image', { adaAmount }],
    queryFn: async () => {
      const result: { base64Array: string[] } = await fetch('/api/core/preview', {
        method: 'POST',
        body: JSON.stringify({ lovelace: adaAmount }),
      }).then((res) => res.json());
      return result.base64Array;
    },
  });

  useEffect(() => {
    if (lucid) {
      lucid.wallet.getUtxos().then((utxos) => {
        const utxo = utxos[0];
        const outputReference = {
          txHash: utxo.txHash,
          outputIndex: utxo.outputIndex,
        };
        const contracts = applyParams(tokenName, outputReference, validators, lucid);
        setParameterizedContracts(contracts);
      });
    } else {
      alert('1: ウォレットが接続されていません');
    }
  }, []);

  const handleAdaAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const result = adaAmountSchema.safeParse(Number(e.currentTarget.value));
    if (result.success) {
      setAdaAmount(e.currentTarget.value);
    } else {
      setAdaAmount('');
    }
  };

  const createGiftCard = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setTxChecking(true);
    if (lucid && parameterizedContracts && cnftImageArray) {
      try {
        const tokenMetadata: TokenMetadata = {
          [parameterizedContracts.policyId]: {
            [tokenName]: {
              name: tokenName,
              image: cnftImageArray,
              mediaType: 'image/svg+xml',
              ref: parameterizedContracts.outputReference,
            },
          },
          version: 1,
        };
        const lovelace = Number(adaAmount) * 1000000;
        const tx = await mintTransaction({
          lucid,
          parameterizedContracts,
          tokenMetadata,
          lovelace,
          sendAddress,
        });

        const txSigned = await tx.sign().complete();
        const txHash = await txSigned.submit();
        setTxHash(txHash);
        setOpen(true);
        setAdaAmount('');
        setSendAddress('');
        setTxChecking(false);

        // const success = await lucid.awaitTx(txHash);
        // if (success) {
        // 	setTxHash(txHash);
        // 	setOpen(true);
        // 	setAdaAmount("");
        // 	setSendAddress("");
        // 	setTxChecking(false);
        // }
      } catch (error) {
        alert(error);
        setTxChecking(false);
      }
    } else {
      alert('2 ウォレットが接続されていないか、コントラクトが作成できませんでした。');
      setTxChecking(false);
    }
  };

  return (
    <Grid columns="2" gap="3">
      <Flex gap="3" direction="column">
        <Grid gap="3">
          <div>
            <Text size="2" weight="bold" align="left">
              1, Gift Card を送る相手のアドレス
            </Text>
            <TextField.Root>
              <TextField.Input
                placeholder="addr_test…"
                id="sendAddress"
                name="sendAddress"
                value={sendAddress}
                onChange={(e) => {
                  setSendAddress(e.currentTarget.value);
                }}
              />
            </TextField.Root>
            <Text size="1" align="left">
              {!sendAddress ? (
                'アドレスの入力は必須です。'
              ) : address ? (
                <Text color="green">このアドレスは有効です。</Text>
              ) : isErrorAddress ? (
                <Text color="red">このアドレスは無効です。</Text>
              ) : isFetchingAddress ? (
                <Text color="yellow">アドレスの有効性をチェックしています。</Text>
              ) : (
                ''
              )}
            </Text>
          </div>
          <div>
            <Text size="2" weight="bold" align="left">
              2, 添付する ADA の数量
            </Text>
            <TextField.Root>
              <TextField.Input
                id="adaAmount"
                name="adaAmount"
                placeholder="1 ~ 1000"
                onChange={handleAdaAmountChange}
              />
            </TextField.Root>
            <Text size="1" align="left">
              最大 1,000 ADA までロック可能です。
            </Text>
          </div>
          {/* <SelectRules /> */}
          <Button
            disabled={!parameterizedContracts || !address || !adaAmount || txChecking}
            onClick={async (e) => await createGiftCard(e)}
          >
            {txChecking ? 'トランザクション処理中...' : 'CNFT をミントする'}
          </Button>

          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Content style={{ maxWidth: 450 }}>
              <Dialog.Title>Success</Dialog.Title>
              <Dialog.Description size="2" mb="4">
                トランザクションを送信しました。 オンチェーンに反映されるまで、数分かかる場合があります。
              </Dialog.Description>
              <Flex direction="column" gap="3">
                <Text as="div" size="2" mb="1" weight="bold">
                  Transaction Hash
                </Text>
                <Link target="_blank" href={`https://preview.cardanoscan.io/transaction/${txHash}`}>
                  {txHash}
                </Link>
              </Flex>
              <Flex gap="3" mt="4" justify="end">
                <Dialog.Close>
                  <Button>閉じる</Button>
                </Dialog.Close>
              </Flex>
            </Dialog.Content>
          </Dialog.Root>
        </Grid>
      </Flex>
      <Flex align="center" justify="center">
        <Card size="3">
          <Flex direction="column" gap="3">
            <Text size="2" weight="bold" align="center">
              Preview Image
            </Text>
            <Box style={{ height: '300px', width: '300px' }}>
              {cnftImageArray ? <embed src={cnftImageArray.reduce((prev, current) => prev + current)} /> : null}
            </Box>

            <Text size="2" weight="bold" align="center">
              NFT Metadata
            </Text>
            <Text size="2" weight="bold">
              version : 1
            </Text>
            <Text size="2" weight="bold">
              name : CNFT Gift Card
            </Text>
          </Flex>
        </Card>
      </Flex>
    </Grid>
  );
};

export default CustomMint;
