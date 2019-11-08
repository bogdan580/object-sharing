import { IReservation } from 'app/shared/model/reservation.model';
import { IRenting } from 'app/shared/model/renting.model';
import { IUser } from 'app/core/user/user.model';
import { ICategory } from 'app/shared/model/category.model';
import { ObjectStatus } from 'app/shared/model/enumerations/object-status.model';
import { RentPeriod } from 'app/shared/model/enumerations/rent-period.model';
import { Currency } from 'app/shared/model/enumerations/currency.model';

export interface IArticle {
  id?: number;
  name?: string;
  desc?: string;
  status?: ObjectStatus;
  addTime?: number;
  price?: number;
  rentPeriod?: RentPeriod;
  currency?: Currency;
  reservations?: IReservation[];
  rentings?: IRenting[];
  user?: IUser;
  category?: ICategory;
}

export class Article implements IArticle {
  constructor(
    public id?: number,
    public name?: string,
    public desc?: string,
    public status?: ObjectStatus,
    public addTime?: number,
    public price?: number,
    public rentPeriod?: RentPeriod,
    public currency?: Currency,
    public reservations?: IReservation[],
    public rentings?: IRenting[],
    public user?: IUser,
    public category?: ICategory
  ) {}
}
