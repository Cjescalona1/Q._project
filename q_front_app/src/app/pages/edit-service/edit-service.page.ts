import { FormGroup, FormControl } from "@angular/forms";
import { Component, OnInit } from '@angular/core';
import { Validators } from "@angular/forms";
import { AuthService } from "src/app/api/services/auth.service"; 
import { placeholderImg } from "src/environments/environment";
import { ServicesService } from "src/app/api/services/services.service";

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.page.html',
  styleUrls: ['./edit-service.page.scss'],
})
export class EditServicePage implements OnInit {

  file :File;
  
  public token :any ;
  public auxImg :any ;
  public aux:any ;
  public ima:boolean = false;
  public _service : { 
    name: string ,
    description: string,
    mode: string,
    price: number,
    provider_id: string,
    image: string,
  }; 
  public _id : any;
  public editServiceForm : FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]),
    mode: new FormControl("", [Validators.required]),
    price: new FormControl("", [Validators.required]),
    image: new FormControl(""),
  }); 
  ;

  toBase64 = (alt:any) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(alt);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
  created: boolean;
  
  constructor(  
    private servApi : ServicesService,

  ) { } 
  
  async ngOnInit() {
    this.token = sessionStorage.getItem('token');
    let url = window.location.pathname.split("/");
    this._id = url[2];
    await this.servApi.findService(this._id).then(res=>{
      this._service=res.service;
      this.auxImg = this.servApi.isolatedImg(this._service.image)
        this.editServiceForm = new FormGroup({
          name: new FormControl(this._service.name, [Validators.required]),
          description: new FormControl(this._service.description, [Validators.required]),
          mode: new FormControl(this._service.mode, [Validators.required]),
          price: new FormControl(this._service.price, [Validators.required]),
          image: new FormControl(this._service.image),
        
        });  
    })
   
  }
  
    // 'name',
    // 'description',
    // 'mode',
    // 'price',
    // 'provider_id'
 
 
 async onSubmit() {
  let _alt : any;
    if(this.file){
      _alt = await this.toBase64(this.file);
      _alt=JSON.stringify(_alt);
      _alt= (JSON.stringify(_alt).split(',')[1]).replace('\"\"','').replace('\"','').replace('\:','').replace('\,','').replace('\\','');
    }
    this.editServiceForm.value.image = _alt;
    this.editServiceForm.value.provider_id = sessionStorage.getItem('user');
    this.editServiceForm.value.service_id = this._id;

      await this.servApi.editService(this.editServiceForm.value,this.token)
      .then(res=>{ this.aux = res})
      .then(res=>{  this.created = true,  setTimeout(()=>{ window.location.replace('/provider/'+sessionStorage.getItem('user'))}, 2500  )});
  }

  onFileSelected(event : any){
    this.file = event.target.files[0];
  }
}
