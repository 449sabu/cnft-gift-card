"use client";
import React, { useEffect, useState } from "react";
import { Constr, Data, fromText } from "lucid-cardano";

import { AppliedValidators, applyParams, Validators } from "@/utils/lucid";
import { useStore } from "@/utils/zustand";
import { Grid } from "@radix-ui/themes";

export interface RedeemProps {
	validators: Validators;
}

const Redeem = ({ validators }: RedeemProps) => {
	const lucid = useStore((state) => state.lucid);
	const [tokenName, setTokenName] = useState<string>("Gift Card NFT");
	const [waitingUnlockTx, setWaitingUnlockTx] = useState<boolean>(false);
	const [unlockTxHash, setUnlockTxHash] = useState<string | undefined>(
		undefined
	);
	const [giftCardList, setGiftCardList] = useState<any[]>();

	const getGiftCardList = async () => {
		const utxos = await lucid?.wallet.getUtxos();
		console.log(utxos);
		return [];
	};

	useEffect(() => {
		getGiftCardList().then((data) => {
			setGiftCardList(data);
		});
	}, []);

	return (
		<div>
			Redeemer Section
			<Grid>
				{giftCardList?.map((e, i) => (
					<p key={i}>{JSON.stringify(e)}</p>
				))}
			</Grid>
		</div>
	);
};

export default Redeem;
