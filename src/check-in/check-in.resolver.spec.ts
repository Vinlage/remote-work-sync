import { Test, TestingModule } from '@nestjs/testing';
import { CheckInResolver } from './check-in.resolver';

describe('CheckInResolver', () => {
  let resolver: CheckInResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CheckInResolver],
    }).compile();

    resolver = module.get<CheckInResolver>(CheckInResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
