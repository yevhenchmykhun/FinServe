import { UserRole } from "./user-role.enum";

export interface AuthToken {
    name?: string;
    roles?: UserRole[];
    expiresAt?: number;
  }
