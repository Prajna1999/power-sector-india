import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class MailServiceService {
    private mailerService:MailerService;
    constructor(
        
    ){}
  

        // send email notifications
        async  sendUpdateMail(to:string, subject:string, text:string){
            
            console.log(this.mailerService);
    
             await this.mailerService.sendMail({
                to:to,
                subject:subject,
                text:text
            });
        }
}
