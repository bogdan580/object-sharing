import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { CalendarComponent } from './calendar/calendar.component';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import { LeafletMapComponent } from 'app/osh-ui/leaflet-map/leaflet-map.component';
const PRIMENG_MODULES = [
  FullCalendarModule
];
const COMPONENTS = [
  LeafletMapComponent,
  CalendarComponent
];
@NgModule({
  imports: [CommonModule,  FormsModule, ...PRIMENG_MODULES, LeafletModule],
  declarations: [...COMPONENTS],
  exports: [...PRIMENG_MODULES, ...COMPONENTS],
  entryComponents: [...COMPONENTS],
  providers: []
})
export class OshUiModule {}
