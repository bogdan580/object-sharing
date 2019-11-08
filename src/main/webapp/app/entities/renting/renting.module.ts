import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ObjectSharingSharedModule } from 'app/shared/shared.module';
import { RentingComponent } from './renting.component';
import { RentingDetailComponent } from './renting-detail.component';
import { RentingUpdateComponent } from './renting-update.component';
import { RentingDeletePopupComponent, RentingDeleteDialogComponent } from './renting-delete-dialog.component';
import { rentingRoute, rentingPopupRoute } from './renting.route';

const ENTITY_STATES = [...rentingRoute, ...rentingPopupRoute];

@NgModule({
  imports: [ObjectSharingSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    RentingComponent,
    RentingDetailComponent,
    RentingUpdateComponent,
    RentingDeleteDialogComponent,
    RentingDeletePopupComponent
  ],
  entryComponents: [RentingDeleteDialogComponent]
})
export class ObjectSharingRentingModule {}
