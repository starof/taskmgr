
import { User } from './user.model';
import { Err } from './error.model';

export interface Auth {
    user?: User;
    userId?: string;
    err?: string;
    token?: string;
}