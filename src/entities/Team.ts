import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";
import { Player } from "./Player";
import { League } from "./League";

@ObjectType()
@Entity()
export class Team extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field()
  @Column({ unique: true })
  name: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  primaryColor: string;

  @Field()
  @Column()
  secondaryColor: string;

  @Column()
  password: string;

  @Field(() => League)
  @ManyToOne(() => League, league => league.teams)
  league: League

  @Field(() => [Player])
  @OneToMany(() => Player, player => player.team)
  players: Player[];
}