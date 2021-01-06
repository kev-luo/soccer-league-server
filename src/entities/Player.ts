import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, CreateDateColumn, JoinColumn, OneToMany } from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";
import { Team } from "./Team";
import { Stat } from "./Stat";

@ObjectType()
@Entity()
export class Player extends BaseEntity {
  @Field(() => Int)
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

  @Field(() => Int)
  @Column()
  age: number;

  @Field({ nullable: true })
  @Column({ type: "bool", default: false, nullable: true })
  captain?: boolean;

  @Field(() => Int)
  @Column()
  teamId: number;

  @Field(() => Team)
  @ManyToOne(() => Team, team => team.players)
  @JoinColumn()
  team: Team

  @Field(() => [Stat])
  @OneToMany(() => Stat, stat => stat.player)
  stats: Stat[]
}