import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ArticlesComponent } from './containers/articles.component';
import { JhiLanguageService } from 'ng-jhipster';
import { ArticlesService } from 'app/osh-core/articles/shared/services/article.service';
import { articlesRoute } from 'app/osh-core/articles/articles.route';
import { ObjectSharingSharedModule } from 'app/shared/shared.module';
import {TabViewModule} from 'primeng/tabview';
import { PanelModule } from 'primeng/panel';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
const ARTICLES_ROUTES = [...articlesRoute];
const CONTAINERS = [ArticlesComponent];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(ARTICLES_ROUTES),
    ObjectSharingSharedModule,
    TabViewModule,
    PanelModule,
    ConfirmDialogModule
  ],
  exports: [], // need add ui module
  declarations: [...CONTAINERS],
  providers: [ArticlesService, ConfirmationService, { provide: JhiLanguageService, useClass: JhiLanguageService }]
})
export class ArticlesModule {
  constructor() {}
}
