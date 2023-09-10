'use client';
import dynamic from 'next/dynamic';

const ConnectWallet = dynamic(() => import('@/components').then((mod) => mod.ConnectWallet), {
  ssr: false,
});

const ClientWrapper = () => {
  return (
    <div>
      <ConnectWallet />
    </div>
  );
};

export default ClientWrapper;
