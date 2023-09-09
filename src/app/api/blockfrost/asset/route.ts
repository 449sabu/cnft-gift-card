import { BlockFrostAPI } from "@blockfrost/blockfrost-js";
import { NextResponse } from "next/server";

interface Unit {
	policyId: string;
	assetName: string | null;
	name: string | null;
	label: number | null;
}

interface Body {
	assets: Unit[];
}

const API = new BlockFrostAPI({
	projectId: process.env.NEXT_PUBLIC_BLOCKFROST_API_KEY || "",
});

export async function POST(request: Request) {
	const body: Body = await request.json();

	try {
		const assets = await Promise.all(
			body.assets.map(async (data) => {
				const asset = await API.assetsById(`${data.policyId}${data.assetName}`);
				const tx = await API.txsUtxos(asset.initial_mint_tx_hash);
				
				return {
					asset,
					tx,
				};
			})
		);

		return NextResponse.json({ assets });
	} catch (error) {
		throw new Error("blockfrost fetch error.");
	}
}
