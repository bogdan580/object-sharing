import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { SearchListService } from 'app/osh-core/search-list/shared/services/search-list.service';
import { SearchListComponent } from 'app/osh-core/search-list/containers/search-list.component';
import { searchListRoute } from 'app/osh-core/search-list/search-list.route';
import { ObjectSharingSharedModule } from 'app/shared/shared.module';
import { OshUiModule } from 'app/osh-ui/ui.module';
const SEARCH_LIST_ROUTES = [...searchListRoute];
const CONTAINERS = [SearchListComponent];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(SEARCH_LIST_ROUTES),
    ObjectSharingSharedModule,
    OshUiModule
  ],
  exports: [], // need add ui module
  declarations: [...CONTAINERS],
  providers: [SearchListService, { provide: JhiLanguageService, useClass: JhiLanguageService }]
})
export class SearchListModule {
  constructor() {}
}
