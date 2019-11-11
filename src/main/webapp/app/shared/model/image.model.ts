import { IArticle } from 'app/shared/model/article.model';

export interface IImage {
  id?: number;
  url?: string;
  article?: IArticle;
}

export class Image implements IImage {
  constructor(public id?: number, public url?: string, public article?: IArticle) {}
}
