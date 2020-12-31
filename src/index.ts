import "reflect-metadata";
import "dotenv-safe/config";
import { createConnection } from "typeorm"
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import express from "express";
import connectRedis from "connect-redis";
import Redis from "ioredis";
import session from "express-session";
import cors from "cors";

import { League } from "./entities/League";
import { Team } from "./entities/Team";
import { Player } from "./entities/Player";
import { HelloResolver } from "./resolvers/hello";
import { LeagueResolver } from "./resolvers/league";
import { TeamResolver } from "./resolvers/team";
import { PlayerResolver } from "./resolvers/player";
import { MyContext } from "./types";
import { COOKIE_NAME, __prod__ } from "./constants";

const main = async () => {

  await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,
    logging: true,
    synchronize: true,
    entities: [League, Team, Player]
  })

  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.REDIS_URL);

  app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }))

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({ client: redis, disableTTL: true, disableTouch: true }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        sameSite: 'lax',
        secure: __prod__,
      },
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
    })
  )

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, LeagueResolver, TeamResolver, PlayerResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext =>({ req, res, redis })
  })

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(process.env.PORT, () => console.log("server started on localhost:4000"))

}

main().catch((err) => {
  console.log(err);
})