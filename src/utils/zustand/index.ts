import { Lucid } from "lucid-cardano";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface Connecting {
	name: string;
	isEnabled: boolean;
	delegation: string | null;
};

interface StoreProps {
	theme: string;
	setTheme: (payload: string) => void;
	connecting: Connecting;
	setConnecting: (payload: Connecting) => void;
	lucid: Lucid | null
	setLucid: (payload: Lucid) => void;
}

export const useStore = create(
	devtools<StoreProps>((set) => ({
		theme: "dark",
		setTheme: (payload) => set({ theme: payload }),
		connecting: {
			name: "",
			isEnabled: false,
			delegation: null,
		},
		setConnecting: (payload) => set({ connecting: payload }),
		lucid: null,
		setLucid: (payload) => set({ lucid: payload }),
	})),
);