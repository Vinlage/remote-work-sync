import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class CheckIn {
  @Field(() => Int)
  id: number;

  @Field()
  userId: string;

  @Field()
  message: string;

  @Field()
  createdAt: Date;
}
