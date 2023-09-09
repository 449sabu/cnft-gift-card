import { Lucid, Constr, Data, fromText } from "lucid-cardano";
import { AppliedValidators } from "@/utils/lucid";

interface MintTransactionProps {
	lucid: Lucid;
	parameterizedContracts: AppliedValidators;
	tokenMetadata: any;
	lovelace: number;
	sendAddress: string;
}

export const mintTransaction = async ({
	lucid,
	tokenMetadata,
	parameterizedContracts,
	lovelace,
	sendAddress,
}: MintTransactionProps) => {
	const utxos = await lucid.wallet.getUtxos();
	const utxo = utxos[0];
	const mintRedeemer = Data.to(new Constr(0, []));
	const assetName = `${parameterizedContracts!.policyId}${fromText(
		"CNFT Gift Card"
	)}`;

	const tx = await lucid
		.newTx()
		.collectFrom([utxo])
		.attachMintingPolicy(parameterizedContracts.giftCard)
		.mintAssets({ [assetName]: BigInt(1) }, mintRedeemer)
		.attachMetadata(721, tokenMetadata)
		.payToContract(
			parameterizedContracts.lockAddress,
			{
				inline: Data.void(),
			},
			{ lovelace: BigInt(lovelace) }
		)
		.payToAddress(sendAddress, {
			[assetName]: BigInt(1),
		})
		.complete();

	return tx;
};