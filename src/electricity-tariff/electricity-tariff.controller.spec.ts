import { Test, TestingModule } from '@nestjs/testing';
import { ElectricityTariffController } from './electricity-tariff.controller';
import { ElectricityTariffService } from './electricity-tariff.service';

describe('ElectricityTariffController', () => {
  let controller: ElectricityTariffController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ElectricityTariffController],
      providers: [ElectricityTariffService],
    }).compile();

    controller = module.get<ElectricityTariffController>(ElectricityTariffController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
