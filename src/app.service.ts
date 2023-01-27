import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { DetectFraudRequest } from './detect-fraud-request.dto';
import { TransactionCreatedEvent } from './transaciont-created.event';

@Injectable()
export class AppService {
  constructor(
    @Inject('ANTI-FRAUD_SERVICE') private readonly antiFraudClient: ClientKafka,
  ) {}

  getHello(): string {
    this.antiFraudClient.emit('detect_fraud_event', { test: 1 });
    return 'Hello World!';
  }

  handleTransactionCreated(transactionCreatedEvent: TransactionCreatedEvent) {
    const transactionExternalId = '123'; // Llamar a la función que guarde la transacción en la bd y recuperar el transactionExternalId
    this.antiFraudClient
      .send('detect_fraud', new DetectFraudRequest(transactionExternalId, 123))
      .subscribe((result) => {
        console.log(`El resultado de antifraude es: ${result}`);
        // Aquí llamar a la función de la bd que actualice la transacción con el nuevo estado
      });
  }
}
