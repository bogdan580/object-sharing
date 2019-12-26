import { Injectable } from '@angular/core';
import { ArticlesFilter, IOshArticleDTO } from 'app/shared/model/osh/articles.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { SERVER_API_URL } from 'app/app.constants';
import { Reservation } from 'app/shared/model/reservation.model';

@Injectable({ providedIn: 'root' })
export class SearchListService {
  public resourceUrl = SERVER_API_URL + 'api/proxy';

  constructor(protected http: HttpClient) {}

  searchArticles(filter: ArticlesFilter): Observable<any> {
    return this.http.post(`${this.resourceUrl}/articles/search`, filter,{ observe: 'response' });
  }

  getArticleInfo(id: number): Observable<any>  {
    return this.http.get(`${this.resourceUrl}/articles/${id}/info`,{ observe: 'response' });
  }

  saveReservation(reserve: Reservation): Observable<HttpResponse<Reservation>> {
    return this.http.post(`${this.resourceUrl}/reserves`, reserve, { observe: 'response' });
  }
}
