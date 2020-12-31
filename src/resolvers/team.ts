import { Resolver, Query, Mutation, ObjectType, Field, Arg, InputType, Ctx } from "type-graphql";

import { MyContext } from "src/types";
import { Team } from "../entities/Team";

@InputType()
export class TeamInput {
  @Field()
  name: string;
  @Field()
  primaryColor: string;
  @Field()
  secondaryColor: string;
  @Field()
  password: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[]

  @Field(() => Team, { nullable: true })
  team?: Team
}

@Resolver()
export class TeamResolver {
  @Query(() => [Team])
  async teams(): Promise<Team[]> {
    return Team.find();
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("input") input: TeamInput,
    @Ctx() ctx: MyContext
  ): Promise<UserResponse> {
    
  }
}