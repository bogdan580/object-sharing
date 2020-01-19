import { UserInfo } from 'app/shared/model/user-info.model';
import { Location } from 'app/shared/model/location.model';
import { Article } from 'app/shared/model/article.model';
import { RentPeriod } from 'app/shared/model/enumerations/rent-period.model';
import { Currency } from 'app/shared/model/enumerations/currency.model';

export interface ProfileData {
  userInfo: UserInfo;
  location: Location;
}

export interface HistoryData {
  type: string;
  startTime: number;
  endTime: number;
  article: Article;
  price: number;
  rentPeriod: RentPeriod;
  currency: Currency;
}
