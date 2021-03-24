import { ObjectType, Field, ID, Int } from 'type-graphql';

@ObjectType({
  description: `Simple wrapper around our list of launches that contains a cursor 
  to the last item in the list. Pass this cursor to the launches query to fetch results after these.`,
})
export class LaunchConnection {
  @Field((_type) => Int, { nullable: true })
  cursor: number | null;

  @Field()
  hasMore: boolean;

  // in SDL, the below is equivalent to: launches: [Launch]!
  @Field((_type) => [Launch], { nullable: 'items' })
  launches: Launch[];
}

@ObjectType()
export class Mission {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  missionPatchSmall?: string;

  @Field({ nullable: true })
  missionPatchLarge?: string;
}

@ObjectType()
export class Rocket {
  @Field((_type) => ID)
  id: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  type?: string;
}

@ObjectType()
export class Launch {
  @Field((_type) => ID)
  id: number;

  @Field({ nullable: true })
  site?: string;

  @Field({ nullable: true })
  mission?: Mission;

  @Field({ nullable: true })
  rocket?: Rocket;

  @Field((_type) => Int)
  cursor: number;

  @Field((_type) => Int, { nullable: true })
  remainingSeats?: number;

  @Field({ nullable: true })
  destination?: string;

  @Field({ nullable: true })
  departureDate?: Date;

  @Field({ nullable: true })
  returnDate?: Date;
}
