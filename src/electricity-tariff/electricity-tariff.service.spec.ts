import { Test, TestingModule } from '@nestjs/testing';
import { ElectricityTariffService } from './electricity-tariff.service';

describe('ElectricityTariffService', () => {
  let service: ElectricityTariffService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ElectricityTariffService],
    }).compile();

    service = module.get<ElectricityTariffService>(ElectricityTariffService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
