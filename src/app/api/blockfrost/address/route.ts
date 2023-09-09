import { BlockFrostAPI } from "@blockfrost/blockfrost-js";
import { NextResponse } from "next/server";

interface Body {
	address: string
}

const API = new BlockFrostAPI({
	projectId: process.env.NEXT_PUBLIC_BLOCKFROST_API_KEY || "",
});

export async function POST(request: Request) {
	const body: Body = await request.json();

	try {
		const address = await API.addressesUtxosAll(body.address)
		return NextResponse.json({ address });
	} catch (error) {
		throw new Error("blockfrost fetch error.");
	}
}