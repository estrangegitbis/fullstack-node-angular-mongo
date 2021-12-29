import { CustomError } from './custom-error';

export class NotAuthorizedError extends CustomError {
  statusCode = 401;

  constructor(public message: string, public field: string | null = null) {
    super(message);
    // Only because we are extending a built in class
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors() {
    if (this.field) {
      return [{ message: this.message, field: this.field }];
    } else {
      return [{ message: this.message }];
    }
  }
}
