import React from "react";
import {
    useQuery,
    gql
} from "@apollo/client";

// @TODO: adjust issues amount and states via input type checkbox or radio selection
function Issues() {
    // You can change the repository owner and name here to flexible browse and search another repository on Github!
    const repositoryOwner: string = "facebook";
    const repositoryName: string = "react"

    // The base query to fetch the issues from Github via Github V4 GraphQL API from a specific repository and owner.
    // 100 is the limit set by Github V4 GraphAPI for a single field
    const GITHUB_ISSUES = gql`
        query GetGithubIssues($repositoryOwner: String!, $repositoryName: String!) {
          repository(owner: $repositoryOwner, name: $repositoryName) {
            issues(last:100, states:OPEN) {
              edges {
                node {
                  number
                  title
                  url
                }
              }
            }
          }
        }
    `;

    // React makes use of useQuery query hook of Apollo here to pass optional variables as an argument
    const {loading, error, data} = useQuery(
        GITHUB_ISSUES,
        {
                variables: { repositoryOwner, repositoryName },
                pollInterval: 1800000 // Refresh query every 30 minutes and cache them with Apollo
                }
        );

    // @TODO: add css spinner for loading state and error icon
    if (loading) return <p>Loading data...</p>;
    if (error) return <p>An error occurred. Please reload the page and try again!</p>;

    // The processed query data to be returned from the component.
    let mapIssues = data.repository.issues.edges.map(
        ( obj: { node: { url: string, title: string, number: Number } } ) => (
            <li key={obj.node.url}>
                    <a href={obj.node.url}>
                            {obj.node.number}: {obj.node.title}
                    </a>
            </li>
        )
    );

    return (
        <ul>
            { mapIssues }
        </ul>
    );
}

export default Issues;
