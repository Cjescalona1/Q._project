import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ServicesService } from 'src/app/api/services/services.service';
import { Router } from '@angular/router';
import { ModalPage } from 'src/app/common/modal/modal.page';
@Component({
  selector: 'app-service',
  templateUrl: './service.page.html',
  styleUrls: ['./service.page.scss'],
})
export class ServicePage implements OnInit {
  public ready:boolean =false;
  @Input() _service :any = {} ; 
  @Input() _services :any = [] ; 
  @Input() _self :boolean = false; 
  constructor(
    private router: Router,
    private servApi : ServicesService,
    private modalCtrl: ModalController,
  ) { }
 
  async openModal(type:string, pass:any) {
    // let pass:any={}; 
    
   // await this.servApi.findService(ev).then(res=>{pass=res.service; }); 
    // this.self = pass.provider_id == sessionStorage.getItem("user");
    
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      initialBreakpoint:0.4,
      backdropDismiss:true,
      showBackdrop:true,
      componentProps: { _type: type, _pass:pass }
    });
     
    modal.present( );
     const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      
    window.location.reload()
      
    } 
  }

  async ngOnInit() { 
        this._service =  this.servApi.b64toCss([this._service])[0];
  }
 
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(null, 'confirm');
  }

  goto(prov:any){
    this.confirm();
    this.router.navigate(['/provider/', prov]); 
  }

  goEdit(serv:number){
    this.modalCtrl.dismiss(null, 'cancel');
    this.router.navigate(['/edit-service/',serv]); 
  }
}
