import React from 'react';
import { ApolloClient } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-common';
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";

import { config } from './config';

import ModalContextProvider from './context/modalContext';
import RouterComponent from "./routes";

function App() {
  const client = new ApolloClient({
    link: new HttpLink({uri: config.baseUrl}),
    cache: new InMemoryCache()
  });

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <ModalContextProvider>
          <RouterComponent />
        </ModalContextProvider>
      </div>
    </ApolloProvider>
  );
}

export default App;
