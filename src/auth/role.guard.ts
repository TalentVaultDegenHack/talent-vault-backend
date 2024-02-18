import {
  CanActivate,
  ExecutionContext,
  Injectable,
  mixin,
} from '@nestjs/common';
import { UserRoleEnum } from '../user/infrastructure/models/user-role.enum';
import { AuthenticatedRequest } from './authenticated.request';

export const RoleGuard = (role: UserRoleEnum) => {
  @Injectable()
  class ModuleGuardMixin implements CanActivate {
    public async canActivate(context: ExecutionContext) {
      const req = context.switchToHttp().getRequest<AuthenticatedRequest>();
      if (!req.user) {
        throw new Error('RoleGuard: Bad authentication.');
      }

      return req.user.roles.some((i) => i === role);
    }
  }

  return mixin(ModuleGuardMixin);
};
