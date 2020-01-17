import { UserInfo } from 'app/shared/model/user-info.model';
import { Location } from 'app/shared/model/location.model';

export interface ProfileData {
  userInfo: UserInfo;
  location: Location;
}
