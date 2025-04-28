import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CheckIn } from './check-in.entity';
import { CheckInService } from './check-in.service';

@Resolver(() => CheckIn)
export class CheckInResolver {
  constructor(private readonly checkInService: CheckInService) {}

  @Query(() => [CheckIn])
  getAllCheckIns() {
    return this.checkInService.getAllCheckIns();
  }

  @Mutation(() => CheckIn)
  createCheckIn(
    @Args('userId') userId: string,
    @Args('message') message: string,
  ) {
    return this.checkInService.createCheckIn(userId, message);
  }
}
