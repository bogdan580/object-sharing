import { IUser } from 'app/core/user/user.model';

export interface IUserInfo {
  id?: number;
  tel?: number;
  fullName?: string;
  avatar?: string;
  providedObjects?: number;
  rentedObjects?: number;
  user?: IUser;
}

export class UserInfo implements IUserInfo {
  constructor(
    public id?: number,
    public tel?: number,
    public fullName?: string,
    public avatar?: string,
    public providedObjects?: number,
    public rentedObjects?: number,
    public user?: IUser
  ) {}
}
