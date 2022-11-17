import { UserRole } from 'src/utils/enums';

export interface IJwtPayload {
  id: string;
  email: string;
  name: string;
  roles: UserRole;
}
