import { Test, TestingModule } from '@nestjs/testing';
import { CheckInResolver } from './check-in.resolver';
import { CheckInService } from './check-in.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CheckIn } from './check-in.entity';
import { FeatureFlagService } from 'src/feature-flags/feature-flag.service';
import { RedisService } from 'src/redis/redis.service';

describe('CheckInResolver', () => {
  let resolver: CheckInResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CheckInResolver,
        CheckInService,
        FeatureFlagService,
        RedisService,
        {
          provide: getRepositoryToken(CheckIn),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<CheckInResolver>(CheckInResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
