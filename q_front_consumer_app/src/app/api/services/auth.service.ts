
import { Injectable } from '@angular/core'; 
import { placeholderImg, URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  URL = URL;
  constructor( ) {} 
 
  userLogout(req:any){
    let aux;

    //return this.http.post(`${this.URL}login/prov`,req);
    fetch(URL.api+'/logout',   {
      method:'POST',
     // body: JSON.stringify(req),
      headers: {
              'Content-Type': 'application/json',   
              'Authorization':`Bearer ${JSON.parse(req)}`
            } 
    })
    .then(res=>res.json()) 
    .then(res=>{aux=res})
    return(aux);
  } 
  
  async consumerLogin(req:any, user: any){
    let aux;
    //return this.http.post(`${this.URL}login/prov`,req);
    await fetch(URL.api+'/login/cons',
      {
        method:'POST',
        body: JSON.stringify(req),
        headers: {
                'Content-Type': 'application/json',   
              } 
      }
    )
    .then(res=>res.json()) 
    .then(res=>{user=res})
    .catch(err=>console.log(err)
    )
    return(user);
  }

  async consumerReg(req :any , user: any){
    let aux;
    req.image = placeholderImg;  

    // await fetch( URL.api+'/register/provider',{
     await fetch( URL.api+'/register/consumer',{
      method: 'POST',
      body: JSON.stringify(req),
      headers: {
        // 'Content-Type': 'multipart/form-data', 
        'Content-Type': 'application/json',   
      } 
    }
    )
    .then(res=>res.json()) 
    .then(res=>{user=aux=res})
    .catch(err=>console.log({'error':err}))
    return(user);
  } 
 
}
 