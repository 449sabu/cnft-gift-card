"use client";
import React, { useState } from "react";
import { AppliedValidators, applyParams, Validators } from "@/utils/lucid";
import {
	Constr,
	Data,
	fromText,
	Metadata,
} from "lucid-cardano";
import { useStore } from "@/utils/zustand";
import { Button, Flex, Heading, Link, TextField } from "@radix-ui/themes";

export interface OneshotProps {
	validators: Validators;
}

const Mint = ({ validators }: OneshotProps) => {
	const lucid = useStore((state) => state.lucid);
	const [tokenName, setTokenName] = useState<string>("Gift Card NFT");
	const [parameterizedContracts, setParameterizedContracts] =
		useState<AppliedValidators | null>(null);
	const [giftADA, setGiftADA] = useState<string | undefined>();
	const [lockTxHash, setLockTxHash] = useState<string | undefined>(undefined);
	const [waitingLockTx, setWaitingLockTx] = useState<boolean>(false);
	const [unlockTxHash, setUnlockTxHash] = useState<string | undefined>(
		undefined
	);
	const [waitingUnlockTx, setWaitingUnlockTx] = useState<boolean>(false);

	const submitTokenName = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (lucid) {
			const utxos = await lucid.wallet.getUtxos();
			const utxo = utxos[0];
			console.log(utxo)
			const outputReference = {
				txHash: utxo.txHash,
				outputIndex: utxo.outputIndex,
			};
			console.log(outputReference)
			const contracts = applyParams(
				tokenName,
				outputReference,
				validators,
				lucid!
			);
			setParameterizedContracts(contracts);
			console.log(contracts);
			try {
			} catch {
				alert("Error");
			}
		} else {
			alert("ウォレットが接続されていません");
		}
	};

	const createGiftCard = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setWaitingLockTx(true);

		if (lucid) {
			try {
				const lovelace = Number(giftADA) * 1000000;
				const assetName = `${parameterizedContracts!.policyId}${fromText(
					tokenName
				)}`;
				console.log("assetName" + assetName);
				const mintRedeemer = Data.to(new Constr(0, []));
				const utxos = await lucid?.wallet.getUtxos()!;
				const utxo = utxos[0];

				// https://cips.cardano.org/cips/cip68/#222nftstandard
				const nftMetadata: Metadata["222"] = {
					name: "Gift Card NFT",
					image: "ipfs://QmeRSe6ZPVqcEPU49GoyuEEGoXUwCHoKVLb8yEqHvDNaFi",
					mediaType: "image/jpeg",
					description: "CIEL GIFT CARD description",
					files: [
						{
							name: "Gift Card NFT",
							mediaType: "image/jpeg",
							src: "ipfs://QmeRSe6ZPVqcEPU49GoyuEEGoXUwCHoKVLb8yEqHvDNaFi",
						},
					],
				};

				// https://cips.cardano.org/cips/cip25/
				const oldMetadata = {
					"1d078056117f5495b15afbc25513be17cd93bb7a6779037073d4b3fe": {
						"Gift Card NFT": {
							name: "Gift Card NFT",
							image: "ipfs://QmYBNa1y2J8NKv6u3ZYkGK96fqRsNd3gXXPnTeNTbfPb2F",
							mediaType: "image/jpeg",
							description: "CIEL GIFT CARD description",
							files: [
								{
									name: "CIEL GIFT CARD",
									mediaType: "image/jpeg",
									src: "ipfs://QmYBNa1y2J8NKv6u3ZYkGK96fqRsNd3gXXPnTeNTbfPb2F",
								},
							],
						},
					},
					version: 1,
				};

				const svgMetadata = {
					[parameterizedContracts!.policyId]: {
						"Gift Card NFT": {
							name: "Gift Card NFT",
							// "image": [
							// 	"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjMwMC",
							// 	"Igdmlld0JveD0iMCAwIDYwMCAzMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy",
							// 	"8yMDAwL3N2ZyI+PGcgdGV4dC1hbmNob3I9Im1pZGRsZSIgc3R5bGU9ImZvbnQ6Nz",
							// 	"AwIDI1cHQgc2Fucy1zZXJpZiIgZmlsbD0iI2ZmZiIgc3Ryb2tlPSIjMDAwIiBzdH",
							// 	"Jva2Utd2lkdGg9IjIiPjx0ZXh0IHg9IjUwJSIgeT0iMTUlIj5pbnRlcmFjdGl2ZS",
							// 	"B8IG9uY2hhaW4gfCBhcHBsaWNhdGlvbjwvdGV4dD48dGV4dCB4PSI1MCUiIHk9Ij",
							// 	"U1JSIgZm9udC1zaXplPSI3NSI+U1RFTExBUiBIT09EPC90ZXh0Pjx0ZXh0IHg9Ij",
							// 	"UwJSIgeT0iOTAlIiBmb250LXNpemU9IjU1Ij4jMTA0PC90ZXh0PjwvZz48L3N2Zz",
							// 	"4="
							// ],
							"mediaType": "image/svg+xml",
							description: "CIEL GIFT CARD description",
							// "files": [{
							// 	"name": " CIEL",
							// 	"mediaType": "text/html",
							// 	"src": [
							// 		"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjMwMC",
							// 		"Igdmlld0JveD0iMCAwIDYwMCAzMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy",
							// 		"8yMDAwL3N2ZyI+PGcgdGV4dC1hbmNob3I9Im1pZGRsZSIgc3R5bGU9ImZvbnQ6Nz",
							// 		"AwIDI1cHQgc2Fucy1zZXJpZiIgZmlsbD0iI2ZmZiIgc3Ryb2tlPSIjMDAwIiBzdH",
							// 		"Jva2Utd2lkdGg9IjIiPjx0ZXh0IHg9IjUwJSIgeT0iMTUlIj5pbnRlcmFjdGl2ZS",
							// 		"B8IG9uY2hhaW4gfCBhcHBsaWNhdGlvbjwvdGV4dD48dGV4dCB4PSI1MCUiIHk9Ij",
							// 		"U1JSIgZm9udC1zaXplPSI3NSI+U1RFTExBUiBIT09EPC90ZXh0Pjx0ZXh0IHg9Ij",
							// 		"UwJSIgeT0iOTAlIiBmb250LXNpemU9IjU1Ij4jMTA0PC90ZXh0PjwvZz48L3N2Zz",
							// 		"4="
							// 	]
							// }]
						},
					},
					version: 1,
				}

				const tx = await lucid!
					.newTx()
					.collectFrom([utxo])
					// use the gift_card validator
					.attachMintingPolicy(parameterizedContracts!.giftCard)
					// mint 1 of the asset
					.mintAssets(
						{ [assetName]: BigInt(1) },
						// this redeemer is the first argument to the gift_card validator
						mintRedeemer
					)
					// Metadata付きテスト
					// .attachMetadata(222, nftMetadata)
					.attachMetadata(721, svgMetadata)
					.payToContract(
						parameterizedContracts!.lockAddress,
						{
							// On unlock this gets passed to the redeem
							// validator as datum. Our redeem validator
							// doesn't use it so we can just pass in anything.
							inline: Data.void(),
						},
						{ lovelace: BigInt(lovelace) }
					)
					.complete();

				const txSigned = await tx.sign().complete();
				const txHash = await txSigned.submit();
				const success = await lucid!.awaitTx(txHash);

				// Wait a little bit longer so ExhaustedUTxOError doesn't happen
				// in the next Tx
				setTimeout(() => {
					setWaitingLockTx(false);

					if (success) {
						setLockTxHash(txHash);
					}
				}, 3000);
			} catch (error) {
				alert(JSON.stringify(error));
				setWaitingLockTx(false);
			}
		} else {
			alert("ウォレットが接続されていません");
		}
	};

	const redeemGiftCard = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		setWaitingUnlockTx(true);

		// const lucid = await Lucid.new(
		// 	new Blockfrost(
		// 		"https://cardano-preview.blockfrost.io/api/v0",
		// 		"preview1qzQvNyYajmp0014P4N5OMSbdyjMDCxI"
		// 	),
		// 	"Preview"
		// );

		if (lucid) {
			try {
				const utxos = await lucid!.utxosAt(parameterizedContracts!.lockAddress);
				const assetName = `${parameterizedContracts!.policyId}${fromText(
					tokenName
				)}`;

				// Action::Burn
				// This is how you build the redeemer for gift_card
				// when you want to perform the Burn action.
				const burnRedeemer = Data.to(new Constr(1, []));

				const tx = await lucid!
					.newTx()
					.collectFrom(
						utxos,
						// This is the second argument to the redeem validator
						// and we also don't do anything with it similar to the
						// inline datum. It's fine to pass in anything in this case.
						Data.void()
					)
					// use the gift_card validator again
					.attachMintingPolicy(parameterizedContracts!.giftCard)
					// use the redeem validator
					.attachSpendingValidator(parameterizedContracts!.redeem)
					.mintAssets(
						// notice the negative one here
						{ [assetName]: BigInt(-1) },
						// this redeemer is the first argument to the gift_card validator
						burnRedeemer
					)
					.complete();

				const txSigned = await tx.sign().complete();
				const txHash = await txSigned.submit();
				const success = await lucid!.awaitTx(txHash);
				setWaitingUnlockTx(false);

				if (success) {
					setUnlockTxHash(txHash);
				}
			} catch (error) {
				console.log(JSON.stringify(error));
				setWaitingUnlockTx(false);
			}
		} else {
			alert("ウォレットが接続されていません");
		}

		// try {
		// 	// const api = await window.cardano.nami.enable();
		// 	// lucid.selectWallet(api);

		// 	// get the utxos at the redeem validator's address
		// 	const utxos = await lucid!.utxosAt(parameterizedContracts!.lockAddress);

		// 	const assetName = `${parameterizedContracts!.policyId}${fromText(
		// 		tokenName
		// 	)}`;

		// 	// Action::Burn
		// 	// This is how you build the redeemer for gift_card
		// 	// when you want to perform the Burn action.
		// 	const burnRedeemer = Data.to(new Constr(1, []));

		// 	const tx = await lucid!
		// 		.newTx()
		// 		.collectFrom(
		// 			utxos,
		// 			// This is the second argument to the redeem validator
		// 			// and we also don't do anything with it similar to the
		// 			// inline datum. It's fine to pass in anything in this case.
		// 			Data.void()
		// 		)
		// 		// use the gift_card validator again
		// 		.attachMintingPolicy(parameterizedContracts!.giftCard)
		// 		// use the redeem validator
		// 		.attachSpendingValidator(parameterizedContracts!.redeem)
		// 		.mintAssets(
		// 			// notice the negative one here
		// 			{ [assetName]: BigInt(-1) },
		// 			// this redeemer is the first argument to the gift_card validator
		// 			burnRedeemer
		// 		)
		// 		.complete();

		// 	const txSigned = await tx.sign().complete();

		// 	const txHash = await txSigned.submit();

		// 	const success = await lucid!.awaitTx(txHash);

		// 	setWaitingUnlockTx(false);

		// 	if (success) {
		// 		setUnlockTxHash(txHash);
		// 	}
		// } catch {
		// 	setWaitingUnlockTx(false);
		// }
	};

	return (
		<div>
			<form onSubmit={submitTokenName}>
				<Flex gap="3">
					<TextField.Root>
						<TextField.Input
							id="tokenName"
							name="tokenName"
							placeholder="Token name…"
							value={tokenName}
							onChange={(e) => setTokenName(e.currentTarget.value)}
						/>
					</TextField.Root>
					<Button type="submit">Make Contracts</Button>
				</Flex>
			</form>

			{parameterizedContracts && (
				<>
					{/* <h3>Redeem</h3>
					<pre>{parameterizedContracts.redeem.script}</pre>
					<h3>Gift Card</h3>
					<pre>{parameterizedContracts.giftCard.script}</pre> */}

					<h3>Asset Name</h3>
					<p>{fromText(tokenName)}</p>

					<Flex gap="3">
						<TextField.Root>
							<TextField.Input
								name="giftADA"
								id="giftADA"
								value={giftADA}
								onChange={(e) => {
									setGiftADA(e.currentTarget.value);
									console.log(e.currentTarget.value);
								}}
							/>
						</TextField.Root>
						<Button
							onClick={(e) => {
								createGiftCard(e);
							}}
							disabled={waitingLockTx || !!lockTxHash}
						>
							{" "}
							{waitingLockTx
								? "Waiting for Tx..."
								: "Create Gift Card (Locks ADA)"}
						</Button>
					</Flex>
					<div>
						{lockTxHash && (
							<>
								<Heading>ADA Locked</Heading>

								<Link
									target="_blank"
									href={`https://preview.cardanoscan.io/transaction/${lockTxHash}`}
								>
									{lockTxHash}
								</Link>

								<Button
									onClick={(e) => {
										redeemGiftCard(e);
									}}
									disabled={waitingLockTx || !!unlockTxHash}
								>
									{waitingUnlockTx
										? "Waiting for Tx..."
										: "Redeem Gift Card (Unlocks ADA)"}
								</Button>
							</>
						)}

						{unlockTxHash && (
							<>
								<Heading>ADA Unlocked</Heading>
								<Link
									target="_blank"
									href={`https://preview.cardanoscan.io/transaction/${unlockTxHash}`}
								>
									{unlockTxHash}
								</Link>
							</>
						)}
					</div>
				</>
			)}
		</div>
	);
};

export default Mint;
