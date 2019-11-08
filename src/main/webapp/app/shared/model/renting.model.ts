import { IUser } from 'app/core/user/user.model';
import { IArticle } from 'app/shared/model/article.model';
import { RentPeriod } from 'app/shared/model/enumerations/rent-period.model';
import { Currency } from 'app/shared/model/enumerations/currency.model';

export interface IRenting {
  id?: number;
  startTime?: number;
  endTime?: number;
  price?: number;
  rentPeriod?: RentPeriod;
  currency?: Currency;
  user?: IUser;
  article?: IArticle;
}

export class Renting implements IRenting {
  constructor(
    public id?: number,
    public startTime?: number,
    public endTime?: number,
    public price?: number,
    public rentPeriod?: RentPeriod,
    public currency?: Currency,
    public user?: IUser,
    public article?: IArticle
  ) {}
}
