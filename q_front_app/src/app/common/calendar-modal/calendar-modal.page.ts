import { Component, input, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ServicesService } from 'src/app/api/services/services.service';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi, Calendar } from '@fullcalendar/core';
import { createEventId } from '../../../assets/event-utils'; 
@Component({
  selector: 'app-calendar-modal',
  templateUrl: './calendar-modal.page.html',
  styleUrls: ['./calendar-modal.page.scss'],
})
export class CalendarModalPage implements OnInit {
 
  name: string;
  title: any= ""; 
  prov_id : any = window.location.pathname.split("/")[2];
  
  selectInfo: DateSelectArg 
  @Input() value :any = {} ; 
  @Input() cal_ :any = {} ; 
  @Input() calFunction :any = {} ; 
  @Input() _type :string = '';
  @Input() _pass :any = {};
  @Input() _services :any = [];
  @Input() aux_ :any = {};
  
  public events : any =[
    {
      id: 1,
      slotEventOverlap:false,
      title: ' OOOOO Day Event', 
      
    },
    {
      id: 2,
      slotEventOverlap:false,
      title: 'Long Event',  
    },
    {
      id: 3,
      slotEventOverlap:false,
      title: 'Repeating Event',    
    },
    { 
      id:4,
      title: 'event 1', 
      allDay:false,
      editable:false,
      startEditable:false,
      durationEditable:false,
    },
    { 
      id: 5,
      title: 'event 2', 
    }
  ];

  constructor(
    private modalCtrl: ModalController,
    private servApi : ServicesService,
  ) { }


  ngOnInit() {
  console.log(this.prov_id); 
  this.servApi.findProviderServices(JSON.parse(this.prov_id))
  .then(res=>{ 
    this._services=res.services;
    this.servApi.b64toCss(this._services);
   });
  }

  
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() { 
    
    const calendarApi = this.cal_.view.calendar;
    let aux: {} = {
        title:this.title,
        start: this.value.startStr,
        end: this.value.endStr,
        provider_id:this.prov_id,
        service_id:2,
        // consumer_id:sessionStorage.getItem("user")
        consumer_id:10
    }; 


    this.calFunction.postElement(aux);

    if (this.title) {  
      calendarApi.addEvent({
        id: createEventId(),
        title:this.title,
        start: this.value.startStr,
        end: this.value.endStr,
        allDay: this.value.allDay,
        editable:false,
        startEditable:false,
        durationEditable:false,
        overlap:false
      });
    }
    return this.modalCtrl.dismiss( this.name, 'confirm'); 
  }
  /* */
   
  async delete() {
    console.log(this._pass);
    await this.servApi.deleteService(this._pass, sessionStorage.getItem("token")).then(res=>{console.log(res); });
    setTimeout (()=>{window.location.reload()},2.5*1000)
  }

  setTitle(title: any){
 
    // console.log(title);
    // console.log("valueeee",this.value);
    
    this.title = title;
    
  }
}
