import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CheckInService } from './check-in.service';
import { CreateCheckInInput } from './dto/create-check-in.input';

@Resolver(() => CreateCheckInInput)
export class CheckInResolver {
  constructor(private readonly checkInService: CheckInService) {}

  @Query(() => [CreateCheckInInput])
  getAllCheckIns() {
    return this.checkInService.getAllCheckIns();
  }

  @Mutation(() => CreateCheckInInput)
  createCheckIn(
    @Args('userId') userId: string,
    @Args('message') message: string,
  ) {
    return this.checkInService.createCheckIn(userId, message);
  }
}
