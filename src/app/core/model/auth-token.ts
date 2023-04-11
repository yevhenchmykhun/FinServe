import { UserRole } from "./user-role.enum";

export interface AuthToken {
  name: string;
  expiresAt: number;
  roles?: UserRole[];
}
