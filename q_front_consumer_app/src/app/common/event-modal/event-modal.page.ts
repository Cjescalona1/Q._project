import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ServicesService } from 'src/app/api/services/services.service';
@Component({
  selector: 'app-event-modal',
  templateUrl: './event-modal.page.html',
  styleUrls: ['./event-modal.page.scss'],
})
export class EventModalPage implements OnInit {

  @Input() _aux: any; 
  public _service: any = {};
  public _provider: any = {};
  public _self : boolean = false;
  public _showOpt: boolean = false;
  public _changed: boolean = false;
  public _rate: any ;
  public _rated : boolean = false;
  
  constructor(
    public modalCtrl: ModalController,
    public servApi: ServicesService,
    
  ) { }

  ngOnInit() {  
    console.log(this._aux);
    
    this._rate = this._aux.extendedProps.rating;
    this._rated = this._aux.extendedProps.status == 1;
    console.log("to rate",this._rated);
    console.log("rating ",this._rate);
    
    this.servApi.findService(this._aux.extendedProps.service_id)
    .then(res => {  
      
      this._service = res.service;
      this._showOpt = this._aux.extendedProps.status == 1;  
      
      this._service.image =  this.servApi.isolatedImg(this._service.image);

    });
    
    this.servApi.findProvider(this._aux.extendedProps.provider_id).then(res => { this._provider = res.provider}); 
  }
 
  setR(ev:any){ 
    this._rate = ev.detail.value;    
  }
  confirm() {    
      this.servApi.rateAppointment(this._aux.id,3,this._rate).then(res => {
      this._changed= true; 
      setTimeout(() => {this.confirm() ; window.location.reload()}, 3000);
    });

    return this.modalCtrl.dismiss(this._aux, 'confirm');
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }  
 
}
