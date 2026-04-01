import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())

  const config = new DocumentBuilder()
  .setTitle("MemoryBot Api.")
  .setDescription("Context aware AI Chatbot API powered by Google Gemini.")
  .setVersion("1.0")
  .addTag("chat")
  .build()

  const document = SwaggerModule.createDocument(app,config)
  SwaggerModule.setup("api/docs",app,document)

  
  await app.listen(process.env.PORT ?? 3500,()=>{
    Logger.log(`Server is running on port http://localhost:${process.env.PORT ?? 3500}`)
  });
}
bootstrap();
