import React, { Component } from 'react'
import Link from './Link'
import { Query } from "react-apollo";
import gql from "graphql-tag";
const FEED_QUERY = gql`
    query FeedQuery($first: Int, $skip: Int, $orderBy: LinkOrderByInput) {
        feed(first: $first, skip: $skip, orderBy: $orderBy) {
            links {
                id
                createdAt
                url
                description
                postedBy {
                    id
                    name
                }
                votes {
                    id
                    user {
                        id
                    }
                }
            }
            count
        }
    }
`
class LinkList extends Component {
    render() {
        return (
            <Query query={FEED_QUERY}>
                {({ loading, error, data }) => {
                    if (loading) return <div>Fetching</div>
                    if (error) return <div>Error</div>

                    const linksToRender = data.feed.links

                    return (
                        <div>
                            {linksToRender.map(link => <Link key={link.id} link={link} />)}
                        </div>
                    )
                }}
            </Query>
        )
    }
}
export default LinkList