import express from "express";
const router = express.Router()
import {buildSchema } from "graphql";
import { graphqlHTTP } from "express-graphql";

const root = {
    user_actions: {
        getUser: async ({id}: {id: number}, context: any) => {return {id: 1}}
    }
};
const schema = buildSchema(`
  type Query {
    post_actions: Post_actions
    user_actions: User_actions
  }
  type Post_actions {
    getPost(id: ID!): Post
    getPosts: [Post] 
  }
  type Post implements Response {
    id: ID!
    title: String
    banner: String
    context: String
    des: String
    author: String
    is_draft: Boolean
    publish_time: Float
    tags: [Tag]
  }
  type User_actions {
    getUser(id: ID!): User
    getUsers: [User]
  }
  type Tag {
    name: String
  }
  type User implements Response{
    id: ID!
    name: String!
    password: String!
  }
  type Response {
    msg: String
    code: Int
  }
`);
router.use('/', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
}))
export default router;