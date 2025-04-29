import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { FeatureFlagService } from './feature-flag.service';

@Controller('feature-flags')
export class FeatureFlagController {
  constructor(private readonly featureFlagService: FeatureFlagService) {}

  @Get(':key')
  async getFeatureFlag(@Param('key') key: string) {
    const enabled = await this.featureFlagService.isEnabled(key);
    return { key, enabled };
  }

  @Post(':key')
  async setFeatureFlag(
    @Param('key') key: string,
    @Body('enabled') enabled: boolean,
  ) {
    await this.featureFlagService.setFeatureFlag(key, enabled);
    return { key, enabled };
  }
}
