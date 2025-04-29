import { Module } from '@nestjs/common';
import { FeatureFlagService } from './feature-flag.service';
import { FeatureFlagController } from './feature-flag.controller';
import { RedisService } from 'src/redis/redis.service';

@Module({
  controllers: [FeatureFlagController],
  providers: [FeatureFlagService, RedisService],
  exports: [FeatureFlagService],
})
export class FeatureFlagModule {}
