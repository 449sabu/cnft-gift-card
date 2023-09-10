"use client";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { Button, DropdownMenu, Flex } from "@radix-ui/themes";
import { Lucid, Blockfrost } from "lucid-cardano";
import { useBrowserWallet } from "@/hooks/useBrowserWallet";
import { useStore } from "@/utils/zustand";

const Test = () => {
  const setLucid = useStore((store) => store.setLucid);
  const { wallets } = useBrowserWallet();

  const walletList = wallets.map((wallet) => {
    return {
      key:
        wallet.name === "Nami"
          ? "nami"
          : wallet.name === "eternl"
          ? "eternl"
          : wallet.name === "Flint Wallet"
          ? "flint"
          : wallet.name === "lace"
          ? "lace"
          : wallet.name === "GeroWallet"
          ? "gerowallet"
          : "cardwallet",
      ...wallet,
    };
  });

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>,
    wallet: string,
  ) => {
    e.preventDefault();

    const lucidInstance = await Lucid.new(
      new Blockfrost(
        process.env.NEXT_PUBLIC_BLOCKFROST_URL || "",
        process.env.NEXT_PUBLIC_BLOCKFROST_API_KEY,
      ),
      "Preview",
    );

    try {
      const api = await window.cardano[wallet].enable();
      const lucid = lucidInstance.selectWallet(api);
      setLucid(lucid);
    } catch {
      alert("ウォレット接続をキャンセルしました。");
    }
  };

  return (
    <Flex direction="row" gap="3">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="soft">
            Select Wallet
            <CaretDownIcon />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          {walletList.map((element, index) => (
            <DropdownMenu.Item
              key={index}
              onClick={(e) => {
                handleClick(e, element.key);
              }}
            >
              <Flex gap="4" align="center" justify="center">
                <img src={element.icon} alt="" height="24px" />
                {element.name}
              </Flex>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Flex>
  );
};

export default Test;
