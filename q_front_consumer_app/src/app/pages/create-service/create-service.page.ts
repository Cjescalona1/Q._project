import { FormGroup, FormControl } from "@angular/forms";
import { Component, OnInit } from '@angular/core';
import { Validators } from "@angular/forms";
import { AuthService } from "src/app/api/services/auth.service"; 
import { placeholderImg } from "src/environments/environment";
import { ServicesService } from "src/app/api/services/services.service";

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.page.html',
  styleUrls: ['./create-service.page.scss'],
})
export class CreateServicePage implements OnInit {

  file :File;
  
  public token :any ;
  public auxImg :any ;
  public aux:any ;
  public ima:boolean = false;

  toBase64 = (alt:any) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(alt);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
  created: boolean;
  
  constructor( 
    private authApi : AuthService,  
    private servApi : ServicesService,

  ) { } 
  
  ngOnInit() {
    this.token = sessionStorage.getItem('token');
  }
    // 'name',
    // 'description',
    // 'mode',
    // 'price',
    // 'provider_id'
  createServiceForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]),
    mode: new FormControl("", [Validators.required]),
    price: new FormControl("", [Validators.required]),
    image: new FormControl(""),
    provider_id: new FormControl(""),
    }); 
   
 
 async onSubmit() {
  let _alt : any = placeholderImg;
    if(this.file){
      _alt = await this.toBase64(this.file);
      _alt=JSON.stringify(_alt);
      _alt= (JSON.stringify(_alt).split(',')[1]).replace('\"\"','').replace('\"','').replace('\:','').replace('\,','').replace('\\','');
    }
    this.createServiceForm.value.image = _alt;
    this.createServiceForm.value.provider_id = sessionStorage.getItem('user');
      await this.servApi.createService(this.createServiceForm.value,this.token)
      .then(res=>{ this.aux = res})
      .then(res=>{  this.created = true,  setTimeout(()=>{ window.location.replace('/provider/'+sessionStorage.getItem('user'))}, 2500  )});
      // await this.authApi.providerLogin(this.createServiceForm.value, this.user).then(res=>{ this.user = res });
      
  }

  onFileSelected(event : any){
    this.file = event.target.files[0];
  }
}
