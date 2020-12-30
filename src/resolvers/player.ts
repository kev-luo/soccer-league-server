import { Resolver, Query } from "type-graphql";
import { Player } from "../entities/Player";

@Resolver()
export class PlayerResolver {
  @Query(() => [Player])
  async players(): Promise<Player[]> {
    return Player.find();
  }
}