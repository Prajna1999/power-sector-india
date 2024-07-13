import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { CronController } from './cron.controller';
import { GoogleSearchService } from 'src/google-search/google-search.service';
import { MAILER_OPTIONS, MailerModule, MailerService } from '@nestjs-modules/mailer';
import { MailServiceService } from 'src/mail-service/mail-service.service';

@Module({  
  controllers: [CronController],
  providers: [CronService,GoogleSearchService,MailServiceService],
})
export class CronModule {}
