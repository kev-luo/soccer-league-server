import { createConnection } from "typeorm"

import "reflect-metadata";
import "dotenv-safe/config";
import { League } from "./entities/League";

const main = async () => {
  await createConnection({
    type: "postgres",
    url: process.env.DATABASE_URL,    
    logging: true,
    synchronize: true,
    entities: [League]
  })
}

main().catch((err) => {
  console.log(err);
})