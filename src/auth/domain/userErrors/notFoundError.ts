export class NotFoundError extends Error {
  constructor() {
    super("User not found");
  }
}
