import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { ObjectSharingSharedModule } from 'app/shared/shared.module';
import { ObjectSharingCoreModule } from 'app/core/core.module';
import { ObjectSharingAppRoutingModule } from './app-routing.module';
import { ObjectSharingHomeModule } from './home/home.module';
import { ObjectSharingEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';
import { OshCoreModule } from 'app/osh-core/osh-core.module';
import { OshRoutingModule } from 'app/osh-core/osh-routing.module';
import { OshUiModule } from 'app/osh-ui/ui.module';

@NgModule({
  imports: [
    BrowserModule,
    OshCoreModule,
    OshRoutingModule,
    ObjectSharingSharedModule,
    ObjectSharingCoreModule,
    ObjectSharingHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    ObjectSharingEntityModule,
    ObjectSharingAppRoutingModule,
    OshUiModule
  ],
  declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent],
  bootstrap: [JhiMainComponent]
})
export class ObjectSharingAppModule {}
