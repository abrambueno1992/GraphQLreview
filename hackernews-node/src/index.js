const { GraphQLServer} = require("graphql-yoga")



const links = [{
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL"
}]
let idCount = links.length
const resolvers = {
    Query: {
        info: () => "This is the API of a Hackernews Clone",
        feed: () => links,
        link: (parent, args) => {
            return links[id] = args.id;
        }
    },
    Mutation: {
        post: (parent, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url,
            }
            links.push(link)
            return link
        }
    },
    Link: {
        id: (parent) => parent.id,
        description: (parent) => parent.description,
        url: (parent) => parent.url,
    },
}


const server = new GraphQLServer({
    typeDefs: "./src/schema.graphql",
    resolvers
})
server.start(() => console.log("Server is running on http://localhost:4000"))