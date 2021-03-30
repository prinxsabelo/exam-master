<?php
namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Validator;
use Illuminate\Http\Request;
use App\Student;
use JWTAuth;
use Session;
use App\Http\Controllers\Student\CloudABISConnectorController;

class loginController extends Controller
{
    private $cloudABISConnector='';
    public function __construct(){
        $this->cloudABISConnector = new CloudABISConnectorController(env('CloudABISAppKey'), env('CloudABISSecretKey'), env('CloudABIS_API_URL'), env('CloudABISCustomerKey'), env('ENGINE_NAME'));

        $token = $this->cloudABISConnector->GetCloudABISToken();
        if ( ! is_null($token) && isset($token->access_token) != "" )
        {
            Session::put('access_token', $token->access_token);
        }
        else
        {
            Session::put('error', 'CloudABIS Not Authorized!. Please check credentails');
        }
    }

    public function verify(Request $request){
        $validator = Validator::make($request->all(),[
            'matric_no'=>'required',
            'templateXML'=>'required'
        ]);
        if($validator->fails()){
            return response()->json([
                "success" => false,
                "message" => $validator->messages()->toArray(),
            ],400);
        }
        $templateXML=$request->templateXML;
        $templateFormat=env('CSTempalteFormat');

        try
        {
            if (Session::get('access_token') != null && Session::get('access_token') != "") {
                $lblMessageText = $this->cloudABISConnector->Verify($templateXML, $request->matric_no, Session::get('access_token'), $templateFormat);
                if($lblMessageText['status']){
                    $user=Student::where('matric_no', $lblMessageText['data']->ID)->first();
                    // $input=[
                    //     'email'=>$user->email,
                    //     'password'=>$user->password
                    // ];  
                    $token=JWTAuth::fromUser($user);
                    return response()->json([
                        "success" => true,
                        'user'=>$user,
                        'token'=>$token,
                        "message" => 'Verification successful',
                    ],200);
                }else{
                    return response()->json([
                        "success" => false,
                        "message" => $lblMessageText['message'],
                    ],200);
                }
                
            } else {
                return response()->json([
                    "success" => false,
                    "message" => "Token not found, check internet connection",
                ],400);
            }

        } catch (Exception $ex) {
            return response()->json([
                "success" => false,
                "message" => $ex,
            ],400);
        }
    }

    public function register(Request $request){
        $validator = Validator::make($request->all(),    [
            'firstname'=>'required|string',
            'lastname' => 'required|string',
            'email' => 'required|email|unique:students',
            'level'=>'required|integer',
            'matric_no'=>'required|unique:students',
            'password'=>'required|string',
            'templateXML'=>'required'
        ]);
        if($validator->fails()){
            return response()->json([
                "success" => false,
                "message" => $validator->messages()->toArray(),
            ],400);
        }
        

        $templateXML=$request->templateXML;
        $templateFormat=env('CSTempalteFormat');
        try
        {
            if (Session::get('access_token') != null && Session::get('access_token') != "") {
            //  $cloudABISConnector = new CloudABISConnectorController(CloudABISAppKey, CloudABISSecretKey, CloudABIS_API_URL, CloudABISCustomerKey, ENGINE_NAME);
                $lblMessageText = $this->cloudABISConnector->Register($templateXML, $request->matric_no, Session::get('access_token'), $templateFormat);
            //      var_dump($lblMessageText);
                // $data=json_decode($lblMessageText);
                if($lblMessageText->original['success']){
                    $student= new Student();
                    $student->firstname=$request->firstname;
                    $student->lastname=$request->lastname;
                    $student->email=$request->email;
                    $student->matric_no=$request->matric_no;
                    $student->level_id=$request->level;
                    $student->password=Hash::make($request->password);
                    $student->save();

                    return response()->json([
                        "success" => $lblMessageText->original['success'],
                        'data'=>$lblMessageText,
                        'token'=>JWTAuth::fromUser($student),
                        "message" => $lblMessageText->original['message'],
                    ],200);
                }
                
                return response()->json([
                    "success" => $lblMessageText->original['success'],
                    'data'=>$lblMessageText,
                    "message" => $lblMessageText->original['message'],
                ],200);
            } else {
                return response()->json([
                    "success" => false,
                    "message" => "Token not found, check internet connection",
                ],400);
            }

        } catch (Exception $ex) {
            return response()->json([
                "success" => false,
                "message" => $ex,
            ],400);
        //          var_dump($ex->Message());
        }
    }

    

    public function test(){
        return response()->json([
            "success" => true,
            "message" => "Student saved successfully..",
        ],200);
    }
}
