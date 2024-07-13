import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ElectricityTariffModule } from './electricity-tariff/electricity-tariff.module';
import { CronModule } from './cron/cron.module';
import { GoogleSearchService } from './google-search/google-search.service';
import { MailServiceService } from './mail-service/mail-service.service';
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

   ScheduleModule.forRoot(),
   ElectricityTariffModule,
   CronModule
],
  controllers: [AppController],
  providers: [AppService, GoogleSearchService, MailServiceService],
})
export class AppModule {}
