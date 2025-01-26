
import { FormGroup, FormControl } from "@angular/forms";
import { Component, OnInit } from '@angular/core';
import { Validators } from "@angular/forms";
import { AuthService } from "src/app/api/services/auth.service"; 
import { placeholderImg } from "src/environments/environment";
import { ServicesService } from "src/app/api/services/services.service";

@Component({
  selector: 'app-edit-provider',
  templateUrl: './edit-provider.page.html',
  styleUrls: ['./edit-provider.page.scss'],
})
export class EditProviderPage implements OnInit {
  file :File;
  
  public token :any ;
  public auxImg :any ;
  public aux:any ;
  public ima:boolean = false;
  public _provider : { 
    name: string ,
    description: string,
    phone:  string,
    provider_id: string,
    image: string,
  }; 
  public _id : any;
  public editProviderForm : FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]),
    phone: new FormControl(""),
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
    console.log(this._id);
    
    await this.servApi.findProvider(this._id).then(res=>{
      this._provider=res.provider; 
      
      this.auxImg = this.servApi.isolatedImg(this._provider.image)
        this.editProviderForm = new FormGroup({
          name: new FormControl(this._provider.name, [Validators.required]),
          phone: new FormControl(this._provider.phone),
          description: new FormControl(this._provider.description, [Validators.required]),
          image: new FormControl(this._provider.image),
        });  
    })
   
  } 
 async onSubmit() {
  let _alt : any;
    if(this.file){
      _alt = await this.toBase64(this.file);
      _alt=JSON.stringify(_alt);
      _alt= (JSON.stringify(_alt).split(',')[1]).replace('\"\"','').replace('\"','').replace('\:','').replace('\,','').replace('\\','');
    }
    this.editProviderForm.value.image = _alt;
    this.editProviderForm.value.provider_id = sessionStorage.getItem('user');
    this.editProviderForm.value.service_id = this._id;

      await this.servApi.editProvider(this.editProviderForm.value,this.token)
      .then(res=>{ this.aux = res})
      .then(res=>{  this.created = true,  setTimeout(()=>{ window.location.replace('/provider/'+sessionStorage.getItem('user'))}, 2500  )});
  }

  onFileSelected(event : any){
    this.file = event.target.files[0];
  }
}
