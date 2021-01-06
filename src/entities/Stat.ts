import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Game } from "./Game";
import { Player } from "./Player";

@ObjectType()
@Entity()
export class Stat extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
  
  @Field(() => Int)
  @Column()
  goals: number

  @Field(() => Int)
  @Column()
  yellows: number

  @Field(() => Int)
  @Column()
  gameId: number

  @Field(() => Game)
  @ManyToOne(() => Game, game => game.stats)
  @JoinColumn()
  game: Game

  @Field(() => Int)
  @Column()
  playerId: number

  @Field(() => Player)
  @ManyToOne(() => Player, player => player.stats)
  @JoinColumn()
  player: Player
}
