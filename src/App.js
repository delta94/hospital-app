import React from 'react';
import ApolloClient from 'apollo-client';
//import { ApolloLink } from 'apollo-boost';
import { createUploadLink } from 'apollo-upload-client';
import { ApolloProvider } from '@apollo/react-common';
import { InMemoryCache } from "apollo-cache-inmemory";
//import { HttpLink } from "apollo-link-http";

import { config } from './config';

import ModalContextProvider from './context/modalContext';
import AuthContextProvider from './context/authContext';
import RouterComponent from "./routes";

function App() {
  const httpLink = createUploadLink({ uri: config.baseUrl });

  // const authLink = new ApolloLink((operation, forward) => {
  //   const token = localStorage.getItem('token');
  //   //console.log('this should run after token set to local storage');
  //   operation.setContext({
  //     headers: {
  //       'x-auth-token': token ? token : ''
  //     }
  //   });

  //   // Call the next link in the middleware chain.
  //   return forward(operation);
  // });

  const client = new ApolloClient({
    link:httpLink,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <AuthContextProvider>
          <ModalContextProvider>
            <RouterComponent />
          </ModalContextProvider>
        </AuthContextProvider>
      </div>
    </ApolloProvider>
  );
}

export default App;
