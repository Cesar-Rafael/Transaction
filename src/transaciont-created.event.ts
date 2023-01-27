export class TransactionCreatedEvent {
  constructor(
    public readonly a: string,
    public readonly b: string,
    public readonly c: number,
    public readonly value: number,
  ) {}
}
