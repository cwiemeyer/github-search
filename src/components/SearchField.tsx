import React, {ReactNode} from "react";
import {
    useQuery,
    gql
} from "@apollo/client";

// Satisfying TypeScript to use props and state as usual in react
// type this.state = {
//     searchResults: any[],
//     searchText: string,
//     gitHubIssueQuery: string,
//     repositoryOwner: string,
//     repositoryName: string,
//     searchClosedIssues: string,
// };

// @TODO: adjust issues amount and states via input type checkbox or radio selection
function SearchField() {
        this.state = {
            searchResults: [],
            searchText: '',
            gitHubIssueQuery: '',
            repositoryOwner: "facebook",
            repositoryName: "react",
            searchClosedIssues: false,
        };

    // You can change the repository owner and name here to flexible browse and search another repository on Github!
    // const repositoryOwner: string = "facebook";
    // const repositoryName: string = "react"

    // The base query to fetch the issues from Github via Github V4 GraphQL API from a specific repository and owner.
    const getGithubSearchIssues = () => (
        gql`
            query GithubIssueSearch($gitHubIssueQuery: String!) {
                  search(Repository owner: $repositoryOwner, name: $repositoryName in:title test", type: ISSUE, is: open, first: 100) {
                      nodes {
                          ... on Issue {
                                number
                                title
                                body
                          }
                      }
                  }
            }
    `);

    // React makes use of useQuery query hook of Apollo here to pass optional variables as an argument
    // const {loading, error, data} = useQuery(this.state.getGithubSearchIssues,  {variables: { state.gitHubIssueQuery, repositoryOwner, repositoryName }});

    // // @TODO: add css spinner for loading state and error icon
    // if (loading) return <p>Loading data...</p>;
    // if (error) return <p>An error occurred. Please reload the page and try again!</p>;

    // Execute search. React makes use of useQuery query hook of Apollo here to pass optional variables as an argument
    async function executeSearch() {
        this.setState({ gitHubIssueQuery: this.state.searchText })
        let gitHubIssueQuery: string,
            repositoryOwner: string,
            repositoryName : string;
        gitHubIssueQuery = this.state.gitHubIssueQuery;
        repositoryOwner = this.state.repositoryOwner;
        repositoryName = this.state.repositoryName;

        // React makes use of useQuery query hook of Apollo here to pass optional variables as an argument
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const {loading, error, data} = useQuery(
            getGithubSearchIssues(),
            {variables:
                        { gitHubIssueQuery, repositoryOwner, repositoryName },
                        pollInterval: 1800000 // Refresh query every 30 minutes and cache them with Apollo
            });

        // @TODO: add css spinner for loading state and error icon
        if (loading) return <p>Loading data...</p>;
        if (error) return <p>An error occurred. Please reload the page and try again!</p>;

        console.log('data: ', data);

        this.setState({ searchResults: data })

        // @TODO: return the search results later here
        // return data;
    }

    // @TODO: Add issue status as boolean to select (is open)
    return (
        <div>
            <div>
                Search
                <input
                    type='text'
                    onChange={(e) => this.setState({searchText: e.target.value})}
                />
                <button
                    onClick={() => executeSearch()}
                >
                    OK
                </button>
            </div>
        </div>
    );
}

export default SearchField;
