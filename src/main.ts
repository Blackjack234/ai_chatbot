import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())

  
  await app.listen(process.env.PORT ?? 3500,()=>{
    Logger.log(`Server is running on port http://localhost:${process.env.PORT ?? 3500}`)
  });
}
bootstrap();
