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
  if (process.env.NODE_ENV === "production") {
    app.use(express.static("build"));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "build", "index.html"));
    });
  }
  server.applyMiddleware({
    app,
  });
  const PORT = process.env.PORT || 4000;
  app.listen(
    PORT,
    console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  );
};
main().catch((err) => console.log(err));
