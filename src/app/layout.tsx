// import "./globals.css";
import type { Metadata } from "next";
// import Providers from "@/app/providers";
import "@radix-ui/themes/styles.css";
import { Theme, ThemePanel } from "@radix-ui/themes";

export const metadata: Metadata = {
	title: "Cardano Gift",
	description: "Cardano GiftCard app",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			{/* <Providers> */}
			<body>
				<Theme
					accentColor="crimson"
					grayColor="sand"
					radius="large"
					scaling="95%"
					appearance="dark"
				>
					{children}
					{/* <ThemePanel /> */}
				</Theme>
			</body>
			{/* </Providers> */}
		</html>
	);
}
