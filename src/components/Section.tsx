"use client";
import { Blueprint, Validators } from "@/utils/lucid";
import { useStore } from "@/utils/zustand";
import { Container, Heading, Section } from "@radix-ui/themes";
import dynamic from "next/dynamic";

const ConnectWallet = dynamic(
	() => import("@/components").then((mod) => mod.ConnectWallet),
	{
		ssr: false,
	}
);

const Mint = dynamic(() => import("@/components").then((mod) => mod.Mint), {
	ssr: false,
});

const Redeem = dynamic(() => import("@/components").then((mod) => mod.Redeem), {
	ssr: false,
});

export interface SectionProps {
	blueprint: Blueprint;
}

const Controller = ({ blueprint }: SectionProps) => {
	const lucid = useStore((state) => state.lucid);

	const readValidators = (blueprint: Blueprint): Validators => {
		const redeem = (blueprint as Blueprint).validators.find(
			(v) => v.title === "oneshot.redeem"
		);

		if (!redeem) {
			throw new Error("Redeem validator not found");
		}

		const giftCard = (blueprint as Blueprint).validators.find(
			(v) => v.title === "oneshot.gift_card"
		);

		if (!giftCard) {
			throw new Error("Gift Card validator not found");
		}

		return {
			redeem: {
				type: "PlutusV2",
				script: redeem.compiledCode,
			},
			giftCard: {
				type: "PlutusV2",
				script: giftCard.compiledCode,
			},
		};
	};

	const validators = readValidators(blueprint);

	if (lucid) {
		return (
			<Container>
				<Section>
					<Heading>Mint NFT</Heading>
					<Mint validators={validators} />
				</Section>

				<Section>
				<Heading>Redeem NFT</Heading>
				<Redeem validators={validators}/>
			</Section>
			</Container>
		);
	}

	return (
		<Container>
			<Section>
				<Heading>Connect Wallet</Heading>
				<ConnectWallet />
			</Section>
		</Container>
	);
};

export default Controller;
