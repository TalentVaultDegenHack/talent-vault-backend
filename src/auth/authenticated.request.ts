import { Request } from 'express';
import { UserEntity } from '../user/infrastructure/entities/user.entity';

/**
 * Represents an authenticated request. Should be used in conjunction with AuthGuard.
 * @extends {Request}
 */
export interface AuthenticatedRequest extends Request {
  readonly user: UserEntity;
}
