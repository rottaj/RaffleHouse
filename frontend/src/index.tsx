import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ChainId, DAppProvider, useEtherBalance, useEthers } from '@usedapp/core'

const config = {
    readOnlyChainId: ChainId.Mainnet,
    readOnlyUrls: {
      [ChainId.Mainnet]: 'https://rinkeby.infura.io/v3/8936a6ecfe9245159a186a0fbec7bdce',
    },
  }

  
ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={config}>
      <App />
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);