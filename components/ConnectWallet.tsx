'use client'

import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";

const ConnectWallet = () => {
  const [isClient, setIsClient] = useState(false)
  const { address, isConnecting, isDisconnected } = useAccount();

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <>
      {isClient && 
        <>
          <ConnectKitButton />
          { isConnecting && "connecting..." }
          { isDisconnected && "no wallet connected" }
        </>
      }
    </>
  )
};

export default ConnectWallet