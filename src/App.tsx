import './App.css'

import { osmosis } from 'graz/chains'

import { GrazProvider, useAccount, useConnect, useCosmWasmSigningClient, useDisconnect, useStargateSigningClient } from "graz";

function Wallet() {
  const { connect, status } = useConnect();
  const { data: account, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  function handleConnect() {
    return isConnected ? disconnect() : connect({ chainId: osmosis.chainId});
  }

  return (
    <div>
      {account ? `Connected to ${account.bech32Address}` : status}
      <button onClick={handleConnect}>{isConnected ? "Disconnect" : "Connect"}</button>
    </div>
  );
}

function StargateClient () {
  const { data: signingClient } = useStargateSigningClient()

  if(signingClient === null || signingClient === undefined) {
    return <div>No signing stargate client yet</div>
  } else {
    return <div>We have a signing stargate client!!!</div>
  }
}

function CosmWasmClient () {
  const { data: signingClient } = useCosmWasmSigningClient()

  if(signingClient === null || signingClient === undefined) {
    return <div>No signing cosmwasm client yet</div>
  } else {
    return <div>We have a signing cosmwasm client!!!</div>
  }
}

function App() {
  return (
    <>
      <h1>Connect Wallet Test</h1>

      <GrazProvider
        grazOptions={{ chains: [osmosis] }}
      >
        <Wallet />
        <StargateClient />
        <CosmWasmClient />
      </GrazProvider>
    </>
  )
}

export default App
