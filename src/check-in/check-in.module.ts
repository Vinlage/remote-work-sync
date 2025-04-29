import { Module } from '@nestjs/common';
import { CheckInService } from './check-in.service';
import { CheckInResolver } from './check-in.resolver';
import { FeatureFlagService } from 'src/feature-flags/feature-flag.service';
import { RedisService } from 'src/redis/redis.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CheckIn } from './check-in.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CheckIn])],
  providers: [
    CheckInService,
    CheckInResolver,
    FeatureFlagService,
    RedisService,
  ],
})
export class CheckInModule {}
