import { Injectable } from '@nestjs/common';
import { CheckIn } from './check-in.entity';

@Injectable()
export class CheckInService {
  private checkIns: CheckIn[] = [];
  private idCounter = 1;

  createCheckIn(userId: string, message: string): CheckIn {
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
