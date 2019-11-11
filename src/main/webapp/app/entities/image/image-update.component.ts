import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IImage, Image } from 'app/shared/model/image.model';
import { ImageService } from './image.service';
import { IArticle } from 'app/shared/model/article.model';
import { ArticleService } from 'app/entities/article/article.service';

@Component({
  selector: 'jhi-image-update',
  templateUrl: './image-update.component.html'
})
export class ImageUpdateComponent implements OnInit {
  isSaving: boolean;

  articles: IArticle[];

  editForm = this.fb.group({
    id: [],
    url: [null, [Validators.required]],
    article: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected imageService: ImageService,
    protected articleService: ArticleService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ image }) => {
      this.updateForm(image);
    });
    this.articleService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IArticle[]>) => mayBeOk.ok),
        map((response: HttpResponse<IArticle[]>) => response.body)
      )
      .subscribe((res: IArticle[]) => (this.articles = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(image: IImage) {
    this.editForm.patchValue({
      id: image.id,
      url: image.url,
      article: image.article
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const image = this.createFromForm();
    if (image.id !== undefined) {
      this.subscribeToSaveResponse(this.imageService.update(image));
    } else {
      this.subscribeToSaveResponse(this.imageService.create(image));
    }
  }

  private createFromForm(): IImage {
    return {
      ...new Image(),
      id: this.editForm.get(['id']).value,
      url: this.editForm.get(['url']).value,
      article: this.editForm.get(['article']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IImage>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackArticleById(index: number, item: IArticle) {
    return item.id;
  }
}
