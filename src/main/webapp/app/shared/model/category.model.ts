import { IArticle } from 'app/shared/model/article.model';

export interface ICategory {
  id?: number;
  categoryName?: string;
  articles?: IArticle[];
}

export class Category implements ICategory {
  constructor(public id?: number, public categoryName?: string, public articles?: IArticle[]) {}
}
