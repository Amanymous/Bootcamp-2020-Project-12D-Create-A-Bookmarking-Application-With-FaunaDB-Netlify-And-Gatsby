const { ApolloServer, gql } = require('apollo-server-lambda')
const faunadb = require('faunadb'),
  q = faunadb.query;

const typeDefs = gql`
  type Query {
    bookmarks: [bookmark]
  }
  type Bookmark {
    id: ID!
    title: String!
    url: String!
  }
  type Mutations {
    addBookmark(title:String!,url:String!):Bookmark
  }
`
const resolvers = {
  Query: {
    bookmarks: async (root, args, context) => {
      try {
        var admin = new faunadb.Client({ secret: 'fnAD-ThdDSACDVwG36mpIUGkSCMI281cM90drbwf' });
        const result = await admin.query(
          q.Map(
            q.Paginate(q.Match(q.Index('url'))),
            q.Lambda(x => q.Get(x))
          )
        )
        console.log(result.data)

        return result.data.map(d => {
          return [{
            id: "1",
            title: "aman",
            url: "abc.com"
          }]
        })

      } catch (err) {
        console.log(err);
      }
    }
  },
  Mutation: {
    addBookmark: async (_, { title, url }) => {
      console.log(title, url)
      try {
        const admin = new faunadb.Client({ secret: 'fnAD-ThdDSACDVwG36mpIUGkSCMI281cM90drbwf' });
        const result = await admin.query(
          q.Create(
            q.Collection('bookmarks'),
            {
              data: {
                title,
                url
              }
            },
          )
        )
        return result.data.data
      }
      catch (err) {
        console.log(err)
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})
exports.handler = server.createHandler()
