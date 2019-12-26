import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { SERVER_API_URL } from 'app/app.constants';
import { Observable } from 'rxjs';
import { Article, IArticle } from 'app/shared/model/article.model';
import { IReservation } from 'app/shared/model/reservation.model';
import { IRenting } from 'app/shared/model/renting.model';

type EntityArrayResponseType = HttpResponse<IArticle[]>;
@Injectable({ providedIn: 'root' })
export class ArticlesService {
  public resourceUrl = SERVER_API_URL + 'api/proxy';
  constructor(protected http: HttpClient) {}

  myArticles(): Observable<EntityArrayResponseType> {
    return this.http.get<IArticle[]>(`${this.resourceUrl}/articles/my`, { observe: 'response' });
  }

  changeArticleStatus(id: number, status: string): Observable<HttpResponse<Article>> {
    return this.http.put<Article>(`${this.resourceUrl}/articles/${id}/status/${status}`, null,{ observe: 'response' });
  }

  getActiveReservesByArticleOwner(): Observable<HttpResponse<IReservation[]>> {
    return this.http.get<IReservation[]>(`${this.resourceUrl}/reserves/myarticles`, { observe: 'response' });
  }

  getMyReservedArticles(): Observable<HttpResponse<IReservation[]>> {
    return this.http.get<IReservation[]>(`${this.resourceUrl}/articles/my/reserves`, { observe: 'response' });
  }

  getMyRentedArticles(): Observable<HttpResponse<IRenting[]>> {
    return this.http.get<IRenting[]>(`${this.resourceUrl}/articles/my/rented`, { observe: 'response' });
  }

  saveArticle(newArticle: IArticle): Observable<HttpResponse<IArticle>> {
    return this.http.post(`${this.resourceUrl}/articles/save`, newArticle,{ observe: 'response' });
  }
}
