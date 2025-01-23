import { Injectable } from '@angular/core'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(  ) { } 

  async postElement(req:any)   {
    
    let aux: any =JSON.stringify(req);
    console.log("aux",aux);
    localStorage.setItem("aux",aux);
    
    fetch('http://127.0.0.1:8000/api/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',   
      },
      body:aux
    })
    .then(res=>{
      console.log(res);
    })
    .catch(err=>(console.log(err)))
    
    await  fetch('http://127.0.0.1:8000/api/appointments')
    .then(res=>res.json()) 
    .then(res=>{aux=res})
    return(aux);
  }

  async getAppointments(req:any):Promise<any>{
    let aux;
    await fetch('http://127.0.0.1:8000/api/providers/appointments/'+req)
    .then(res=>res.json()) 
    .then(res=>{aux=res})
    return(aux);
  }
}