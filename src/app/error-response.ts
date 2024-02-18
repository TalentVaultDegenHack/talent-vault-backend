import { AuthErrorArray } from '../auth/errors/error';

type ErrorArray = AuthErrorArray;

export interface ErrorResponse {
  id: ErrorArray;
  message?: string;
  data?: any;
}
