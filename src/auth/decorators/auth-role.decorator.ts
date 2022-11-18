import { applyDecorators, UseGuards } from '@nestjs/common';
import { UserRole } from 'src/utils/enums';
import { RolesGuard } from '../guards/role.guard';
import { Roles } from './roles.decorator';

export function AuthRole(...roles: UserRole[]) {
  return applyDecorators(Roles(...roles), UseGuards(RolesGuard));
}
