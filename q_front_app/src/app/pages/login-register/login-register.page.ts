import { FormGroup, FormControl } from "@angular/forms";
import { Component, OnInit } from '@angular/core';
import { Validators } from "@angular/forms";
import { AuthService } from "src/app/api/services/auth.service"; 
@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.page.html',
  styleUrls: ['./login-register.page.scss'],
})
export class LoginRegisterPage implements OnInit {

  public log :boolean = true;
  public tok :string ='';
  public user :any ;
  public userR :any ;
  constructor( private authApi : AuthService  ) { }


  
  ngOnInit() {
  }

  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required,Validators.email]),
    password: new FormControl("", [Validators.required,Validators.minLength(5)]),
    password_confirm: new FormControl("", [Validators.required,Validators.minLength(5)]),
    });

  registerForm = new FormGroup({
    name: new FormControl("", [Validators.required,Validators.minLength(3)]),
    email: new FormControl("", [Validators.required,Validators.email]),
    password: new FormControl("", [Validators.required,Validators.minLength(5)]),
    password_confirm: new FormControl("", [Validators.required,Validators.minLength(5)]),
    });
  
  toggle(){
    this.log = !this.log;
  }
 
 async onSubmit(mode:boolean) {

    

    if(mode){
      await this.authApi.providerLogin(this.loginForm.value, this.user).then(res=>{ this.user = res });
      console.log(this.user);
      sessionStorage.setItem('token',JSON.stringify(this.user?.token));
      sessionStorage.setItem('user',JSON.stringify(this.user?.provider.id));
    }
    else{

      await  this.authApi.providerReg(this.registerForm.value, this.userR).then(res=>{
      console.log("res",res);
      
        this.userR=res;
        sessionStorage.setItem('token',JSON.stringify(this.userR?.token));
      })  
    }
    window.location.replace('/main');
  }

  async logout(){
    await this.authApi.userLogout(sessionStorage.getItem('token'));
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    window.location.replace('/main');}
}
