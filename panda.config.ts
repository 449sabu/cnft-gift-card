import { defineConfig } from "@pandacss/dev";

export default defineConfig({
	// Whether to use css reset
	preflight: true,

	// Where to look for your css declarations
	include: [
		"./src/app/**/*.{ts,tsx,js,jsx}",
		"./src/pages/**/*.{js,jsx,ts,tsx}",
		"./src/components/**/*.{ts,tsx,js,jsx}",
	],

	// Files to exclude
	exclude: [],

	conditions: {
		light: "[data-theme=light] &",
		dark: "[data-theme=dark] &",
	},

	jsxFramework: "react",

	// Useful for theme customization
	theme: {
		extend: {
			tokens: {
				colors: {
					light: { value: "#F0F0F0", description: "Light mode base color." },
					dark: {
						value: "rgb(41,45,50)",
						description: "Dark mode base color.",
					},
				},
			},
			semanticTokens: {
				colors: {
					theme: {
						value: {
							_light: { base: "{colors.light}" },
							_dark: { _dark: "{colors.dark}" },
						},
					},
					primary: {
						value: {
							_light: { base: "{colors.neutral.950}" },
							_dark: { _dark: "{colors.neutral.50}" },
						},
					},
					secondary: {
						value: {
							_light: { base: "{colors.teal.500}" },
							_dark: { _dark: "{colors.orange.500}" },
						},
					},
				},
			},
		},
	},

	// globalCss: {
	// 	body: {
	// 		width: { md: "breakpoint-md", lg: "breakpoint-xl" },
	// 		background: "theme",
	// 		color: "primary",
	// 		minHeight: { base: "100vh" },
	// 		margin: "auto",
	// 	},
	// 	header: {
	// 		background: "theme",
	// 		color: "primary",
	// 		height: { base: "4rem", md: "6rem" },
	// 		position: "fixed",
	// 		top: "0",
	// 		zIndex: "100",
	// 	},
	// 	main: {
	// 		marginTop: { md: "6rem" },
	// 		border: "1px solid",
	// 		borderColor: "red.500"
	// 	},
	// },

	// The output directory for your css system
	outdir: "./src/styled-system",
});

//https://panda-css.com/docs/overview/getting-started