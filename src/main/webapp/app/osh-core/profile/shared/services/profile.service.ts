import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from 'app/app.constants';
import { Observable } from 'rxjs';
import { HistoryData, ProfileData } from 'app/shared/model/osh/profile.model';

@Injectable({ providedIn: 'root' })
export class OshProfileService {
  public resourceUrl = SERVER_API_URL + 'api/proxy';
  constructor(protected http: HttpClient) {}

  myProfileData(): Observable<ProfileData> {
    return this.http.get<ProfileData>(`${this.resourceUrl}/profile/data`);
  }

  createOrUpdateProfileData(profileData: ProfileData): Observable<ProfileData> {
    return this.http.post<ProfileData>(`${this.resourceUrl}/profile/data`, profileData);
  }

  getUserHistory(): Observable<HistoryData> {
    return  this.http.get<HistoryData>(`${this.resourceUrl}/profile/history`);
  }
}
