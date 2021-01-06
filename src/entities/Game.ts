import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Stat } from "./Stat";
import { Team } from "./Team";

@ObjectType()
@Entity()
export class Game extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => String)
  @Column()
  date: Date;

  @Field(() => [Team])
  @ManyToMany(() => Team, team => team.games)
  @JoinColumn()
  teams: Team[]

  @Field(() => [Stat])
  @OneToMany(() => Stat, stat => stat.game)
  stats: Stat[]
}