import { Resolver, Query } from "type-graphql";
import { Team } from "../entities/Team";

@Resolver()
export class TeamResolver {
  @Query(() => [Team])
  async teams(): Promise<Team[]> {
    return Team.find();
  }
}