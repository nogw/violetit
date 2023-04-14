export interface GenericError {
  name: string;
  message: string;
}

export class InternalError implements GenericError {
  name: 'InternalError';
  message: string;

  constructor(message: string) {
    this.name = 'InternalError';
    this.message = message;
  }
}
