import { IUser } from 'app/core/user/user.model';

export interface IUserInfo {
  id?: number;
  tel?: number;
  providedObjects?: number;
  rentedObjects?: number;
  user?: IUser;
}

export class UserInfo implements IUserInfo {
  constructor(
    public id?: number,
    public tel?: number,
    public providedObjects?: number,
    public rentedObjects?: number,
    public user?: IUser
  ) {}
}
