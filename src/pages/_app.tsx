// import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Theme, ThemePanel } from "@radix-ui/themes";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<main>
			<Theme
				accentColor="crimson"
				grayColor="sand"
				radius="large"
				scaling="95%"
				appearance="light"
			>
				<Component {...pageProps} />
				{/* <ThemePanel /> */}
			</Theme>
		</main>
	);
}
