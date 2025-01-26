import { Component , signal, ChangeDetectorRef,ViewChild, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/api/services/services.service';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi, Calendar, CalendarApi } from '@fullcalendar/core';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { ServicePage } from '../service/service.page';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { CalendarService } from 'src/app/api/calendar.service';
import { CalendarModalPage } from 'src/app/common/calendar-modal/calendar-modal.page';
import { EventInput } from '@fullcalendar/core';
import { EventModalPage } from 'src/app/common/event-modal/event-modal.page';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.page.html',
  styleUrls: ['./provider.page.scss'],
})
export class ProviderPage implements OnInit {
  dataObs: Observable<any>;  
  public _prov:any = {}; 
  public _servs:any = []; 
  public loaded :boolean = false;
  public self :boolean = false;
  public cleanServ: any[]=[] ;
  public appo : any;
  public events: any;

  constructor(
    private servApi : ServicesService,
    private modalCtrl: ModalController,
    private calService : CalendarService,
    private changeDetector: ChangeDetectorRef ,

  ) { }

  calendarOptions :CalendarOptions= ({
    plugins: [
      interactionPlugin,
      timeGridPlugin,
      dayGridPlugin,
      listPlugin 
      ],
      headerToolbar: {
        left:'',
        center: 'title',
        right: 'prev,next', 
      },
      footerToolbar:{
        left: 'dayGridMonth,timeGridWeek,timeGridDay,listDay,today',
      },
      locale:'es',
      initialView: 'timeGridWeek',
      height:"auto",
   
      //slot configuration
      slotMinTime:'08:00',
      slotMaxTime:'22:00',
      slotDuration:'01:00',
     // allDaySlot:false,
      businessHours: {
        // days of week. an array of zero-based day of week integers (0=Sunday)
        daysOfWeek: [ 1, 2, 3, 4 , 5, 6], 
        // startTime: '07:00', // a start time (10am in this example)
         endTime: '22:00', // an end time (6pm in this example)
      },
      //hidden sunday
      hiddenDays:[0],
      buttonText:{
        today:    'Hoy',
        month:    'Mes',
        week:     'Sem',
        day:      'Día',
        list:     'Lista'
      },
      // dateClick: (arg) => this.handleDateClick(arg),
       events:this.cleanServ,
      // events:this.calApi.getElement,
      // initialEvents: this.events , // alternatively, use the `events` setting to fetch from a feed
   /* weekends: true,*/
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this) 
  
    /* you can update a remote database when these fire:
    eventChange:
    eventRemove:
    */
  });
 
  // goCreateService(){
  //     window.location.assign("/create-service")
  // }
/*Calendar functions*/
async openCalModal(ev : any, calendar: any) { 
  const modal = await this.modalCtrl.create({
    component: CalendarModalPage,
    showBackdrop: true,
    initialBreakpoint: 0.75,
    componentProps: { value: ev , cal_ : calendar, calFunction : this.calService, }
  });
   
  modal.present( );
   const { data, role } = await modal.onWillDismiss();

  if (role === 'confirm') {
    
  window.location.reload()
    
  }
}

handleDateSelect(selectInfo: DateSelectArg) {
  //const title = prompt('Elige un titulo para el');
  var title = "";
  const calendarApi = selectInfo.view.calendar;

  calendarApi.unselect(); // clear date selection
  let aux_:any = selectInfo; 
  this.openCalModal(aux_, calendarApi)
  
  let aux = selectInfo.view.calendar.getEvents();
 
}

async handleEventClick(clickInfo: EventClickArg) { 
  let aux = clickInfo.event;
  const modal = await this.modalCtrl.create({
    component: EventModalPage,
    initialBreakpoint:0.90,
    componentProps: { _aux : aux, _self : this.self  }
  });
  modal.present( );
  // if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
  //   clickInfo.event.remove();
  // }
}
// handleEventClick(clickInfo: EventClickArg) {
//   if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
//     clickInfo.event.remove();
//   }
// }

handleEvents(events: EventApi[]) { 
  this.currentEvents.set(this.appo);
  this.changeDetector.detectChanges(); // workaround for pressionChangedAfterItHasBeenCheckedError
} 

saveEvents(events: EventApi[]) {
  localStorage.setItem("localEvents", JSON.stringify(events));
}

  async openModal( ev:any ){
      let pass:any={}; 
      await this.servApi.findService(ev).then(res=>{pass=res.service; }); 
   
      const modal = await this.modalCtrl.create({
        component: ServicePage,
        componentProps: { _service: pass, _self : this.self  }
      });
       
      modal.present( );
       const { data, role } = await modal.onWillDismiss();
  
      if (role === 'confirm') {
        
      window.location.reload()
        
      }
  }
public _Appointment :any;
  async ngOnInit() {

    let url = window.location.pathname.split("/");

    let queryString = url ? url[2] : window.location.search.slice(1);
    
    this.self = url[2] == sessionStorage.getItem('user');
    //get provider
    await this.servApi.findProvider(JSON.parse(queryString)).then(res=>{this._prov=res.provider}); 
    this._prov = this.servApi.b64toCss([this._prov])[0]
    //get services from provider
    await this.servApi.findProviderServices(JSON.parse(queryString)).then(res=>{this._servs=res.services}); 
    this._servs = this.servApi.b64toCss(this._servs)
    this.loaded = true; 
    //get appointments from provider
    await this.calService.getAppointments(url[2]).then(res=>{this._Appointment=res.appointments });     

    this.clean(this._Appointment);   
    
    this.calendarOptions.events= this._Appointment;
     
    if(this.cleanServ){

        for (let index = 0; index < this.cleanServ.length; index++) {
          const element = this.cleanServ[index]; 
        } 
    }   
  }

   //ServiceClick
   serviceClick(arg:any){
    alert(arg.title); 
  }  
  clean(PreServ_:any):any {
    
    let clean_aux : EventInput = {
      start:"",
      end:"",
      title:"",
      id:""
    };
    let item;
    for (let index = 0; index < PreServ_.length; index++) {
      const element = PreServ_[index];
      
      clean_aux.start = element.start;
      clean_aux.end = element.end;
      clean_aux.title = element.title;
      clean_aux.id = element.id;
      
      this.cleanServ[index]= clean_aux;
      clean_aux={
        id:"",
        start:"",
        end:"",
        title:""
      };
   
    }
    return(this.cleanServ) 
   this.events= this.cleanServ;
  }


  currentEvents = signal<EventApi[]>([]); 
}
