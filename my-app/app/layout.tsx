import { ReactNode } from "react";
import type { Metadata } from "next";
import "./globals.css";
import { Web3Modal } from "@/context/web3modal";

export const metadata: Metadata = {
  title: "Todo List dApp",
  description: "Created by Ronaldo Pangarego",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Web3Modal>{children}</Web3Modal>
      </body>
    </html>
  );
}
