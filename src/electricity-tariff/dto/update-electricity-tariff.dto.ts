import { PartialType } from '@nestjs/mapped-types';
import { CreateElectricityTariffDto } from './create-electricity-tariff.dto';

export class UpdateElectricityTariffDto extends PartialType(CreateElectricityTariffDto) {}
