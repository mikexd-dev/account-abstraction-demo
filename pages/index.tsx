import {
  ConnectWallet,
  Web3Button,
  useAddress,
  useContract,
  useNFT,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { editionDropAddress, editionDropTokenId } from "../const/yourDetails";

export default function Home() {
  const address = useAddress();

  const { contract: editionDropContract } = useContract(editionDropAddress);
  const { data: nft, isLoading: isNftLoading } = useNFT(
    editionDropContract,
    editionDropTokenId
  );
  const { data: ownedNfts, refetch: refetchOwnedNfts } = useOwnedNFTs(
    editionDropContract,
    address
  );

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to{" "}
          <a href="https://thirdweb.com/">
            Authentick Account Abstraction App (AAA)
          </a>
          !
        </h1>

        <p className={styles.description}>
          Claim the nft without needing to approve <br />
          any transaction prompt or pay gas fee
          <br /> <br />
          <div style={{ fontSize: "15px", textAlign: "center" }}>
            (Note: claiming takes a while, please be patient and a popup will
            show up when it's done)
          </div>
          <div
            style={{ fontSize: "15px", textAlign: "center", color: "yellow" }}
          >
            (Note: this is still just a beta version from thirdweb)
          </div>
        </p>

        <div className={styles.connect}>
          <ConnectWallet
            dropdownPosition={{
              align: "center",
              side: "bottom",
            }}
            btnTitle="Login"
          />
        </div>

        {isNftLoading ? (
          "Loading..."
        ) : (
          <div className={styles.card}>
            <img
              className={styles.nftImage}
              src={nft.metadata.image}
              alt={nft.metadata.description}
            />
            {address ? (
              <>
                <p>You own {ownedNfts?.[0]?.quantityOwned || "0"}</p>
                <Web3Button
                  contractAddress={editionDropAddress}
                  action={(contract) =>
                    contract.erc1155.claim(editionDropTokenId, 1)
                  }
                  onSuccess={async () => {
                    await refetchOwnedNfts();
                    alert("Claim successful!");
                  }}
                  style={{ width: "100%", marginTop: "10px" }}
                >
                  Claim!
                </Web3Button>
              </>
            ) : (
              <p>Login to claim!</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
