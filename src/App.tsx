import React from 'react';
import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';
import { ethers } from 'ethers';
import { AppProvider } from './AppContext';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import Background from './components/Background';

export const getLibrary = (provider: any): Web3Provider => {
  const library = new ethers.providers.Web3Provider(provider, 'any');
  library.pollingInterval = 10000;
  return library;
}

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <AppProvider>
        <Background />
        <Header />
        <Main />
        <Footer />
      </AppProvider>
    </Web3ReactProvider>
  );
}

export default App;
