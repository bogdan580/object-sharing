import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
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
  myEvent: any;
  constructor() {
    this.myEvent = {title: "My reservation"}
  }

  ngOnInit() {
    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      defaultDate: '2016-01-01',
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
        console.log(e);
      }
    };
  }

  printst(e: any) {
    console.log('e', e);
  }

  addReserve(start: string, end: string = null) {
    console.log('start ', start);
    console.log('end ', end);
    this.myEvent.start = start;
    if (end) {
      this.myEvent.end = end;
      this.events = [...this.events, this.myEvent];
    }
  }

  reserve(){
    this.addReserve('2016-01-21','2016-01-23');
  }

}
