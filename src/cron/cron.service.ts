import { Injectable, Logger } from '@nestjs/common';
import { GoogleSearchService } from 'src/google-search/google-search.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class CronService {
    private readonly logger=new Logger(CronService.name);
   
  constructor(
    private readonly googleSearchService:GoogleSearchService
  ){}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async checkForUpdates(){
    this.logger.log('Checking for TANGEDCO tariff updates');

    try{
        const results=await this.googleSearchService.googleSearch();
        const newItems=await this.googleSearchService.filterNewItems(results.items || []);

        if(newItems.length>0){
            await this.googleSearchService.sendNotificationEmail(newItems);
            await this.googleSearchService.updateStoredResults(results.items || []);
            this.logger.log(`Found ${newItems.length} new items. Email sent.`);
        }else{
            this.logger.log('No new items found');
        }
    }catch(error){
            this.logger.error('Error checking for updates', error);
    }
  }
}
