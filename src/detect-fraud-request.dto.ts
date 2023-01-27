export class DetectFraudRequest {
  constructor(public readonly a: string, public readonly b: number) {}

  toString() {
    return JSON.stringify({
      a: this.a,
      b: this.b,
    });
  }
}
