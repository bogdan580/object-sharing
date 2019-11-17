import { Injectable } from '@angular/core';
import { ArticlesFilter } from 'app/shared/model/osh/articles.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/index';
import { SERVER_API_URL } from 'app/app.constants';

@Injectable({ providedIn: 'root' })
export class SearchListService {
  public resourceUrl = SERVER_API_URL + 'api/proxy';

  constructor(protected http: HttpClient) {}

  searchArticles(filter: ArticlesFilter): Observable<any> {
    return this.http.post(`${this.resourceUrl}/search/articles`, filter,{ observe: 'response' });
  }
}
