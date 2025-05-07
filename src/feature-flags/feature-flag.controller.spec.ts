/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { FeatureFlagController } from './feature-flag.controller';
import { FeatureFlagService } from './feature-flag.service';
import { NotFoundException } from '@nestjs/common';

describe('FeatureFlagController', () => {
  let controller: FeatureFlagController;
  let service: FeatureFlagService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeatureFlagController],
      providers: [
        {
          provide: FeatureFlagService,
          useValue: {
            isEnabled: jest.fn(),
            setFeatureFlag: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<FeatureFlagController>(FeatureFlagController);
    service = module.get<FeatureFlagService>(FeatureFlagService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getFeatureFlag', () => {
    it('should return the feature flag status', async () => {
      const key = 'test-feature';
      const expectedResult = { key, enabled: true };

      jest.spyOn(service, 'isEnabled').mockResolvedValue(true);

      const result = await controller.getFeatureFlag(key);

      expect(result).toEqual(expectedResult);
      expect(service.isEnabled).toHaveBeenCalledWith(key);
    });

    it('should throw an error if the feature flag is not found', async () => {
      const key = 'non-existent-feature';

      jest
        .spyOn(service, 'isEnabled')
        .mockRejectedValue(new NotFoundException());

      await expect(controller.getFeatureFlag(key)).rejects.toThrowError(
        NotFoundException,
      );
      expect(service.isEnabled).toHaveBeenCalledWith(key);
    });
  });

  describe('setFeatureFlag', () => {
    it('should set the feature flag and return the correct response', async () => {
      const key = 'test-feature';
      const enabled = false;
      const expectedResult = { key, enabled };

      jest.spyOn(service, 'setFeatureFlag').mockResolvedValue(undefined);

      const result = await controller.setFeatureFlag(key, enabled);

      expect(result).toEqual(expectedResult);
      expect(service.setFeatureFlag).toHaveBeenCalledWith(key, enabled);
    });
  });
});
