export const enum Sorting {
  PRISE_ASC = 'PRISE_ASC',
  PRISE_DESK = 'PRISE_DESK',
  ADDTIME_ASK = 'ADDTIME_ASK',
  ADDTIME_DESK = 'ADDTIME_DESK',
}

export interface IArticlesFilter {
  text?: string;
  category?: string;
  postalCode?: string;
  city?: string;
  page: number;
  items: number;
  sort: Sorting;
}

export class ArticlesFilter implements IArticlesFilter{
  constructor(
    public page = 1,
    public items = 20,
    public sort = Sorting.ADDTIME_DESK,
    public text?: string,
    public category?: string,
    public postalCode?: string,
    public city?: string
  ){}
}
