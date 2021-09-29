import React from "react";
import {
    useQuery,
    gql
} from "@apollo/client";

// @TODO: adjust issues amount and states via input type checkbox or radio selection
function Issues() {
    const GITHUB_ISSUES = gql`
        query GetGithubIssues {
          repository(owner:"facebook", name:"react") {
            issues(last:20, states:CLOSED) {
              edges {
                node {
                  title
                  url
                  bodyText
                }
              }
            }
          }
        }
    `;

    const {loading, error, data} = useQuery(GITHUB_ISSUES);

    // @TODO: add css spinner for loading state and error icon
    if (loading) return <p>Daten werden geladen...</p>;
    if (error) return <p>Ein Fehler ist aufgetreten. Bitte laden Sie die Seite neu.</p>;

    let map = data.issues.map(({title, url, bodyText}) => (
        <div key={url}>
            <p>
                {title}: {bodyText}
            </p>
        </div>
    ));
    return map;
}