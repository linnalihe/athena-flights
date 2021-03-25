import { ObjectType, Field } from 'type-graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'users', synchronize: false })
export class User {
  @PrimaryColumn()
  @Field()
  id: number;
}
