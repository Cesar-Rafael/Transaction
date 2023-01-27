import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka, EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController implements OnModuleInit {
  constructor(
    private readonly appService: AppService,
    @Inject('ANTI-FRAUD_SERVICE') private readonly antiFraudClient: ClientKafka,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('transaction_created')
  handleTransactionCreated(data: any) {
    this.appService.handleTransactionCreated(data);
  }

  @EventPattern('anti-fraud_status')
  handleAntifraudStatus(data: any) {
    console.log(data);
  }

  onModuleInit() {
    this.antiFraudClient.subscribeToResponseOf('detect_fraud');
  }
}
