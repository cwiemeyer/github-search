import React from 'react';
import ReactDOM from 'react-dom';
import './scss/index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
} from "@apollo/client";

// Setup of Apollo client to work with GraphQL of Github API V4
// @TODO: add GitHub token to access Github API V4 via GraphQL
const client = new ApolloClient({
    uri: 'https://api.github.com/graphql',
    cache: new InMemoryCache()
});

ReactDOM.render(
    <ApolloProvider client={client}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
