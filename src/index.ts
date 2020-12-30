import "reflect-metadata";
import "dotenv-safe/config";
import { createConnection } from "typeorm"
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import express from "express";

import { League } from "./entities/League";
import { Team } from "./entities/Team";
import { HelloResolver } from "./resolvers/hello";

const main = async () => {

  await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    logging: true,
    synchronize: true,
    entities: [League, Team]
  })

  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver],
      validate: false,
    })
  })

  apolloServer.applyMiddleware({ app });

  app.listen(process.env.PORT, () => console.log("server started on localhost:4000"))

}

main().catch((err) => {
  console.log(err);
})