import { Resolver, Query, Mutation, Arg, ObjectType, Field } from "type-graphql";
import { getConnection } from "typeorm";
import { League } from "../entities/League";
import { FieldError } from "./FieldError";

@ObjectType()
class LeagueResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[]

  @Field(() => League, { nullable: true })
  league?: League
}

@Resolver()
export class LeagueResolver {
  @Query(() => [League])
  async leagues(): Promise<League[]> {
    return League.find({ relations: ["teams"] });
  }

  @Query(() => League, { nullable: true })
  async league(
    @Arg("name") name: string
  ): Promise<League | undefined> {
    return League.findOne({ name }, { relations: ["teams"] });
  }

  @Mutation(() => LeagueResponse)
  async createLeague(
    @Arg("name") name: string
  ): Promise<LeagueResponse> {
    let league;

    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(League)
        .values({ name })
        .returning("*")
        .execute()

      league = result.raw[0]
    } catch (err) {
      if (err.code === "23505") {
        return {
          errors: [
            {
              field: "name",
              message: "That league name is taken"
            }
          ]
        }
      }
    }

    return {
      league
    }
  }
}