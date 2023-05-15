import type { AppProps } from "next/app";
import {
  ThirdwebProvider,
  localWallet,
  smartWallet,
} from "@thirdweb-dev/react";
import "../styles/globals.css";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "goerli";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      activeChain={activeChain}
      supportedWallets={[
        smartWallet({
          factoryAddress: "0x94537461B3A951a9a1c07F223C7025fF6E6bA25c", // Address of your account factory smart contract
          thirdwebApiKey:
            "a83399bbaf63d19d475f3a432cb6d4c10dcdf5b9f18ba508aa73d643ea2877558056bb8e052889b95528a52e8f8bb13657bcd3dff5d8d87a7a49693bcaa62188", // The API key you got from the previous step
          gasless: true,
          // Local wallet as the only option for EOA
          personalWallets: [
            localWallet({
              persist: true,
            }),
          ],
        }),
      ]}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
