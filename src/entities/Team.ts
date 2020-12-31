import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany } from "typeorm";
import { ObjectType, Field } from "type-graphql";
import { Player } from "./Player";

@ObjectType()
@Entity()
export class Team extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  primaryColor: string;

  @Field()
  @Column()
  secondaryColor: string;

  @OneToMany(() => Player, player => player.team)
  players: Player[];
}