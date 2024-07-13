import { MailServiceService } from 'src/mail-service/mail-service.service';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';
import * as fs from 'fs/promises';
import axios from 'axios';
import { text } from 'stream/consumers';

interface SearchItem{
    link:string;
    title:string;
    snippet:string;
}
@Injectable()
export class GoogleSearchService {
    private readonly storageFile:string;
    private readonly logger=new Logger(GoogleSearchService.name);
    constructor(
        private readonly configService:ConfigService,
        private readonly mailServiceService:MailServiceService
        
    ){
        this.storageFile=path.join(process.cwd(), 'search-results.json');
        this.ensureStorageFileExists();
    }

     async ensureStorageFileExists(){
        try{
            await fs.access(this.storageFile);
        }catch(error){
            // file does not exist, create it with an empty array
            await fs.writeFile(this.storageFile, '[]');
            this.logger.log(`Created storage file: ${this.storageFile}`);
            
        }
    }

     async filterNewItems(items:any): Promise<any> {
        let storedItems:any 
        try {
          const data = await fs.readFile(this.storageFile, 'utf8');
          storedItems = JSON.parse(data);
        } catch (error) {
          this.logger.error('Error reading stored items', error);
          // If there's an error reading the file, assume all items are new
          return items;
        }
    
        return items.filter(item => 
          !storedItems.some(storedItem => 
            storedItem.link === item.link && 
            storedItem.title === item.title && 
            storedItem.snippet === item.snippet
          )
        );
      }
    
     async updateStoredResults(items:any) {
        try {
          await fs.writeFile(this.storageFile, JSON.stringify(items, null, 2));
        } catch (error) {
          this.logger.error('Error updating stored results', error);
        }
      }
    // make the google search
     async googleSearch():Promise<{items:any}>{
        const apiKey=this.configService.get<string>('GOOGLE_SEARCH_API_KEY');
        const cseId=this.configService.get<string>('GOOGE_CSE_KEY');
        const searchUrl=this.configService.get<string>('GOOGLE_SEARCH_URL')
        // const query='site:tangedco.org tariff 2023';
        const query='anurag minus verma';
       
        const params={
            q:query,
            key:apiKey,
            cx:cseId,
            dateRestrict:'d1'
        }

        const response=await axios.get(searchUrl, {params:params});
        console.log(response.data);
        return response.data;

    }
    // send email notifications
    async sendNotificationEmail(items:any){
        const recipient=this.configService.get<string>('NOTIFICATION_EMAIL');
        let emailBody='New tariff-related documents detected on TANGEDCO website:\n\n';
        items.forEach((item)=>{
            emailBody += `Title: ${item.title}\n`;
            emailBody += `Link: ${item.link}\n`;
            emailBody += `Snippet: ${item.snippet}\n\n`;
        });

        await this.mailServiceService.sendUpdateMail(
          recipient,
          'TANGEDCO Tariff Details',
          emailBody

        );
    }

}
