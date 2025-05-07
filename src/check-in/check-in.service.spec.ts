import { Test, TestingModule } from '@nestjs/testing';
import { CheckInService } from './check-in.service';
import { FeatureFlagService } from 'src/feature-flags/feature-flag.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CheckIn } from './check-in.entity';
import { RedisService } from 'src/redis/redis.service';
import { CheckInResolver } from './check-in.resolver';
import { Repository } from 'typeorm';

describe('CheckInService', () => {
  let service: CheckInService;
  let featureFlagService: FeatureFlagService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [
        CheckInResolver,
        CheckInService,
        FeatureFlagService,
        {
          provide: RedisService,
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
            del: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(CheckIn),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn().mockResolvedValue({
              id: 1,
              userId: 'user1',
              message: 'Test check-in',
              createdAt: new Date(),
            }),
          },
        },
      ],
    }).compile();

    service = module.get<CheckInService>(CheckInService);
    featureFlagService = module.get<FeatureFlagService>(FeatureFlagService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a check-in', async () => {
    const checkIn = await service.createCheckIn('user1', 'Test check-in');
    expect(checkIn).toHaveProperty('id');
    expect(checkIn).toHaveProperty('userId', 'user1');
    expect(checkIn).toHaveProperty('message', 'Test check-in');
  });

  it('should check feature flag before allowing check-in', async () => {
    jest.spyOn(featureFlagService, 'isEnabled').mockResolvedValue(true);
    const checkIn = await service.createCheckIn(
      'user2',
      'Test check-in with feature flag',
    );
    expect(checkIn).toHaveProperty('id');
  });

  it('should throw error if user has already checked in', async () => {
    jest.spyOn(featureFlagService, 'isEnabled').mockResolvedValue(true);
    const checkInRepository: Repository<CheckIn> = module.get(
      getRepositoryToken(CheckIn),
    );
    jest.spyOn(checkInRepository, 'findOne').mockResolvedValueOnce({
      id: 1,
      userId: 'user1',
      message: 'Test check-in',
      createdAt: new Date(),
    });

    await expect(
      service.createCheckIn('user1', 'Test check-in'),
    ).rejects.toThrow('User has already checked in.');
  });

  it('should get all check-ins', async () => {
    const checkInRepository: Repository<CheckIn> = module.get(
      getRepositoryToken(CheckIn),
    );
    jest.spyOn(checkInRepository, 'find').mockResolvedValueOnce([
      {
        id: 1,
        userId: 'user1',
        message: 'Test check-in',
        createdAt: new Date(),
      },
    ]);

    const checkIns = await service.getAllCheckIns();
    expect(checkIns).toHaveLength(1);
    expect(checkIns[0]).toHaveProperty('id', 1);
    expect(checkIns[0]).toHaveProperty('userId', 'user1');
  });

  it('should return empty array if no check-ins found', async () => {
    const checkInRepository: Repository<CheckIn> = module.get(
      getRepositoryToken(CheckIn),
    );
    jest.spyOn(checkInRepository, 'find').mockResolvedValueOnce([]);

    const checkIns = await service.getAllCheckIns();
    expect(checkIns).toHaveLength(0);
  });
});
