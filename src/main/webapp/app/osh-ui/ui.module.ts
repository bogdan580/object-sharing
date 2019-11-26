import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { CalendarComponent } from './calendar/calendar.component';

const PRIMENG_MODULES = [
  FullCalendarModule
];
const COMPONENTS = [
  CalendarComponent
];
@NgModule({
  imports: [CommonModule,  FormsModule, ...PRIMENG_MODULES],
  declarations: [...COMPONENTS],
  exports: [...PRIMENG_MODULES, ...COMPONENTS],
  entryComponents: [...COMPONENTS],
  providers: []
})
export class OshUiModule {}
