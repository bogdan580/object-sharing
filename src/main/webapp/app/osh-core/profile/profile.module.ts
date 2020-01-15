import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { ProfileComponent } from 'app/osh-core/profile/containers/profile.component';
import { profileRoute } from 'app/osh-core/profile/profile.route';
import { OshProfileService } from 'app/osh-core/profile/shared/profile.service';
import { ObjectSharingSharedModule } from 'app/shared/shared.module';
const PROFILE_ROUTES = [...profileRoute];
const CONTAINERS = [ProfileComponent];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(PROFILE_ROUTES),
    ObjectSharingSharedModule
  ],
  exports: [], // need add ui module
  declarations: [...CONTAINERS],
  providers: [OshProfileService, { provide: JhiLanguageService, useClass: JhiLanguageService }]
})
export class ProfileModule {
  constructor() {}
}
