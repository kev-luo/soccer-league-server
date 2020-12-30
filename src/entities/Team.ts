import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  primaryColor: string;

  @Column()
  secondaryColor: string;

}