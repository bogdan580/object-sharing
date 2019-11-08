import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IRenting } from 'app/shared/model/renting.model';

type EntityResponseType = HttpResponse<IRenting>;
type EntityArrayResponseType = HttpResponse<IRenting[]>;

@Injectable({ providedIn: 'root' })
export class RentingService {
  public resourceUrl = SERVER_API_URL + 'api/rentings';

  constructor(protected http: HttpClient) {}

  create(renting: IRenting): Observable<EntityResponseType> {
    return this.http.post<IRenting>(this.resourceUrl, renting, { observe: 'response' });
  }

  update(renting: IRenting): Observable<EntityResponseType> {
    return this.http.put<IRenting>(this.resourceUrl, renting, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRenting>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRenting[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
