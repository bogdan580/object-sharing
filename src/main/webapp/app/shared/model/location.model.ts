import { IUser } from 'app/core/user/user.model';
import { IArticle } from 'app/shared/model/article.model';

export interface ILocation {
  id?: number;
  streetAddress?: string;
  postalCode?: string;
  city?: string;
  stateProvince?: string;
  lat?: number;
  lon?: number;
  user?: IUser;
  articles?: IArticle[];
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
    public user?: IUser,
    public articles?: IArticle[]
  ) {}
}
