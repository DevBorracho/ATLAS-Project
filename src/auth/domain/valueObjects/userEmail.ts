export class userEmail {
  value: string;
  constructor(value: string) {
    this.value = value;
    this.validate();
  }
  validate(): void {
    if (!this.value.includes("@")) {
      throw new Error("Email must contain @");
    }
  }
}
