import React from 'react';
import { DAppProvider, ChainId } from "@usedapp/core"
import { Header } from "./components/Header"
import { Container } from '@mui/material'
import { Main } from "./components/Main"

function App() {
  return (
    <DAppProvider config={{
      supportedChains: [ChainId.Kovan],
      notifications: {
        expirationPeriod: 1000,
        checkInterval: 1000
      }
    }}>
      <Header />
      <Container maxWidth="md">
        <Main />
      </Container>
    </DAppProvider>
  );
}

export default App;
