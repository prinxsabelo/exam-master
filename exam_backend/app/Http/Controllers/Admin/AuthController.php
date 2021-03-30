<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Admin;
use JWTAuth;

use Validator;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Exceptions\JWTException;



class AuthController extends Controller
{
    //
    public function  __construct(){
        $this->admin = new Admin;
    }
    public function registerAdmin(Request $request)
    {
       
        $validator = Validator::make($request->all(),    [
            'firstname'=>'required|string',
            'lastname' => 'required|string',
            'email' => 'required|email',
            'password' => 'required|string'
        ]);
        if($validator->fails())
        {
            return response()->json([
                "success" => false,
                "message" => $validator->messages()->toArray(),
            ],400);
        }
        $check_email = $this->admin->where("email",$request->email)->count();
        if($check_email > 0){
            return response()->json([
                "success" => false,
                "message" => "Email exists already..",
            ],200);
        }
        $regComplete = $this->admin->create([
            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'is_super' => $request->is_super
        ]);
        if($regComplete)
        {
          return $this->loginAdmin($request);
        }
    }



    public function loginAdmin(Request $request)
    {
      
        $validator = Validator::make($request->only('email','password'), [
            'email' => 'required|string',
            'password' => 'required|string'
        ]);
        if($validator->fails())
        { 
            return response()->json([
                "success" => false,
                "message" => $validator->messages()->toArray(),
            ],400);
        }
        $jwt_token = null;
        
        $input = $request->only("email","password");
    
       
        if(!$jwt_token = auth('admin')->attempt($input))
        {
            return response()->json([
                'success'=>false,
                'message'=> 'Invalid Email / Password'
            ]);
        }
        return response()->json([
            'success'=>true,
            'token'=> $jwt_token 
        ],200);
    }

    public function updateAdmin(Request $request,$id)
    {
        $validator = Validator::make($request->all(),    [
            'firstname'=>'required|string',
            'lastname' => 'required|string',
            'email' => 'required|email',
            'password' => 'required|string|min:6'
        ]);
        if($validator->fails())
        {
            return response()->json([
                "success" => false,
                "message" => $validator->messages()->toArray(),
            ],400);
        }
        $alterAdmin = Admin::find($id);
        if($alterAdmin)
        {
            $alterAdmin->lastname = $request->lastname;
            $alterAdmin->firstname = $request->firstname;
            $alterAdmin->email = $request->email;
            $alterAdmin->password = Hash::make($request->password);
            $alterAdmin->is_super = $request->is_super;
            $alterAdmin->save();
            return response()->json([
                "success"=>true,
                "message" => "Admin Updated Successfully..",
            ],200);
        }else{
            return response()->json([
                "success" => false,
                "message" => "Admin Not Found",
            ],400);
        }
    }
}
