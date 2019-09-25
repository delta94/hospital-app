import React from 'react';
import { withRouter } from 'react-router-dom';
import { ApolloClient } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-common';
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";

import { config } from './config';

import ModalContextProvider from './context/modalContext';
import RouterComponent from "./routes";
import Header from './components/Header';

import { getUserFromLocal } from './utils/getUserFromLocal';

function App({location}) {
  const user = getUserFromLocal();

  const client = new ApolloClient({
    link: new HttpLink({uri: config.baseUrl}),
    cache: new InMemoryCache()
  });

  return (
    <ApolloProvider client={client}>
      <div className="App">
        {location.pathname !== "/login" && location.pathname !== "/register" ? (
          <Header user={user} />
        ) : null}
        <ModalContextProvider>
          <RouterComponent />
        </ModalContextProvider>
      </div>
    </ApolloProvider>
  );
}

export default withRouter(App);
