import { Injectable } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class FeatureFlagService {
  constructor(private readonly redis: RedisService) {}

  async isEnabled(flag: string): Promise<boolean> {
    const result = await this.redis.get(`feature:${flag}`);
    return result === 'true';
  }

  async setFeatureFlag(flag: string, enabled: boolean): Promise<void> {
    await this.redis.set(`feature:${flag}`, enabled.toString());
  }
}
