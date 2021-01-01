import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
@Entity()
export class League extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;
}