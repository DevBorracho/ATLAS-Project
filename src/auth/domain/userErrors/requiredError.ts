export class RequiredError extends Error {
  constructor(value: string | number) {
    super(`the value ${value} is required`);
  }
}
