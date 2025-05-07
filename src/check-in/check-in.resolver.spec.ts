/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { CheckInResolver } from './check-in.resolver';
import { CheckInService } from './check-in.service';

describe('CheckInResolver', () => {
  let resolver: CheckInResolver;
  let service: CheckInService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CheckInResolver,
        {
          provide: CheckInService,
          useValue: {
            getAllCheckIns: jest.fn().mockResolvedValue(['checkin1']),
            createCheckIn: jest.fn().mockResolvedValue({
              userId: 'user1',
              message: 'Hello',
            }),
          },
        },
      ],
    }).compile();

    resolver = module.get(CheckInResolver);
    service = module.get(CheckInService);
  });

  it('should return all check-ins', async () => {
    const result = await resolver.getAllCheckIns();
    expect(result).toEqual(['checkin1']);
    expect(service.getAllCheckIns).toHaveBeenCalled();
  });

  it('should create a check-in', async () => {
    const result = await resolver.createCheckIn('user1', 'Hello');
    expect(result).toEqual({ userId: 'user1', message: 'Hello' });
    expect(service.createCheckIn).toHaveBeenCalledWith('user1', 'Hello');
  });
});
