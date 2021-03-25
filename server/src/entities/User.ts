import { ObjectType, Field, ID } from 'type-graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'users', synchronize: false })
export class User {
  @PrimaryColumn()
  @Field((_type) => ID)
  id: number;

  @Column('int', { array: true })
  @Field((_type) => [ID])
  booked_launches: number[];
}
