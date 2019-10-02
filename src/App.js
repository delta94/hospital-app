import React from 'react';
import { ApolloClient, ApolloLink } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-common';
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";

import { config } from './config';

import ModalContextProvider from './context/modalContext';
import RouterComponent from "./routes";

function App() {
  const httpLink = new HttpLink({ uri: config.baseUrl });

  const authLink = new ApolloLink((operation, forward) => {
    const token = localStorage.getItem('token');
    operation.setContext({
      headers: {
        'x-auth-token': token ? token : ''
      }
    });

    // Call the next link in the middleware chain.
    return forward(operation);
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
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
