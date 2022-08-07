import { Role } from './role';

export class User {
  id: number;
  img: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  role: Role;
  token?: string;
  user_full_name?: string = null;
  user_name?: string = null;
  user_password?: string = null;
  user_email?: string = null;
  user_army_number?: string = null;
  user_rank?: string = null;
  user_role?: string = null;
  user_serving_unit?: string = null;
  user_status?: string = null;
}
