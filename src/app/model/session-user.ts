import { Role } from '../enum/role.enum';

export class SessionUser {
  permissions: string[] = [];
  role: Role;

  constructor(data?: any) {
    if (data) {
      this.role = data.role;
      this.permissions = data.permission;
    }
  }

  hasPermission(actions: string[]): boolean {
    return actions.every(name => this.permissions.indexOf(name) !== -1);
  }
}
