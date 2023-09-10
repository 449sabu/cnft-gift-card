import type { Cardano } from "lucid-cardano";
import { useState, useEffect } from "react";
import type { Wallets } from "@/types";

export const useBrowserWallet = () => {
  const [wallets, setWallets] = useState<Array<Cardano[Wallets]>>([]);

  useEffect(() => {
    const Cardano = window.cardano;
    const haveWallet: Array<Cardano[Wallets]> = [];

    if (Cardano.nami) {
      haveWallet.push(Cardano.nami);
    }
    if (Cardano.eternl) {
      haveWallet.push(Cardano.eternl);
    }
    // if (Cardano.flint) {
    // 	haveWallet.push(Cardano.flint);
    // }
    // if (Cardano.lace) {
    // 	haveWallet.push(Cardano.lace);
    // }
    // if (Cardano.gerowallet) {
    // 	haveWallet.push(Cardano.gerowallet);
    // }
    // if (Cardano.cardwallet) {
    // 	haveWallet.push(Cardano.cardwallet);
    // }
    setWallets(haveWallet);
  }, []);

  return {
    wallets,
  };
};
