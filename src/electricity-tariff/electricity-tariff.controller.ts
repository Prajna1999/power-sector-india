import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ValidationPipe, UsePipes } from '@nestjs/common';
import { ElectricityTariffService } from './electricity-tariff.service';
import { CreateElectricityTariffDto } from './dto/create-electricity-tariff.dto';
import { UpdateElectricityTariffDto } from './dto/update-electricity-tariff.dto';
import { FilterElectricityDto } from './dto/filter-electricity-tariff.dto';
import { ElectricityTariff } from './schemas/electricity-tariff.schema';
@Controller('electricity-tariff')
export class ElectricityTariffController {
  constructor(private readonly electricityTariffService: ElectricityTariffService) {}

  @Post()
  createElectricityTariff(@Body() createElectricityTariffDto: CreateElectricityTariffDto) {
    return this.electricityTariffService.createElectricityTariff(createElectricityTariffDto);
  }

  @Get()
  @UsePipes(new ValidationPipe())
  async findByFilters(@Query() filters:FilterElectricityDto){
    return this.electricityTariffService.findByFilters(filters);
  }
  @Get("/:id")
  async getOneTariff(@Param('id') id:string){
    return this.electricityTariffService.findOneTariff(id);
  }
  @Patch("/:id")
  async updateElectricityTariff(@Param('id') id:string, @Body() updateDto:UpdateElectricityTariffDto){
    return this.electricityTariffService.updateElectricityTariff(id, updateDto);
  }



}
