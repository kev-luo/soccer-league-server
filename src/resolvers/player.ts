import { Resolver, Query, Mutation, Arg, InputType, Field, Ctx, UseMiddleware, ObjectType } from "type-graphql";

import { Player } from "../entities/Player";
import { MyContext } from "../types";
import { isAuth } from "../middleware/isAuth";
import { FieldError } from "./FieldError";
import { validatePlayer } from "../utils/validatePlayer";
import { getConnection } from "typeorm";

@InputType()
export class PlayerInput {
  @Field()
  firstName: string
  @Field()
  lastName: string
  @Field()
  age: number
  @Field({ nullable: true })
  captain: boolean
}

@ObjectType()
class PlayerResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[]

  @Field(() => Player, { nullable: true })
  player?: Player
}

@Resolver()
export class PlayerResolver {
  @Query(() => [Player])
  async players(): Promise<Player[]> {
    return Player.find();
  }

  @Mutation(() => PlayerResponse)
  @UseMiddleware(isAuth)
  async createPlayer(
    @Arg("playerInput") playerInput: PlayerInput,
    @Ctx() ctx: MyContext
  ): Promise<PlayerResponse> {
    const errors = validatePlayer(playerInput);

    if (errors) {
      return { errors }
    }

    let player;
    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Player)
        .values({
          ...playerInput,
          teamId: ctx.req.session.teamId
        })
        .returning("*")
        .execute()
      player = result.raw[0]
    } catch (err) {
      console.log(err);
    }

    return {
      player
    }
  }
}