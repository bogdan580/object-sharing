import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ObjectSharingSharedModule } from 'app/shared/shared.module';
import { AdvertismentComponent } from './advertisment.component';
import { AdvertismentDetailComponent } from './advertisment-detail.component';
import { AdvertismentUpdateComponent } from './advertisment-update.component';
import { AdvertismentDeletePopupComponent, AdvertismentDeleteDialogComponent } from './advertisment-delete-dialog.component';
import { advertismentRoute, advertismentPopupRoute } from './advertisment.route';

const ENTITY_STATES = [...advertismentRoute, ...advertismentPopupRoute];

@NgModule({
  imports: [ObjectSharingSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    AdvertismentComponent,
    AdvertismentDetailComponent,
    AdvertismentUpdateComponent,
    AdvertismentDeleteDialogComponent,
    AdvertismentDeletePopupComponent
  ],
  entryComponents: [AdvertismentDeleteDialogComponent]
})
export class ObjectSharingAdvertismentModule {}
