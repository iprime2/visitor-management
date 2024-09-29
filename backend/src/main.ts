import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './utils/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  // Enable CORS with specific options
  app.enableCors({
    origin: 'http://localhost:3000', // Allow requests from this origin
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

   // Get the port from the .env file, or fallback to 3000 if it's not defined
   const port = process.env.PORT || 3022;

   // Start listening on the specified port
   await app.listen(port);
 
   // Log that the server has started
   console.log(`Server started and running on http://localhost:${port}`);
}
bootstrap();
