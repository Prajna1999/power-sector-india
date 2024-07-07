import { Module } from '@nestjs/common';
import { ElectricityTariffService } from './electricity-tariff.service';
import { ElectricityTariffController } from './electricity-tariff.controller';
import { ElectricityTariffSchema } from './schemas/electricity-tariff.schema';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports:[MongooseModule.forFeature([{name:'ElectricityTariff', schema:ElectricityTariffSchema}])],
  controllers: [ElectricityTariffController],
  providers: [ElectricityTariffService],
})
export class ElectricityTariffModule {}
