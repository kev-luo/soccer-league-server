import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, CreateDateColumn } from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { Team } from "./Team";

@ObjectType()
@Entity()
export class Player extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @CreateDateColumn()
  updatedAt: Date;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column()
  age: number;

  @Field({ nullable: true })
  @Column({ type: "bool", default: false, nullable: true })
  captain?: boolean;

  @Field()
  @Column()
  teamId: number;

  @Field(() => Team)
  @ManyToOne(() => Team, team => team.players)
  team: Team
}