import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { MongoClient } from "mongodb";
import gqlSchema from "./graphql/gqlschema.js";

const main = async () => {
  const mongo_uri = process.env.DB_URI;
  const dbClient = new MongoClient(mongo_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await dbClient.connect();
  let db = dbClient.db(process.env.DB_NAME);

  const server = new ApolloServer({
    schema: gqlSchema,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    context: ({ req, res }) => ({ req, res, db }),
  });
  await server.start();
  const app = express();
  server.applyMiddleware({
    app,
  });
  app.listen(
    4000,
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};
main().catch((err) => console.log(err));
