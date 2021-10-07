import './scss/App.scss';
import Header from './components/Header';
import Issues from './components/Issues';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    HttpLink
} from "@apollo/client";
import {Link, BrowserRouter} from "react-router-dom";
import SearchField from "./components/SearchField";

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
          <BrowserRouter>
              <ul>
                  <li>
                      <Link to="/">Home</Link>
                  </li>
                  <li>
                      <Link to="/issues" component={Issues}>Browse Issues</Link>
                  </li>
                  <li>
                      <Link to="/searchfield" component={SearchField}>Issue Search</Link>
                  </li>
              </ul>
          </BrowserRouter>
        </div>
      </ApolloProvider>
  );
}

export default App;
