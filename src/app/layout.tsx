import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";

import "@/styles/globals.css";

import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

import AppWrapper from "./app-wrapper";

export const metadata: Metadata = {
  title: {
    default: "GoldenForge",
    template: "%s | GoldenForge",
  },
  description:
    "GoldenForge is a NeoForge fork that brings Paper and other fork performance patches to modded Minecraft servers.",
  keywords: ["goldenforge", "neoforge", "paper", "minecraft", "server", "performance", "mods"],
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}
