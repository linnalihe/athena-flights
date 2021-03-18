import { ObjectType, Field, ID } from 'type-graphql';
import { Entity, Column, BaseEntity, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Seat extends BaseEntity {
  @Field((_type) => ID)
  @PrimaryColumn()
  id: number;

  @Field()
  @Column()
  remainingSeats: number;
}
