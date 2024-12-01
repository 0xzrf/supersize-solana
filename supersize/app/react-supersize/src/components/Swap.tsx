import React, { FC } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { RaydiumSwap } from '../helper/raydium-swap';
import { CONFIG } from '../helper/config';
const QUICKNODE_URL="https://fabled-black-spring.solana-mainnet.quiknode.pro/403e73aa24efc4d0ac66d3741cb69cc9cf0b0720"

interface SwapProps {
  quoteMint: string;
  amount: number;
}

export const Swap: FC<SwapProps> = ({ quoteMint, amount }) => {
  const wallet = useWallet();

  const handleSwap = async () => {
    try {
      if (!wallet.connected || !wallet.publicKey) {
        throw new Error('Please connect your wallet first');
      }

      console.log("Hello world")
      const raydiumSwap = new RaydiumSwap(QUICKNODE_URL, wallet);
      
      // Find pool info
      const poolKeys = await raydiumSwap.findRaydiumPoolInfo(
        CONFIG.BASE_MINT,
        quoteMint
      );

      console.log("Running till here")
      if (!poolKeys) {
        throw new Error('Pool not found');
      }

      // Get swap transaction
      const transaction = await raydiumSwap.getSwapTransaction(
        quoteMint,
        amount,
        poolKeys,
        CONFIG.USE_VERSIONED_TRANSACTION,
        CONFIG.SLIPPAGE
      );

      // Send transaction
      if ('version' in transaction) {
        const { blockhash, lastValidBlockHeight } = await raydiumSwap.connection.getLatestBlockhash();
        const signature = await raydiumSwap.sendVersionedTransaction(
          transaction,
          blockhash,
          lastValidBlockHeight
        );
        console.log('Swap successful:', signature);
      } else {
        const signature = await raydiumSwap.sendLegacyTransaction(transaction);
        console.log('Swap successful:', signature);
      }
    } catch (error) {
      console.error('Swap failed:', error);
    }
  };

  return (
    <button 
      onClick={handleSwap}
      disabled={!wallet.connected}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:cursor-pointer hover:bg-blue-600 disabled:bg-gray-400"
    >
      Buy Now
    </button>
  );
};
