import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe, Version, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type:VersioningType.URI,
    defaultVersion:['1']
  });
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const result = errors.map((error) => ({
          property: error.property,
          message: error.constraints[Object.keys(error.constraints)[0]],
        }));
        return new BadRequestException(result);
      },
      stopAtFirstError: true,
      whitelist:true,
      transform:true,
      transformOptions:{enableImplicitConversion:true}
      
    })
  );
  const config=app.get(ConfigService);
  const port=config.get<string>('PORT')
  await app.listen(port, () => `listening on port ${port} 🚀`);

}
bootstrap();
