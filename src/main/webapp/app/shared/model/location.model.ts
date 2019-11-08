import { IUser } from 'app/core/user/user.model';

export interface ILocation {
  id?: number;
  streetAddress?: string;
  postalCode?: string;
  city?: string;
  stateProvince?: string;
  lat?: number;
  lon?: number;
  user?: IUser;
}

export class Location implements ILocation {
  constructor(
    public id?: number,
    public streetAddress?: string,
    public postalCode?: string,
    public city?: string,
    public stateProvince?: string,
    public lat?: number,
    public lon?: number,
    public user?: IUser
  ) {}
}
