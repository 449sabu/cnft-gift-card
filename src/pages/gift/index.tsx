import { GetServerSideProps, NextPage } from "next";
import fsPromises from "fs/promises";
import path from "path";
import { Center } from "@/styled-system/jsx";
import { readValidators, type Blueprint } from "@/utils/lucid";
import { Mint, Redeem, ConnectWallet } from "@/components";
import { Container, Heading, Section, Text } from "@radix-ui/themes";

type Props = {
	blueprint: Blueprint;
};

export const getStaticProps: GetServerSideProps = async () => {
	const filePath = path.join(process.cwd(), "aiken", "plutus.json");
	const data = await fsPromises.readFile(filePath, "utf-8");
	const blueprint = JSON.parse(data);

	return {
		props: {
			blueprint: blueprint,
		},
	};
};

const index: NextPage<Props> = (props) => {
	const { blueprint } = props;
	const validators = readValidators(blueprint);

	return (
		<Container>
			<Section>
			<Heading>Connect Wallet</Heading>
				<ConnectWallet />
			</Section>

			<Section>
				<Heading>Mint NFT</Heading>
				<Mint validators={validators} />
			</Section>

			<Section>
				<Heading>Redeem NFT</Heading>
				{/* <Redeem /> */}
			</Section>
		</Container>
	);
};

export default index;
