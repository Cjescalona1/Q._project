import { Injectable } from '@angular/core';
import { URL } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor() { }


  async getServices(): Promise<any> {
    let aux: any ;
    await  fetch(URL.api+'/services')
    .then(res=>res.json()) 
    .then(res=>{aux=res})
    return(aux);
  } 
  
  async findServices(params : any): Promise<any> { 
    let aux: any ;
    let output :any ; 
    aux = JSON.stringify(params)

    await fetch(URL.api+'/services/find', 
      {
        method:'POST',
        body: aux,
        headers: {
                'Content-Type': 'application/json',   
              } 
      })
    .then(res=>res.json()) 
    .then(res=>{output=res})
    .catch(err=>{console.log(err);
    })
    return(output);
  }
 

  
  async findService(params : any): Promise<any> { 
    let aux: any ;
    let output :any ; 
    aux = JSON.stringify(params)

    await fetch(URL.api+'/services/'+params, 
      {
        method:'GET',
        headers: {
                'Content-Type': 'application/json',   
              } 
      })
    .then(res=>res.json()) 
    .then(res=>{output=res})
    .catch(err=>{console.log(err);
    })
    return(output);
  }


  async createService(params: any, req: any):Promise<any> {

    let aux; 
    fetch(URL.api+'/services',   {
      method:'POST',
      body: JSON.stringify(params),
      headers: {
              'Content-Type': 'application/json',   
              'Authorization':`Bearer ${JSON.parse(req)}`
            } 
    })
    .then(res=>res.json()) 
    .then(res=>{aux=res})
    return(aux);
  } 

  async editService(params: any, req: any):Promise<any> {

    let aux; 
    fetch(URL.api+'/services/'+params.service_id,{
      method:'PUT',
      body: JSON.stringify(params),
      headers: {
              'Content-Type': 'application/json',   
              'Authorization':`Bearer ${JSON.parse(req)}`
            } 
    })
    .then(res=>res.json()) 
    .then(res=>{aux=res})
    return(aux);
  } 

  async deleteService(params: any, req: any):Promise<any> {
    
    let aux= JSON.stringify(params); 
    
    fetch(URL.api+'/services/'+aux,   {
      method:'DELETE',
          headers: {
              'Content-Type': 'application/json',   
              'Authorization':`Bearer ${JSON.parse(req)}`
            } 
    })
    .then(res=>res.json()) 
    .then(res=>{aux=res})
    return(aux);
  } 

  async findProvider(params : any): Promise<any> { 
    let aux: any ;
    let output :any ; 
    aux = JSON.stringify(params)

    await fetch(URL.api+'/providers/'+aux, 
      {
        method:'GET',
        headers: {
                'Content-Type': 'application/json',   
              } 
      })
    .then(res=>res.json()) 
    .then(res=>{output=res})
    .catch(err=>{console.log(err);
    })
    return(output);
  }

  async findProviderServices(params : any): Promise<any> { 
    let aux: any ;
    let output :any ; 
    aux = JSON.stringify(params)

    await fetch(URL.api+'/providers/services/'+aux, 
      {
        method:'GET',
        headers: {
                'Content-Type': 'application/json',   
              } 
      })
    .then(res=>res.json()) 
    .then(res=>{output=res})
    .catch(err=>{console.log(err);
    })
    return(output);
  }

  isolatedImg(imgArr:any){
    return "data:image/jpeg;base64,"+imgArr ;
  };

  b64toCss(arr: any){
    arr.map( (el:any)  =>{
      el.image= "data:image/jpeg;base64,"+el.image;
    })  
    return(arr)   
  } 
}   