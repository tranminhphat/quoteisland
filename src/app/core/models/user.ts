import { Role } from './role';

export interface User {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  photoUrl?: string;
  roles?: Role[];
}
