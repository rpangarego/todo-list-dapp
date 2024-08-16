import React from "react";
import { formatAddress } from "@/utils";

type Props = {
  walletStatus: Boolean;
  account: String;
  chainId: Number;
};

const Header = ({ walletStatus, account, chainId }: Props) => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-3">Todo List dApp</h1>
      <p className="text-light text-gray-600 mb-5">
        Just a regular to-do list app, but built on top of the decentralized
        Ethereum testnet with React, Next.js, TypeScript, Hardhat, and Tailwind
        CSS.
      </p>

      {/* CONNECT WALLET COMPONENT */}
      <div className="mb-10">
        <p className="mb-3">
          <span className="font-bold">
            {!walletStatus && chainId != 11155111
              ? "Please connect to Sepolia network."
              : `Connected to ${formatAddress(account)}`}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Header;
