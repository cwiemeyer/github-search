import './scss/App.scss';
import Header from "./components/Header";
import Issues from "./components/Issues";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    HttpLink
} from "@apollo/client";

// Setup of Apollo client to work with GraphQL Github API V4 (including the local caching strategy of Apollo)
const cache = new InMemoryCache();
const GITHUB_API_BASE_URL = 'https://api.github.com/graphql';

const httpLink = new HttpLink({
    uri: GITHUB_API_BASE_URL,
    headers: {
        authorization: `Bearer ${
            process.env.REACT_APP_GITHUB_API_TOKEN
        }`,
    },
});

const client = new ApolloClient({
    link: httpLink,
    cache,
});

function App() {
  return (
      <ApolloProvider client={client}>
        <div className="App">
          <Header />
            <Issues />
        </div>
      </ApolloProvider>
  );
}

export default App;
