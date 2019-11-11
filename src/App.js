import React from 'react';
import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-boost';
import { createUploadLink } from 'apollo-upload-client';
import { ApolloProvider } from '@apollo/react-common';
import { InMemoryCache } from "apollo-cache-inmemory";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
//import { HttpLink } from "apollo-link-http";

import { config } from './config';

import ModalContextProvider from './context/modalContext';
import AuthContextProvider from './context/authContext';
import RouterComponent from "./routes";

function App() {
  const httpLink = createUploadLink({
    uri: config.baseUrl
  });

  const authLink = new ApolloLink((operation, forward) => {
    const token = localStorage.getItem("token");
    operation.setContext({
      headers: {
        "x-auth-token": token ? token : ""
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
        <AuthContextProvider>
          <ModalContextProvider>
            <RouterComponent />

            <ToastContainer
              position="top-right"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
            />
          </ModalContextProvider>
        </AuthContextProvider>
      </div>
    </ApolloProvider>
  );
}

export default App;
