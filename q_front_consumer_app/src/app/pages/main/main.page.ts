import { Component , signal, ChangeDetectorRef,ViewChild, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/api/services/services.service';
import { IonModal } from '@ionic/angular';

import { ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { ServicePage } from '../service/service.page';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  
  public _servs:any;
  public _founds:any;
  public self :boolean = false;
  public found:boolean = false;
  public noFound:boolean = false;
  public loading :boolean=false;

  constructor(
    private servApi : ServicesService,
    private modalCtrl: ModalController,
   ) { }

@ViewChild(IonModal) modal: IonModal;

message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string ='';
  date: any ;

cancel() {
  this.modal.dismiss(null, 'cancel');
}

confirm() {
  this.modal.dismiss(this.name, 'confirm');
}

onWillDismiss( ) {
 
 
}

async openModal( ev:any){
    let pass:any={}; 
    
    await this.servApi.findService(ev).then(res=>{pass=res.service; }); 
    this.self = pass.provider_id == sessionStorage.getItem("user");
    
    const modal = await this.modalCtrl.create({
      component: ServicePage,
      componentProps: { _service: pass, _self : this.self }
    });
     
    modal.present( );
     const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      
    window.location.reload()
      
    }
}
  async ngOnInit() {
        await this.servApi.getServices().then(res=>{this._servs=res.service}); 
        this._servs = this.servApi.b64toCss(this._servs);
        this.self = sessionStorage.getItem('user') == this._servs[0].provider; 
      }

  async findService(event:any){
   let pass= {"search" : event.target.value} ;
    if(event.target.value != ""){
      await this.servApi.findServices( pass )
              .then(res=>{  this._founds=res.services})
              .catch(err=>{console.log(err);
              });
        this._founds = this.servApi.b64toCss(this._founds);
        this._founds.length == 0 ? this.noFound = true : this.noFound = false;
        setTimeout(()=>{this.noFound = false;}, 4000)
      this.loading=true
      if (this._founds.length > 0) {
          this.found=true;
          this.loading=false;
        }
        else{
          this.found=false;
        }

      }
      else{
      this.found= false;
    }

  }

}
