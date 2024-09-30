import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  // Use NestExpressApplication instead of INestApplication
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Enable CORS with specific options
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3001', 'https://visitor-management-hazel.vercel.app'], // Allow requests from this origin
    credentials: true,               // Allow sending cookies (if needed)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
  });
    
  // Enable global validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Automatically strip non-whitelisted properties
    forbidNonWhitelisted: true, // Throw an error if non-whitelisted properties are present
    transform: true, // Automatically transform payloads to be instances of their DTO classes
  }));

  // Set the global prefix for all routes
  app.setGlobalPrefix('api');  

  app.useStaticAssets(join(__dirname, '..', 'uploads'));

   // Get the port from the .env file, or fallback to 3000 if it's not defined
   const port = process.env.PORT || 3022;

   // Start listening on the specified port
   await app.listen(port);
 
   // Log that the server has started
   console.log(`Server started and running on http://localhost:${port}`);
}
bootstrap();
