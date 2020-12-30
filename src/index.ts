import { createConnection } from "typeorm"

import { League } from "./entities/League";

const main = async () => {
  await createConnection({
    type: "postgres",
    database: "rec_league",
    username: "postgres",
    password: "",
    logging: true,
    synchronize: true,
    entities: [League]
  })
}

main().catch((err) => {
  console.log(err);
})