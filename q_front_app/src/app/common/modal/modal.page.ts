import { Component, input, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ServicesService } from 'src/app/api/services/services.service';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  
  @Input() _type :string = '';
  @Input() _pass :any = {};
  
  constructor(
    private modalCtrl: ModalController,
    private servApi : ServicesService,
  ) { }
  ngOnInit() {
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(null, 'confirm');
  }
  async delete() {
    console.log(this._pass);
    await this.servApi.deleteService(this._pass, sessionStorage.getItem("token")).then(res=>{console.log(res); });
    setTimeout (()=>{window.location.reload()},2.5*1000)
  }

}
