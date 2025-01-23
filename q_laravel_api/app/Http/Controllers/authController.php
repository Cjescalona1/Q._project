<?php

namespace App\Http\Controllers;

use App\Models\Consumer;
use App\Models\Provider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class authController extends Controller
{

    // public function regP(Request $request){
    //     $validator = $request->validate(
    //         [ 
    //             'name'=>'nullable|string',
    //             'email'=>'required|email|unique:provider',
    //             'password'=>'required|confirmed',
    //             'description'=>'string|nullable',
    //             'location'=>'required|nullable',
    //             'rating'=>'integer|max:5',
    //             'image' => 'image|max:2048|nullable' 
    //     ]); 
       
    //     $prov = Provider::create($validator);
    //     $token = $prov->createToken($request->name); 

    //     $prov=Provider::create([
    //         'email'         => $request->email,
    //         'password'      => Hash::make($request->password),
    //     ]);
    //     $provider=Provider::create([
    //         'name'          => '',
    //         'email'         => $request->email,
    //         'password'      => Hash::make($request->password),
            
    //         'rating'        => 0,
    //         'description'   => '',
    //         'location'      => '' ,
    //         'image'         => '' ,
    //         'phone'         => ''
    //         //'description'   => $request->description ,
    //         //'location'      => $request->location ,
    //         //'image'         => $request->image ,
    //         //'phone'         => $request->phone
                                    
    //     ]);


    //     return [
    //         'provider'=>$prov,
    //         'token'=>$token->plainTextToken 
    //     ];
    // }

    public function regP(Request $request){
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
           'name'          => $request->name ,
           'email'         => $request->email,
           'password'      => Hash::make($request->password),
           
           'rating'        => 0,
           'description'   => '',
           'location'      => '' ,
           'image'         => $request->image ,
           'phone'         => ''
           //'description'   => $request->description ,
           //'location'      => $request->location ,
           //'image'         => $request->image ,
           //'phone'         => $request->phone
                                   
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



    //
    public function registerProvider(Request $request){
       
        // $request->description = '';
        // $request->location = '';
        // $request->rating = 0;
        // $request->image = '';
        // $request->phone = '';

        $validator = $request->validate(
            [ 
               // 'name'=>'nullable|max:255',
                'email'=>'required|email|unique:provider',
                'password'=>'required|confirmed',
                // 'description'=>'string|nullable',
                // 'location'=>'required|nullable',
                'rating'=>'integer|max:5',
                // 'image' => 'image|max:2048|nullable' 
            
        ]);

        $prov = Provider::create($validator);
        $token = $prov->createToken($request->name); 
        // if($validator){
        //     $prov=Provider::create([
        //         // 'name'          => $request->name,
        //         'name'          => '',
        //         'email'         => $request->email,
        //         'password'      => Hash::make($request->password),
                
        //         'rating'        => 0,
        //         'description'   => '',
        //         'location'      => '' ,
        //         'image'         => '' ,
        //         'phone'         => ''
        //         //'description'   => $request->description ,
        //         //'location'      => $request->location ,
        //         //'image'         => $request->image ,
        //         //'phone'         => $request->phone
                                        
        //     ]);
        //     $token = $prov->createToken($request->name); 
        // }
  
        
        return [
            'provider'=>$prov,
            'token'=>$token->plainTextToken 
        ];
    }

    public function loginProvider(Request $request){
        $request->validate([
            'email'=>'required|email|exists:provider',
            'password'=>'required'
        ]);

        $prov =  Provider::where('email', $request->email)->first();  
        
        if( !$prov ||  !Hash::check($request->password, $prov->password )){ 
               
                return [
                    'message'=>' Credentials incorrect!'
                ]; 
        }
        $token = $prov->createToken($prov->name);
        return [
            'provider'=>$prov,
            'token'=>$token->plainTextToken
        ];
    
    }

    public function registerConsumer(Request $request){
       
        // $request->description = '';
        // $request->location = '';
        // $request->rating = 0;
        // $request->image = '';
        // $request->phone = '';

        $validator = $request->validate(
            [ 
                'name'=>'required',
                'email'=>'required|email|unique:consumer',
                'password'=>'required|confirmed',
        ]);

        if($validator){
            $consumer=Consumer::create([
                'name'          => $request->name,
                'email'         => $request->email,
                'password'      => Hash::make($request->password),
                'description'   => '',
                'location'      => '' ,
                
                //'description'   => $request->description ,
                //'location'      => $request->location ,
                //'image'         => $request->image ,
                //'phone'         => $request->phone
                                        
            ]);
            $token = $consumer->createToken($request->name); 
        }
        return [
            'consumer'=>$consumer,
            'token'=>$token->plainTextToken
            
        ];
    }


    
    public function loginConsumer(Request $request){
        $request->validate([
            'email'=>'required|email|exists:consumer',
            'password'=>'required'
        ]);

        $cons =  Consumer::where('email', $request->email)->first();  
        
        if( !$cons ||  !Hash::check($request->password, $cons->password )){ 
               
                return [
                    'message'=>' Credentials incorrect!'
                ]; 
        }
        $token = $cons->createToken($cons->name);
        return [
            'Consumer'=>$cons,
            'token'=>$token->plainTextToken
        ];
    
    }

    public function logout(Request $request){
        $request->user()->tokens()->delete();

        return [
            'message'=>'User logged out correctly!'
        ]; 
    }
}
