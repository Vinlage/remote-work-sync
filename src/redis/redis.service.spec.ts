/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { RedisService } from './redis.service';
import Redis from 'ioredis';

describe('RedisService', () => {
  let service: RedisService;
  let redisClientMock: jest.Mocked<Redis>;

  beforeEach(async () => {
    redisClientMock = {
      get: jest.fn().mockResolvedValue(null),
      set: jest.fn().mockResolvedValue('OK'),
      del: jest.fn().mockResolvedValue(1),
      quit: jest.fn().mockResolvedValue('OK'),
    } as unknown as jest.Mocked<Redis>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RedisService,
        {
          provide: 'REDIS_CLIENT',
          useValue: redisClientMock,
        },
      ],
    }).compile();

    service = module.get<RedisService>(RedisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call redisClient.get with the correct key', async () => {
    redisClientMock.get.mockResolvedValue('value');
    const result = await service.get('key');
    expect(result).toBe('value');
    expect(redisClientMock.get).toHaveBeenCalledWith('key');
  });

  describe('set', () => {
    it('should call redis.set with TTL', async () => {
      await service.set('key', 'value', 10);
      expect(redisClientMock.set).toHaveBeenCalledWith(
        'key',
        'value',
        'EX',
        10,
      );
    });

    it('should call redis.set without TTL', async () => {
      await service.set('key', 'value');
      expect(redisClientMock.set).toHaveBeenCalledWith('key', 'value');
    });
  });

  describe('del', () => {
    it('should call redis.del', async () => {
      await service.del('key');
      expect(redisClientMock.del).toHaveBeenCalledWith('key');
    });
  });

  describe('onModuleDestroy', () => {
    it('should call redis.quit', () => {
      service.onModuleDestroy();
      expect(redisClientMock.quit).toHaveBeenCalled();
    });
  });
});
