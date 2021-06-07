/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

import { DataContextProvider } from './contexts/dataContext';
import MainScreen from './MainScreen';


const App= () => {
  const client = new ApolloClient({
    uri: 'http://localhost:4000',
    cache: new InMemoryCache()
  });
  return (
    <ApolloProvider client={client}>
      <DataContextProvider>
        <MainScreen/>
      </DataContextProvider>
      
    </ApolloProvider>
  );
}

export default App;
