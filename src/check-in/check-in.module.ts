import { Module } from '@nestjs/common';
import { CheckInService } from './check-in.service';
import { CheckInResolver } from './check-in.resolver';

@Module({
  providers: [CheckInService, CheckInResolver],
})
export class CheckInModule {}
