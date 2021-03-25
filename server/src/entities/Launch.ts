import { ObjectType, Field, ID } from 'type-graphql';
import { Entity, Column, BaseEntity, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Launch extends BaseEntity {
  @Field((_type) => ID)
  @PrimaryColumn({ unique: true })
  id: number;

  @Field()
  @Column()
  remainingSeats: number;
}
