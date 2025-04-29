import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class CreateCheckInInput {
  @Field(() => Int)
  id: number;

  @Field()
  userId: string;

  @Field()
  message: string;

  @Field()
  createdAt: Date;
}
