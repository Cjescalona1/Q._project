<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;



// 'title',
// 'start',
// 'end',
// 'status',
// 'rating',
// 'service_id',
// 'consumer_id',
class appointmentController extends Controller
{
    public function index(){
        $appointment=Appointment::all();
        // return response()->json($appointment);  
        if (!$appointment) {
            $data = [
                'message'=>'There is no appointment available',
                'status'=>'400'
            ];
            return response()->json($data, 200);
        }
        else{
            $data = [

                'appointments'=>$appointment,
                'status'=>'200'
            ];
            return(
             response()->json($data,200)  
            );
        }
    }
    public function show($id){
        $appointment = Appointment::find($id);
        
        if (!$appointment) {
            $data = [
                'message'=>'Service not found',
                'status'=>'400'
            ];
            return response()->json($data, 200);
        }
        else{
            $data = [

                'appointment'=>$appointment,
                'status'=>'200'
            ];
            return(
                response()->json($data,200)  
            );
        }
    }
    public function Destroy($id){
        $appointment = Appointment::find($id);
        
        if (!$appointment) {
            $data = [
                'message'=>'Appointment not found',
                'status'=>'400'
            ];
            return response()->json($data, 200);
        }
        else{
            $appointment->delete();
            $data = [
                'message'=>'Appointment Deleted',
                'status'=>'200'
            ];
            return(
             response()->json($data,200)  
            );
        }
    }
    public function store(Request $request){
        $validator =  Validator::make($request->all(), [
        'title'=>'required',
        'start'=>'required',
        'end'=>'required',
        //'status'=>'required',
        //'rating'=>'required',
        'service_id'=>'required',
        'consumer_id'=>'required',
    ]);
    if($validator->fails()){
        $data = [
            'message'=>'validation error!', $request->all()
            ,
            'status'=>'400'
        ] ;
        return(response()->json($data , 400));
    }
    
    $appointment=Appointment::create([
            'title'         => $request->title,
            'start'         => $request->start,
            'end'           => $request->end,
            'service_id'    => $request->service_id,
            'consumer_id'   => $request->consumer_id,
            'provider_id'   => $request->provider_id,
            'status'        => 0,
            'rating'        => 0,
        ]);
    if(!$appointment){
        $data = [
            'message'=>'creation error!',
            'status'=>'500'
        ] ;
        return(response()->json($data , 500));
     };
    $data = [
        'appointment'=>$appointment,
        'status'=>200
    ];
    return(response()->json($data,200));
    }

    public function update($id, Request $request){
        $appointment = Appointment::find($id);
      
        if (!$appointment ) {
            $data = [
                'message'=>'Service not found',
                'status'=>'400'
            ];
            return response()->json($data, 200);
        }
        else{
            
            if($request->has('title'))
            {$appointment->title =$request->title;}

            if($request->has('start'))
            {$appointment->start =$request->start;}

            if($request->has('end'))
            {$appointment->end=$request->end;}  

            if($request->has('status'))
            {$appointment->status=$request->status;}

            if($request->has('rating'))
            {$appointment->rating=$request->rating;}
         
            $appointment->save();

            $data = [
                'message'=>'Appointment updated!',
                'appointment'=>$appointment,
                'status'=>'200'
            ];
            
            return(
             response()->json($data,200)  
            );
        }
    }

   
    
}

 
   
  
  
 