import { EventInput } from '@fullcalendar/core';
let eventGuid = 0;
const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

 
export const INITIAL_EVENTS: EventInput[] = [
  
  {
    editable:false,
    startEditable:false,
    durationEditable:false,
    id: createEventId(),
    title: 'Evento pre 1',
    start: TODAY_STR + 'T08:00:00',
    end: TODAY_STR + 'T10:00:00'
  },
  {
    editable:false,
    startEditable:false,
    durationEditable:false,
    id: createEventId(),
    title: 'Evento pre 2',
    start: TODAY_STR + 'T12:00:00',
    end: TODAY_STR + 'T13:00:00'
  },
  {
    editable:false,
    startEditable:false,
    durationEditable:false,
    id: createEventId(),
    title: 'Evento pre 3',
    start: TODAY_STR + 'T14:00:00',
    end: TODAY_STR + 'T18:00:00'
  }
];

export function createEventId() {
  return String(eventGuid++);
}
