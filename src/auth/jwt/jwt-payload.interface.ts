import { UserRole } from 'src/utils/enums';

/* export interface IJwtPayload {
  id: string;
  email: string;
  name: string;
  roles: UserRole;
} */

export interface IJwtPayload {
  name:           string;
  picture:        string;
  iss:            string;
  aud:            string;
  auth_time:      number;
  user_id:        string;
  sub:            string;
  iat:            number;
  exp:            number;
  email:          string;
  email_verified: boolean;
  firebase:       Firebase;
}

export interface Firebase {
  identities:       Identities;
  sign_in_provider: string;
}

export interface Identities {
  "google.com": string[];
  email:        string[];
}
