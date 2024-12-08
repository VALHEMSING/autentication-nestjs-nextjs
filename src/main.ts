import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

   // Configuración de prefijo global
   app.setGlobalPrefix('api');

    // Configuración de Swagger
  const config = new DocumentBuilder()
  .setTitle('API')
  .setDescription('API RESTFUL')
  .setVersion('2.0')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
