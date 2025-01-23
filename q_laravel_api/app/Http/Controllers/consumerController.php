<?php

namespace App\Http\Controllers;
use App\Models\Consumer;
use Illuminate\Http\Request; 
use Illuminate\Support\Facades\Validator;
class consumerController extends Controller
{
    public function index(){
        $consumer=Consumer::all();
        // return response()->json($consumer);  
        if (!$consumer) {
            $data = [
                'message'=>'There is no consumer available',
                'status'=>'400'
            ];
            return response()->json($data, 200);
        }
        else{
            $data = [

                'consumer'=>$consumer,
                'status'=>'200'
            ];
            return(
             response()->json($data,200)  
            );
        }
    }
    public function store(Request $request){
                    $validator =  Validator::make($request->all(), [
                    'name'=>'required|string',
                    'description'=>'',
                    'location'=>'',
                    'email'=>'required|email|unique:consumer',
                    'password'=>'required',
                    'phone'=>'string',
                    'image'=>'longtext'
                    ]);
                if($validator->fails()){
                    $data = [
                        'message'=>'validation error!', $request->all()
                        ,
                        'status'=>'400'
                    ] ;
                    return(response()->json($data , 400));
                }
                
                    $consumer=Consumer::create([
                        'name'          => $request->name,
                        'description'   => $request->description ,
                        'location'      => $request->location,
                        'email'         => $request->email,
                        'password'      => $request->password,
                        'phone'         => $request->phone,
                        'image'         => $request->image,
                        
                    ]);
                if(!$consumer){
                    $data = [
                        'message'=>'creation error!',
                        'status'=>'500'
                    ] ;
                    return(response()->json($data , 500));
                 };
                $data = [
                    'consumer'=>$consumer,
                    'status'=>200
                ];
                return(response()->json($data,200));
             
            }
    public function show($id){
        $consumer = Consumer::find($id);
        
        if (!$consumer) {
            $data = [
                'message'=>'Consumer not found',
                'status'=>'400'
            ];
            return response()->json($data, 200);
        }
        else{
            $data = [

                'consumer'=>$consumer,
                'status'=>'200'
            ];
            return(
                response()->json($data,200)  
            );
        }
    }
    public function Destroy($id){
            $consumer = Consumer::find($id);
            
            if (!$consumer) {
                $data = [
                    'message'=>'Consumer not found',
                    'status'=>'400'
                ];
                return response()->json($data, 200);
            }
            else{
                $consumer->delete();
                $data = [
                    'message'=>'Consumer Deleted',
                    'status'=>'200'
                ];
                return(
                 response()->json($data,200)  
                );
            }
        }
    public function update($id, Request $request){
            $consumer = Consumer::find($id);
            echo $request;

            if (!$consumer) {
                $data = [
                    'message'=>'Consumer not found',
                    'status'=>'400'
                ];
                return response()->json($data, 200);
            }
            else{
                
                if($request->has('name'))
                {$consumer->name =$request->name;}
    
                if($request->has('location'))
                {$consumer->start =$request->start;}
    
                if($request->has('description'))
                {$consumer->description =$request->description;}
                
                if($request->has('image'))
                {$consumer->image =$request->image;}  
                
                if($request->has('phone'))
                {$consumer->phone =$request->phone;}
    
                $consumer->save();
    
                $data = [
                    'message'=>'Consumer updated!',
                    'consumer'=>$consumer,
                    'status'=>'200'
                ];
                
                return(
                 response()->json($data,200)  
                );
            }
        }
}
 