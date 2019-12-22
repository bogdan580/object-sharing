import { IUser } from 'app/core/user/user.model';
import { IArticle } from 'app/shared/model/article.model';

export interface IReservation {
  id?: number;
  startTime?: number;
  endTime?: number;
  user?: IUser;
  article?: IArticle;
}

export class Reservation implements IReservation {
  constructor(public id?: number, public startTime?: number, public endTime?: number, public user?: IUser, public article?: IArticle) {}
}
