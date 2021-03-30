<?php

namespace App\Http\Controllers\Exam;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Question;
use App\Exam;
use Validator;


class QuestionController extends Controller
{
    //
    protected $question;
    public function __construct(){
        $this->question = new Question;
    }   
    public function saveQuestion(Request $request)
    {
        $validator = Validator::make($request->all(),
        [   
            'exam_id' => 'required',
            'question' => 'required'  ,
            'correct_option' => 'required'
        ] );
        if($validator->fails())
        {
            return response()->json([
                "success" => false,
                "message" => $validator->messages()->toArray(),
            ],400);
        } 
        $admin_token = $request->token;
        $admin = auth("admin")->authenticate($admin_token);
        if($admin)
        {
            $question;
               //Update Question if ID exists already..
            if(isset($request->id))
            {
                $alterQuestion = Question::find($request->id);
                $alterQuestion->question = $request->question;
                $alterQuestion->option_a = $request->option_a;
                $alterQuestion->option_b = $request->option_b;
                $alterQuestion->option_c = $request->option_c;
                $alterQuestion->option_d = $request->option_d;

                $alterQuestion->correct_option = $request->correct_option;
                $alterQuestion->save();
                $question = $alterQuestion;
            }
            else{
                $this->question->exam_id = $request->exam_id;
                $this->question->question = $request->question;
                $this->question->option_a = $request->option_a;
                $this->question->option_b = $request->option_b;
                $this->question->option_c = $request->option_c;
                $this->question->option_d = $request->option_d;
             
                $this->question->correct_option = $request->correct_option;
                $this->question->save();
                $question = $this->question;
            }
            
            return response()->json([
                "success"=>true,
                "message"=> $question
            ],200);
        }
    }
    public function createQuestion(Request $request)
    {
        $validator = Validator::make($request->all(),
        [   
            'exam_id' => 'required',
            'question' => 'required'  ,
            'correct_option' => 'required'
        ] );
        if($validator->fails())
        {
            return response()->json([
                "success" => false,
                "message" => $validator->messages()->toArray(),
            ],400);
        } 
        $admin_token = $request->token;
        $admin = auth("admin")->authenticate($admin_token);
        if($admin)
        {
            $this->question->exam_id = $request->exam_id;
            $this->question->question = $request->question;

            $this->question->option_a = $request->option_a;
            $this->question->option_b = $request->option_b;
            $this->question->option_c = $request->option_c;
            $this->question->option_d = $request->option_d;
            $this->question->option_e = $request->option_e;
            $this->question->correct_option = $request->correct_option;
            $this->question->save();
            return response()->json([
                "success"=>true,
                "message"=>"Question created successfully.."
            ],200);
        }else{
            return response()->json([
                "success"=>true,
                "message"=>"Admin not found.."
            ],400);
        }

    }
    public function updateQuestion(Request $request,$id)
    {
        $validator = Validator::make($request->all(),
        [   
            'exam_id' => 'required',
            'question' => 'required'  ,
            'correct_option' => 'required'
        ] );
        if($validator->fails())
        {
            return response()->json([
                "success" => false,
                "message" => $validator->messages()->toArray(),
            ],400);
        } 
        $admin_token = $request->token;
        $admin = auth("admin")->authenticate($admin_token);
        if($admin)
        {
            $alterQuestion = Question::find($id);
            $alterQuestion->question = $request->question;
            $alterQuestion->option_a = $request->option_a;
            $alterQuestion->option_b = $request->option_b;
            $alterQuestion->option_c = $request->option_c;
            $alterQuestion->option_d = $request->option_d;
            $alterQuestion->option_e = $request->option_e;
            $alterQuestion->correct_option = $request->correct_option;
            $alterQuestion->save();
            return response()->json([
                "success"=>true,
                "message"=>"Question updated successfully.."
            ],200);
        }
    }
    public function getQuestions(Request $request)
    {
        $admin_token = $request->token;
        // echo json_encode($admin_token);
        $admin = auth("admin")->authenticate($admin_token);
        if($admin)
        {
            $exam_id = $request->exam_id;
            $getQuestions=[];
        
            $getQuestions = Question::where('exam_id','=',$exam_id)->get();
            if($getQuestions->count() == 0){
                $getQuestions= array(
                    "title" => "hello",
                    "description" => "test test test"
                  );
                //To avoid keeps hitting db..
                return response()->json([
                    "success"=>true,
                    "x"=> $getQuestions
                ],200);
            }else{
                return response()->json([
                    "success"=>true,
                    "message"=> $getQuestions
                ],200);
            }
          
        }else{
            echo json_encode("err");
        }
    }
    public function deleteQuestion($id)
    {
        $findQuestion = Question::find($id);
        if(!$findQuestion)
        {
            return response()->json([
                "success" => false,
                "message" => "Question Not Found",
            ],400);
        }
        if($findQuestion->delete())
        {
            return response()->json([
                "success"=>true,
                "message"=>"Question deleted successfully.."
            ],200);
        }
    }
}
