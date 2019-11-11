import { IImage } from 'app/shared/model/image.model';
import { IRenting } from 'app/shared/model/renting.model';
import { IReservation } from 'app/shared/model/reservation.model';
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
  mainImage?: string;
  rentPeriod?: RentPeriod;
  currency?: Currency;
  images?: IImage[];
  rentings?: IRenting[];
  reservations?: IReservation[];
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
    public mainImage?: string,
    public rentPeriod?: RentPeriod,
    public currency?: Currency,
    public images?: IImage[],
    public rentings?: IRenting[],
    public reservations?: IReservation[],
    public user?: IUser,
    public category?: ICategory
  ) {}
}
