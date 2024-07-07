import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ElectricityTariffService } from './electricity-tariff.service';
import { CreateElectricityTariffDto } from './dto/create-electricity-tariff.dto';
import { UpdateElectricityTariffDto } from './dto/update-electricity-tariff.dto';

@Controller('electricity-tariff')
export class ElectricityTariffController {
  constructor(private readonly electricityTariffService: ElectricityTariffService) {}

  @Post()
  createElectricityTariff(@Body() createElectricityTariffDto: CreateElectricityTariffDto) {
    return this.electricityTariffService.createElectricityTariff(createElectricityTariffDto);
  }

  @Patch("/:tariffId")
  updateElectricityTariff(@Param('tariffId') tariffId:string, @Body() updateDto:UpdateElectricityTariffDto){
    return this.electricityTariffService.updateElectricityTariff(tariffId, updateDto);
  }

  
}
