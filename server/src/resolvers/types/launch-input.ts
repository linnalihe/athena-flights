import { DEFAULT_PAGE_SIZE } from '../../constants';
import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class LaunchesInput {
  @Field(() => Int, {
    nullable: true,
    defaultValue: DEFAULT_PAGE_SIZE,
    description: 'Number of results to return. Must be >= 1.',
  })
  pageSize?: number;

  @Field(() => Int, {
    nullable: true,
    description: 'Results will be returned _after_ this cursor',
  })
  cursor?: number;
}
