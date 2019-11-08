import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAdvertisment } from 'app/shared/model/advertisment.model';

type EntityResponseType = HttpResponse<IAdvertisment>;
type EntityArrayResponseType = HttpResponse<IAdvertisment[]>;

@Injectable({ providedIn: 'root' })
export class AdvertismentService {
  public resourceUrl = SERVER_API_URL + 'api/advertisments';

  constructor(protected http: HttpClient) {}

  create(advertisment: IAdvertisment): Observable<EntityResponseType> {
    return this.http.post<IAdvertisment>(this.resourceUrl, advertisment, { observe: 'response' });
  }

  update(advertisment: IAdvertisment): Observable<EntityResponseType> {
    return this.http.put<IAdvertisment>(this.resourceUrl, advertisment, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAdvertisment>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAdvertisment[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
