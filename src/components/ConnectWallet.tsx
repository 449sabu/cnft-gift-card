"use client"
import { Button, Container } from "@radix-ui/themes";
import { Lucid, Blockfrost } from "lucid-cardano";
import { useStore } from "@/utils/zustand";

const Test = () => {
  const setLucid = useStore((store) => store.setLucid)

	const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		const lucidInstance = await Lucid.new(
			new Blockfrost(
				"https://cardano-preview.blockfrost.io/api/v0",
				"preview1qzQvNyYajmp0014P4N5OMSbdyjMDCxI"
			),
			"Preview"
		);

		try {
			const api = await window.cardano["nami"].enable();
      const lucid = lucidInstance.selectWallet(api);
      setLucid(lucid);

		} catch {
			alert("ウォレット接続をキャンセルしました。");
		}
	};

	return (
		<Container>
			<Button
				onClick={(e) => {
					handleClick(e);
				}}
			>
				Nami Wallet
			</Button>
		</Container>
	);
};

export default Test;