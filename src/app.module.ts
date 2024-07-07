import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ElectricityTariffModule } from './electricity-tariff/electricity-tariff.module';
@Module({
  imports: [
   MongooseModule.forRootAsync({
    imports:[ConfigModule.forRoot({
      isGlobal:true
    })],
    inject:[ConfigService],
    useFactory:async(config:ConfigService)=>({
      uri:config.get<string>('MONGODB_URI'),
      retryAttempts:3,
      dbName:config.get<string>('MONGODB_DATABASE')
    })
   }),
   ElectricityTariffModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
