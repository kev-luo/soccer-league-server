import { Resolver, Query, Mutation, ObjectType, Field, Arg, InputType, Ctx } from "type-graphql";
import argon2 from "argon2";
import { getConnection } from "typeorm";

import { MyContext } from "src/types";
import { Team } from "../entities/Team";
import { validateRegister } from "../utils/validateRegister";
import { COOKIE_NAME } from "../constants";

@InputType()
export class TeamInput {
  @Field()
  name: string;
  @Field()
  email: string;
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
    const errors = validateRegister(input);

    if (errors) {
      return { errors }
    }

    const hashedPassword = await argon2.hash(input.password);

    let team;

    try {
      const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Team)
        .values({
          name: input.name,
          email: input.email,
          primaryColor: input.primaryColor,
          secondaryColor: input.secondaryColor,
          password: hashedPassword
        })
        .returning("*")
        .execute();

      team = result.raw[0]
    } catch (err) {
      if (err.code === "23505") {
        return {
          errors: [
            {
              field: "name",
              message: "That team name is taken"
            }
          ]
        }
      }
    }

    ctx.req.session.teamId = team.id;

    return {
      team
    }
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("nameOrEmail") nameOrEmail: string,
    @Arg("password") password: string,
    @Ctx() ctx: MyContext
  ): Promise<UserResponse> {
    const team = await Team.findOne(
      nameOrEmail.includes("@") ?
        { where: { email: nameOrEmail } }
        : { where: { name: nameOrEmail } }
    )

    if(!team) {
      return {
        errors: [
          {
            field: "nameOrEmail", 
            message: "We couldn't find that team"
          }
        ]
      }
    }

    const validatePw = await argon2.verify(team.password, password);
    if(!validatePw) {
      return {
        errors: [
          {
            field: "password",
            message: "Password is incorrect"
          }
        ]
      }
    }
    
    ctx.req.session.teamId = team.id;

    return {
      team
    }
  }

  @Mutation(() => Boolean)
  logout(
    @Ctx() ctx: MyContext
  ) {
    return new Promise((res) => 
      ctx.req.session.destroy((err) => {
        ctx.res.clearCookie(COOKIE_NAME);
        if(err) {
          console.log(err);
          res(false);
          return
        }
        res(true);
      })
    )
  }
}