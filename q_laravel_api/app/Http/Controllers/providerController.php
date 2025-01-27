<?php

namespace App\Http\Controllers;
use App\Models\Provider;
use App\Models\Appointment;
use App\Models\Service;

use Illuminate\Http\Request; 
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Storage;

use function Laravel\Prompts\password;
use function Laravel\Prompts\select;
use function Laravel\Prompts\table;
// use Intervention\Image\Laravel\Facades\Image;
use Illuminate\Support\Facades\Hash;


class providerController extends Controller
{
  
    public function index(){
        $provider=Provider::all();
        // return response()->json($provider);  
        if (!$provider) {
            $data = [
                'message'=>'There is no provider available',
                'status'=>'400'
            ];
            return response()->json($data, 200);
        }
        else{
            $data = [

                'provider'=>$provider,
                'status'=>'200'
            ];
            return(
             response()->json($data,200)  
            );
        }
    }
    public function store(Request $request){
                     $validator =  Validator::make($request->all(), [
                           'email'=>'required|unique:provider',
                    //     'password'=>'required|confirmed',
                    //     // 'name'=>'nullable|max:255',
                    //     // 'description'=>'string|nullable',
                    //     // 'location'=>'required|nullable',
                    //     // 'rating'=>'nullable|integer|max:5',
                    //     // 'image' => 'nullable|image|max:2048|nullable' 
                     ]);
                    // if($validator){ 
                        if($validator->fails()){ 
                            $data = [
                                'message'=>'validation error!', $request->all()
                                ,
                                'status'=>'400'
                            ] ;
                            return(response()->json($data , 400));
                        }
                    
                    $provider=Provider::create([
                        'name'          => '',
                        'email'         => $request->email,
                        'password'      => Hash::make($request->password),
                        
                        'rating'        => 0,
                        'description'   => '',
                        'location'      => '' ,
                        'image'         => $request->image,
                        'phone'         => $request->phone
                        
                        //'description'   => $request->description ,
                        //'location'      => $request->location ,
                        //'image'         => $request->image ,
                                                
                    ]);
                 

                if(!$provider){
                    $data = [
                        'message'=>'creation error!',
                        'status'=>'500'
                    ] ;
                    return(response()->json($data , 500));
                 }
                 else{
                     $token = $provider->createToken($request->email); 
                     $data = [
                    
                        'provider'=>$provider,
                        'token'=>$token->plainTextToken,
                        'status'=>'200'
                    ];
                } 
                
               
                return(
                    response()->json($data,200)  
                );

                //storageSaved
                // $validated = $request ->validate([
                //     'name'=>'required',
                //     'description'=>'required',
                //     'location'=>'required',
                //     'email'=>'required|unique:provider',
                //     'password'=>'required',
                //     'rating'=>'integer|max:5',
                //     'image' => 'required|image|max:2048' // Validation rules
                // ]) ;
                  
                //$imageData = base64_encode(file_get_contents($request->image->getRealPath()));
            
             
            }
    public function show($id){
        $provider = Provider::find($id);
        
        if (!$provider) {
            $data = [
                'message'=>'Provider not found',
                'status'=>'400'
            ];
            return response()->json($data, 200);
        }
        else{
            $provider->password = "";   
            $data = [

                'provider'=>$provider,
                'status'=>'200'
            ];
            return(
                response()->json($data,200)  
            );
        }
    }
    public function showServices($id){
       
        $services = DB::table('service')->where('provider_id', $id)->get();
       
        if (!$services) {
            $data = [
                'message'=>'Service from this Provider not found',
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
    public function showAppointments($id){
       
        $appointments = DB::table('appointment')->where('provider_id', $id)->get();
        
        if (!$appointments) {
            $data = [
                'message'=>'Appointments from this Provider not found',
                'status'=>'400'
            ];
            return response()->json($data, 200);
        }
        else{
            $data = [

                'appointments'=>$appointments,
                'status'=>'200'
            ];
            return(
                response()->json($data,200)  
            );
        }
    }
    public function Destroy($id){
            $provider = Provider::find($id);
            
            if (!$provider) {
                $data = [
                    'message'=>'Provider not found',
                    'status'=>'400'
                ];
                return response()->json($data, 200);
            }
            else{
                $provider->delete();
                $data = [
                    'message'=>'Provider Deleted',
                    'status'=>'200'
                ];
                return(
                 response()->json($data,200)  
                );
            }
        }
    public function update($id, Request $request){
            $provider = Provider::find($id);
            // $validator =  Validator::make($request->all(), [
            //     'name'=>'required',
            //     'description'=>'required',
            //     'location'=>'required',
            //     'email'=>'required|unique:provider',
            //     'password'=>'required',
            //     'rating'=>'integer|max:5',
            //     'image' => 'required|image|max:2048' // Validation rules

            //     ]);
            echo $request->has('rating');

            if (!$provider ) {
                $data = [
                    'message'=>'Provider not found',
                    'status'=>'400'
                ];
                return response()->json($data, 200);
            }
            else{
                
                if($request->has('name'))
                {$provider->name =$request->name;}
    
                if($request->has('location'))
                {$provider->location =$request->location;}
    
                if($request->has('description'))
                {$provider->description =$request->description;}
    
                if($request->has('rating'))
                {$provider->rating=$request->rating;}
                
                if($request->has('image'))
                {   
                 //   $imageData = base64_encode(file_get_contents($request->image->getRealPath()));
                    $provider->image=$request->image;
                }
    
                if($request->has('phone'))
                {$provider->phone =$request->phone;}
    
                $provider->save();
    
                $data = [
                    'message'=>'Provider updated!',
                    'provider'=>$provider,
                    'status'=>'200'
                ];
                
                return(
                 response()->json($data,200)  
                );
            }
        }
}
 