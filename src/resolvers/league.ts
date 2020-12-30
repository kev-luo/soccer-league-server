import { Resolver, Query } from "type-graphql";
import { League } from "../entities/League";

@Resolver()
export class LeagueResolver {
  @Query(() => [League])
  async leagues(): Promise<League[]> {
    return League.find();
  }
}