import { IUser } from 'app/core/user/user.model';
import { IArticle } from 'app/shared/model/article.model';

export interface IReservation {
  id?: number;
  startTime?: string;
  endTime?: string;
  user?: IUser;
  article?: IArticle;
}

export class Reservation implements IReservation {
  constructor(public id?: number, public startTime?: string, public endTime?: string, public user?: IUser, public article?: IArticle) {}
}
