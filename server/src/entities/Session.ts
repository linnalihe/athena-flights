import { Field, ObjectType } from 'type-graphql';
import { Entity, PrimaryColumn, Column } from 'typeorm';

@ObjectType()
@Entity({ name: 'sessions', synchronize: false })
export class Session {
  @PrimaryColumn()
  @Field()
  id: number;

  @Column()
  @Field()
  user_id: number;

  @Column()
  @Field()
  access_token: string;
}
