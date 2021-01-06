import { Arg, Field, InputType, Int, Mutation, ObjectType, Query } from "type-graphql";

import { Game } from "../entities/Game";
import { FieldError } from "./FieldError";
import { validateGame } from "../utils/validateGame";
import { getConnection } from "typeorm";

@InputType()
export class GameInput {
  @Field()
  date: string
  @Field(() => Int)
  teamOne: number
  @Field(() => Int)
  teamTwo: number
}

@ObjectType()
class GameResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[]

  @Field(() => Game, { nullable: true })
  game?: Game
}

@ObjectType()
export class GameResolver {
  @Query(() => [Game])
  async games(): Promise<Game[]> {
    return Game.find({ relations: ["teams"] })
  }

  @Mutation(() => GameResponse)
  async createGame(
    @Arg("gameInput") gameInput: GameInput,
  ): Promise<GameResponse> {
    const errors = validateGame(gameInput);
    if (errors) {
      return { errors }
    }

    let game;
    let newdate = new Date('October 15, 2021 12:30');
    let isodate = newdate.toISOString();
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Game)
        .values({
          date: isodate
        })
        .returning("*")
        .execute()
      game = result.raw[0]
    } catch (err) {
      console.log(err);
    }

    return { game };
  }
}