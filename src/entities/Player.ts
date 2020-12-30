import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @Column()
  captain: boolean;

  
}