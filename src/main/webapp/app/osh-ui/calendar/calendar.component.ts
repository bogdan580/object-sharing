import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

@Component({
  selector: 'jhi-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CalendarComponent implements OnInit {
  @Input()
  events: any[];
  options: any;
  @Output()
  selectEvent: EventEmitter<any>;
  constructor() {
    this.selectEvent = new EventEmitter<any>();
  }

  ngOnInit() {
    const selectEvent = this.selectEvent;
    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      // defaultDate: '2016-01-01',
      header: {
        // left: 'prev,next',
        left: 'title',
        center: 'month,agendaWeek,agendaDay'
      },
      editable: false,
      selectable: true,
      dateClick(e)  {
        // console.log(e.dateStr);
        // alert('clicked ' + e.dateStr);
      },
      select(e) {
        // console.log(e);
        selectEvent.emit({start: e.startStr, end: e.endStr, title: 'My reservation'});
      },
      unselect(e) {
        // x.selectEvent.emit(null);
      }
    };
  }
}
