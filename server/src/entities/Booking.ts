import { ObjectType, Field } from 'type-graphql';
import { Entity, BaseEntity, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Booking extends BaseEntity {
  @Field()
  @PrimaryColumn()
  user_id: string;

  @Field()
  @PrimaryColumn()
  launch_id: string;
}
