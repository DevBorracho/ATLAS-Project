export class userPhone {
  value: string;
  constructor(value: string) {
    this.value = value;
    this.validate();
  }
  private validate(): void {
    if (this.value.includes("-")) {
      throw new Error("Phone number must not contain a dash");
    }
  }
}
