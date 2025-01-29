import localFont from "next/font/local";

export const bricolage_grotesque = localFont({
	src: [
		{
			path: "../public/fonts/bricolage-grotesque/BricolageGrotesque-Bold.woff2",
			weight: "700",
			style: "normal",
		},
	],
	display: "swap",
	variable: "--font-bricolage-grotesque",
});
export const familjen_grotesk = localFont({
	src: [
		{
			path: "../public/fonts/familjen-grotesk/FamiljenGrotesk-Bold.woff2",
			weight: "700",
			style: "normal",
		},
	],
	display: "swap",
	variable: "--font-familjen-grotesk",
});
export const libre_baskerville = localFont({
	src: [
		{
			path: "../public/fonts/libre-baskerville/LibreBaskerville-Bold.woff2",
			weight: "700",
			style: "normal",
		},
	],
	display: "swap",
	variable: "--font-libre-baskerville",
});

export const playfair_display = localFont({
	src: [
		{
			path: "../public/fonts/playfair-display/PlayfairDisplay-Bold.woff2",
			weight: "700",
			style: "normal",
		},
	],
	display: "swap",
	variable: "--font-playfair-display",
});

export const syne = localFont({
	src: [
		{
			path: "../public/fonts/syne/Syne-Bold.woff2",
			weight: "700",
			style: "normal",
		},
	],
	display: "swap",
	variable: "--font-syne",
});

export const arimo = localFont({
	src: [
		{
			path: "../public/fonts/arimo/Arimo-Bold.woff2",
			weight: "700",
			style: "normal",
		},
	],
	display: "swap",
	variable: "--font-arimo",
});
export const clashGroteskSemibold = localFont({
	src: "../public/fonts/ClashGroteskSemibold.woff",
	display: "swap",
	variable: "--font-clash-grotesk",
});

export const inter = localFont({
	src: [
		{
			path: "../public/fonts/inter/Inter-Regular.woff2",
			weight: "400",
			style: "normal",
		},
		{
			path: "../public/fonts/inter/Inter-Medium.woff2",
			weight: "500",
			style: "normal",
		},
		{
			path: "../public/fonts/inter/Inter-SemiBold.woff2",
			weight: "600",
			style: "normal",
		},
		{
			path: "../public/fonts/inter/Inter-Bold.woff2",
			weight: "700",
			style: "normal",
		},
	],
	display: "swap",
	variable: "--font-inter",
});
