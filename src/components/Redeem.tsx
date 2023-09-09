"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Constr, Data, fromText, fromUnit } from "lucid-cardano";
import { applyParams, Validators } from "@/utils/lucid";
import { useStore } from "@/utils/zustand";
import { Box, Button, Card, Dialog, Flex, Grid, Text } from "@radix-ui/themes";
import Link from "next/link";

export interface RedeemProps {
	validators: Validators;
}

interface Assets {
	asset: {
		asset: string;
		asset_name: string;
		fingerprint: string;
		initial_mint_tx_hash: string;
		onchain_metadata: {
			name: string;
			image: string[];
			mediaType: string;
			ref: {
				txHash: string
				outputIndex: number
			}
		};
		policy_id: string;
	};
	tx: {
		hash: string;
		inputs: {
			address: string;
			amount: {
				unit: string;
				quantity: string;
			}[];
			tx_hash: string;
			output_index: number;
		}[];
		outputs: {
			address: string;
			amount: {
				unit: string;
				quantity: string;
			}[];
			data_hash: string;
			inline_datam: string;
			output_index: number;
		}[];
	};
}

const Redeem = ({ validators }: RedeemProps) => {
	const tokenName = "CNFT Gift Card"
	const lucid = useStore((state) => state.lucid);
	const [open, setOpen] = useState<boolean>(false);
	const [waitingUnlockTx, setWaitingUnlockTx] = useState<boolean>(false);
	const [unlockTxHash, setUnlockTxHash] = useState<string>("");

	const getGiftCardList = async () => {
		const utxos = await lucid?.wallet.getUtxos();
		const assets = utxos
			?.map((utxo) => Object.keys(utxo.assets))
			.flat()
			.filter((data) => data != "lovelace")
			.map((unit) => fromUnit(unit))
			.filter((asset) => asset.name === fromText(tokenName));

		const assetWithMetadata = await fetch("/api/blockfrost/asset", {
			method: "POST",
			body: JSON.stringify({ assets }),
		}).then((res) => res.json());
		return assetWithMetadata;
	};

	const {
		data: assets,
		isError: isErrorAssets,
		isFetching: isFetchingAssets,
	} = useQuery<{ assets: Assets[] }>(
		{
			queryKey: ["assets"],
			queryFn: getGiftCardList,
			retryOnMount: false,
		}
		// enabled: false,
		// retry: false
	);

	const redeemGiftCard = async (
		e: React.MouseEvent<HTMLButtonElement>,
		data: Assets
	) => {
		e.preventDefault();
		setWaitingUnlockTx(true);

		if (lucid && assets) {
			try {
				const contracts = applyParams(
					tokenName,
					data.asset.onchain_metadata.ref,
					validators,
					lucid
				);
				const utxos = await lucid.utxosAt(data.tx.outputs[0].address);
				const assetName = `${data.asset.policy_id}${fromText(
					tokenName
				)}`;
				const burnRedeemer = Data.to(new Constr(1, []));

				const tx = await lucid
					.newTx()
					.collectFrom(utxos, Data.void())
					.attachMintingPolicy(contracts.giftCard)
					.attachSpendingValidator(contracts.redeem)
					.mintAssets({ [assetName]: BigInt(-1) }, burnRedeemer)
					.complete();

				const txSigned = await tx.sign().complete();
				const txHash = await txSigned.submit();
				const success = await lucid!.awaitTx(txHash);
				

				if (success) {
					setUnlockTxHash(txHash);
					setOpen(true);
					setWaitingUnlockTx(false);
				}
			} catch (error) {
				alert(JSON.stringify(error));
				setWaitingUnlockTx(false);
			}
		} else {
			alert("ウォレットが接続されていません");
		}
	};

	if (isFetchingAssets) {
		return <Text>isFetching ...</Text>;
	}

	if (isErrorAssets) {
		return <Text>isError</Text>;
	}

	return (
		<Grid columns="3" gap="9">
			{assets ? (
				assets.assets.map((data, index) => (
					<Card key={index} size="2">
						<Flex
							direction="column"
							gap="3"
							style={{ maxWidth: "300px", margin: "auto" }}
						>
							<Box style={{ height: "300px" }}>
								<embed
									src={data.asset.onchain_metadata.image.reduce(
										(prev, current) => prev + current
									)}
								/>
							</Box>
							<Text style={{ maxWidth: "300px" }}>
								Policy ID : {data.asset.policy_id}
							</Text>
							<Button
								onClick={(event) => {
									redeemGiftCard(event, data);
								}}
							>
								{waitingUnlockTx
									? "トランザクション処理中..."
									: "ADA を償還する"}
							</Button>
							<Dialog.Root open={open} onOpenChange={setOpen}>
								<Dialog.Content style={{ maxWidth: 450 }}>
									<Dialog.Title>Success</Dialog.Title>
									<Dialog.Description size="2" mb="4">
										トランザクションは正常に処理されました。
									</Dialog.Description>
									<Flex direction="column" gap="3">
										<Text as="div" size="2" mb="1" weight="bold">
											Transaction Hash
										</Text>
										<Link
											target="_blank"
											href={`https://preview.cardanoscan.io/transaction/${unlockTxHash}`}
										>
											{unlockTxHash}
										</Link>
									</Flex>
									<Flex gap="3" mt="4" justify="end">
										<Dialog.Close>
											<Button>閉じる</Button>
										</Dialog.Close>
									</Flex>
								</Dialog.Content>
							</Dialog.Root>
						</Flex>
					</Card>
				))
			) : (
				<p>You don&apos;t have GiftCard NFT yet.</p>
			)}
		</Grid>
	);
};

export default Redeem;
