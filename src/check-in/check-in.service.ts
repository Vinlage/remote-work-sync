import { Injectable } from '@nestjs/common';
import { CheckIn } from './check-in.entity';
import { FeatureFlagService } from 'src/feature-flags/feature-flag.service';

@Injectable()
export class CheckInService {
  private checkIns: CheckIn[] = [];
  private idCounter = 1;

  constructor(private readonly featureFlagService: FeatureFlagService) {}

  async createCheckIn(userId: string, message: string): Promise<CheckIn> {
    const isFlagEnabled =
      await this.featureFlagService.isEnabled('only-one-checkin');

    if (isFlagEnabled) {
      const alreadyCheckedIn = this.checkIns.some(
        (checkIn) => checkIn.userId === userId,
      );
      if (alreadyCheckedIn) {
        throw new Error('User has already checked in.');
      }
    }
    const checkIn: CheckIn = {
      id: this.idCounter++,
      userId,
      message,
      createdAt: new Date(),
    };
    this.checkIns.push(checkIn);
    return checkIn;
  }

  getAllCheckIns(): CheckIn[] {
    return this.checkIns;
  }
}
