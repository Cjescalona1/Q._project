import { FormGroup, FormControl } from "@angular/forms";
import { Component, OnInit } from '@angular/core';
import { Validators } from "@angular/forms";
import { AuthService } from "src/app/api/services/auth.service"; 
import { placeholderImg } from "src/environments/environment";
import { ServicesService } from "src/app/api/services/services.service";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
 
  file :File;
  
  public token :any ;
  public auxImg :any ;
  public aux:any ;
  public ima:boolean = false;
  public _profile : { 
    name: string ,
    description: string,
    phone:  string,
    profile_id: string,
    image: string,
  }; 
  public _id : any;
  public editProfileForm : FormGroup = new FormGroup({
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
    
    await this.servApi.findConsumer(this._id).then(res=>{
      this._profile=res.consumer; 
      
      this.auxImg = this.servApi.isolatedImg(this._profile.image)
        this.editProfileForm = new FormGroup({
          name: new FormControl(this._profile.name, [Validators.required]),
          phone: new FormControl(this._profile.phone),
          description: new FormControl(this._profile.description),
          image: new FormControl(this._profile.image),
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
    this.editProfileForm.value.image = _alt;
    this.editProfileForm.value.profile_id = sessionStorage.getItem('user'); 

      await this.servApi.editProfile(this.editProfileForm.value,this.token)
      .then(res=>{ this.aux = res})
      .then(res=>{  this.created = true,  setTimeout(()=>{ window.location.replace('/consumer/'+sessionStorage.getItem('user'))}, 2500  )});
  }

  onFileSelected(event : any){
    this.file = event.target.files[0];
  }
}

