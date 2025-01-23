<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Service;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;

class serviceController extends Controller
{
    // 'name',
    // 'description',
    // 'mode',
    // 'price',
    // 'provider_id'
     

    public function index(){
        $service=Service::all();
        // return response()->json($service);  
        if (!$service) {
            $data = [
                'message'=>'There is no service available',
                'status'=>'400'
            ];
            return response()->json($data, 200);
        }
        else{
            $data = [

                'service'=>$service,
                'status'=>'200'
            ];
            return(
             response()->json($data,200)  
            );
        }
    }
   
 
    public function store(Request $request){
        $validator =  Validator::make($request->all(), [
        'name'=>'required',
        'description'=>'required',
        'mode'=>'required',
        'price'=>'required',
        'provider_id'=>'required',
        'image'=>'nullable',
    ]);
    if($validator->fails()){
        $data = [
            'message'=>'validation error!', $request->all()
            ,
            'status'=>'400'
        ] ;
        return(response()->json($data , 400));
    }
    $service=Service::create([
            'name'          => $request->name,
            'description'   => $request->description,
            'mode'          => $request->mode,
            'price'         => $request->price,
            'provider_id'   => $request->provider_id,
            'image'         => $request->image,
            
        ]);
    if(!$service){
        $data = [
            'message'=>'creation error!',
            'status'=>'500'
        ] ;
        return(response()->json($data , 500));
     };
    $data = [
        'service'=>$service,
        'status'=>200
    ];
    return(response()->json($data,201));
    }
    public function show($id){
        $service = Service::find($id);
        
        if (!$service) {
            $data = [
                'message'=>'Service not found',
                'status'=>'400'
            ];
            return response()->json($data, 200);
        }
        else{
            $data = [

                'service'=>$service,
                'status'=>'200'
            ];
            return(
                response()->json($data,200)  
            );
        }
    }

    public function search(Request $request){
          
        $validator =  Validator::make($request->all(), [
            'search'=>'required',
        ]);

        if($validator->fails()){
            $data = [
                'message'=>'validation error!', $request->all()
                ,
                'status'=>'400'
            ] ;
            return(response()->json($data , 400));
        }
        else{
            $services = Service::query()
            ->when(
               $request->search,
               function(Builder $builder) use ($request){
                   $builder->where('name', 'like', "%{$request->search}%")
                   ->orWhere('description', 'like', "%{$request->search}%");
               }
            )->get();
        }
 
       
     
        if (!$services) {
            $data = [
                'message'=>'There is no services available',
                'status'=>'400'
            ];
            return response()->json($data, 200);
        }
        else{
            $data = [

                'services'=>$services,
                'status'=>'200'
            ];
            return(
             response()->json($data,200)  
            );
        }
    }

   // public function search(Request $request){
            //     $service=Service::all();
            //     // $services = Service::query()
            //     //      ->when(
            //     //         $request->search,
            //     //         function(Builder $builder) use ($request){
            //     //             $builder->where('name', 'like', "%{$request->search}%")
            //     //             ->orWhere('description', 'like', "%{$request->search}%");
            //     //         }
            //     //      )->get();
    
            // return $service;
        
       
        // if (!$services) {
        //     $data = [
        //         'message'=>'Service not found',
        //         'status'=>'400'
        //     ];
        //     return response()->json($data, 200);
        // }
        // else{
        //     $data = [

        //         'service'=>$services,
        //         'status'=>'200'
        //     ];
        //     return(
        //         response()->json($data,200)  
        //     );
        // }
   // }
    public function Destroy($id){
        $service = Service::find($id);
        
        if (!$service) {
            $data = [
                'message'=>'Service not found',
                'status'=>'400'
            ];
            return response()->json($data, 200);
        }
        else{
            $service->delete();
            $data = [
                'message'=>'Service Deleted',
                'status'=>'200'
            ];
            return(
             response()->json($data,200)  
            );
        }
    }

    public function update($id, Request $request){
        $service = Service::find($id);
        echo $request;

        // $validator =  Validator::make($request->all(), [
        //     'name'=>'required',
        //     'description'=>'required',
        //     'mode'=>'required',
        //     'price'=>'required|float',
        //     ]);

        if (!$service) {
            $data = [
                'message'=>'Service not found',
                'status'=>'400'
            ];
            return response()->json($data, 200);
        }
        else{
            

            if($request->has('name'))
            {
                $service->name =$request->name;
            }

            if($request->has('description'))
            {$service->description =$request->description;}

            if($request->has('mode'))
            {$service->mode=$request->mode;}  
           
            if($request->has('price'))
            {
                $service->price=$request->price;
            }
            if($request->has('image'))
            {
                $service->image=$request->image;
            }
            
            $service->save();

         
            $data = [
                'message'=>'Service updated!',
                'service'=>$service,
                'status'=>'200'
            ];
            
            return(
             response()->json($data,200)  
            );
        }
    }

}

 