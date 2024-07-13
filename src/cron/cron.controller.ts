import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CronService } from './cron.service';
import { CreateCronDto } from './dto/create-cron.dto';
import { UpdateCronDto } from './dto/update-cron.dto';

@Controller('cron')
export class CronController {
  constructor(private readonly cronService: CronService) {}

}
