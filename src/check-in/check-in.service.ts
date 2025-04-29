import { Injectable } from '@nestjs/common';
import { CheckIn } from './check-in.entity';
import { FeatureFlagService } from 'src/feature-flags/feature-flag.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CheckInService {
  private checkIns: CheckIn[] = [];
  private idCounter = 1;

  constructor(
    private readonly featureFlagService: FeatureFlagService,
    @InjectRepository(CheckIn)
    private readonly checkInRepository: Repository<CheckIn>,
  ) {}

  async createCheckIn(userId: string, message: string): Promise<CheckIn> {
    const isFlagEnabled =
      await this.featureFlagService.isEnabled('only-one-checkin');

    if (isFlagEnabled) {
      const alreadyCheckedIn = await this.checkInRepository.findOne({
        where: { userId },
      });
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
    return this.checkInRepository.save(checkIn);
  }

  async getAllCheckIns(): Promise<CheckIn[]> {
    return this.checkInRepository.find();
  }
}
