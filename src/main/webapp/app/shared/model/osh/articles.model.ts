import { ObjectStatus } from 'app/shared/model/enumerations/object-status.model';
import { RentPeriod } from 'app/shared/model/enumerations/rent-period.model';
import { Currency } from 'app/shared/model/enumerations/currency.model';
import { Reservation } from 'app/shared/model/reservation.model';
import { Renting } from 'app/shared/model/renting.model';
import { Image } from 'app/shared/model/image.model';
import { UserInfo } from 'app/shared/model/user-info.model';

export const enum Sorting {
  PRISE_ASC = 'PRISE_ASC',
  PRISE_DESK = 'PRISE_DESK',
  ADDTIME_ASK = 'ADDTIME_ASK',
  ADDTIME_DESK = 'ADDTIME_DESK',
}

export interface IArticlesFilter {
  page: number;
  items: number;
  sort: Sorting;
  text: string;
  category: string;
  postalCode?: string;
  city?: string;
}

export class ArticlesFilter implements IArticlesFilter {
  constructor(
    public page = 0,
    public items = 20,
    public sort = Sorting.ADDTIME_DESK,
    public text = '',
    public category = 'Wybierz kategorie',
    public postalCode?: string,
    public city?: string
  ) {
  }
}

export interface IOshArticleDTO {
  id: number;
  name: string;
  desc?: string;
  status?: ObjectStatus;
  addTime?: number;
  price?: number;
  mainImage?: string;
  rentPeriod?: RentPeriod;
  currency?: Currency;
  userId?: number;
  categoryName?: string;
  streetAddress?: string;
  postalCode?: string;
  city?: string;
  stateProvince?: string;
  lat?: number;
  lon?: number;
}

export interface IOshArticleInfoDTO {
  userInfo?: UserInfo;
  reserves?: Reservation[];
  rents?: Renting[];
  images?: Image[];
}
