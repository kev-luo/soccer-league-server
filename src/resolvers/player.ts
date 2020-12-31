import { Resolver, Query, Mutation, Arg, InputType, Field, Ctx } from "type-graphql";

import { Player } from "../entities/Player";
import { MyContext } from "src/types";

@InputType()
class PlayerInput {
  @Field()
  firstName: string
  @Field()
  lastName: string
  @Field()
  age: number
  @Field({ nullable: true })
  captain: boolean
}

@Resolver()
export class PlayerResolver {
  @Query(() => [Player])
  async players(): Promise<Player[]> {
    return Player.find();
  }

  @Mutation(() => Player)
  createPlayer(
    @Arg("playerInput") playerInput: PlayerInput,
    @Ctx() ctx: MyContext
  ): Promise<Player> {
    return Player.create({ ...playerInput, teamId: ctx.req.session.teamId }).save();
  }
}