import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

// const app = await NestFactory.createMicroservice<MicroserviceOptions>(
//   AppModule,
//   {
//     transport: Transport.KAFKA,
//     options: {
//       client: {
//         brokers: ['localhost:9092'],
//       },
//       consumer: {
//         groupId: 'transaction-consumer',
//       },
//     },
//   },
// );

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'transaction-consumer',
      },
    },
  });

  app.startAllMicroservices();
  app.listen(3000);
}
bootstrap();
