<?php

namespace App\Http\Controllers\Exam;
use App\Exam;
use App\Course;
use App\Level;
use App\Question;
use App\Student;
use App\Result;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Validator;

class ExamController extends Controller
{
    //d
    protected $exam;
    protected $question;

    protected $result;
    public function __construct(){
        $this->exam = new Exam;

    }

    public function createExam(Request $request)
    {
        $validator = Validator::make($request->all(),
        [   'exam_title' => 'required'  ,
            'instruction' => 'required',
            'count_down' => 'required',
            'course_id' => 'required',
            'begin_date' => 'required',
            'end_date' => 'required'
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
            $this->exam->course_id = $request->course_id;
            $this->exam->exam_title = $request->exam_title;
            $this->exam->instruction = $request->instruction;
            $this->exam->count_down = $request->count_down;
            $this->exam->admin_id = $admin->id;
            $this->exam->begin_date = $request->begin_date;
            $this->exam->end_date = $request->end_date;
            $this->exam->save();
          
            $score = 0;
            $level = Course::where('id','=',$this->exam->course_id)->get('level_id');
            $student = Student::where('level_id','=',$level[0]->level_id)->get();
            foreach ($student as $key => $value) {
                # code...
                $this->result= new Result;
                $this->result->student_id = $value->id;
                $this->result->exam_id = $this->exam->id;
                $this->result->score = $score;
                $this->result->save();
                
            }
          
            return response()->json([
                "success"=>true,
                "message"=>"Exam created successfully..",
            ],200);
        }else{
            return response()->json([
                "success"=>true,
                "message"=>"Admin not found.."
            ],400);
        }
     
       
    }
    public function updateExam(Request $request,$id)
    {
        $validator = Validator::make($request->all(),
        [   'exam_title' => 'required'  ,
            'instruction' => 'required',
            'count_down' => 'required',
            'questions_display' => 'required',
            'course_id' => 'required',
            'begin_date' => 'required',
            'end_date' => 'required',
        
        ] );
        if($validator->fails())
        {
            return response()->json([
                "success" => false,
                "message" => $validator->messages()->toArray(),
            ],400);
        } 
        $alterExam = Exam::find($id);
        $alterExam->course_id = $request->course_id;
        $alterExam->exam_title = $request->exam_title;
        $alterExam->instruction = $request->instruction;
        $alterExam->count_down = $request->count_down;
        $alterExam->questions_display = $request->questions_display;
        $alterExam->begin_date = $request->begin_date;
        $alterExam->end_date = $request->end_date;
        $alterExam->save();
        return response()->json([
            "success"=>true,
            "message"=>"Exam updated successfully.."
        ],200);
    }
    public function saveExam(Request $request)
    {
        $validator = Validator::make($request->all(),
        [   'exam_title' => 'required'  ,
            'instruction' => 'required',
            'count_down' => 'required',
            'questions_display' => 'required',
            'course_id' => 'required',
            'begin_date' => 'required',
            'end_date' => 'required'
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
                $exam;
                 //Update Exam if ID exists already..
                 if(isset($request->id)){
                    $alterExam = Exam::find($request->id);
                    $alterExam->course_id = $request->course_id;
                    $alterExam->exam_title = $request->exam_title;
                    $alterExam->instruction = $request->instruction;
                    $alterExam->count_down = $request->count_down;
                    $alterExam->questions_display = $request->questions_display;
                    $alterExam->begin_date = $request->begin_date;
                    $alterExam->end_date = $request->end_date;
                    $alterExam->save();
                    $exam = $alterExam;
                 }else{
                    $this->exam->course_id = $request->course_id;
                    $this->exam->exam_title = $request->exam_title;
                    $this->exam->instruction = $request->instruction;
                    $this->exam->count_down = $request->count_down;
                    $this->exam->questions_display = $request->questions_display;
                    $this->exam->admin_id = $admin->id;
                    $this->exam->begin_date = $request->begin_date;
                    $this->exam->end_date = $request->end_date;
                    $this->exam->save();


                        $score = 0;
                        $level = Course::where('id','=',$this->exam->course_id)->get('level_id');
                        $student = Student::where('level_id','=',$level[0]->level_id)->get();
                        foreach ($student as $key => $value) {
                            # code...
                            $this->result= new Result;
                            $this->result->student_id = $value->id;
                            $this->result->exam_id = $this->exam->id;
                            $this->result->score = $score;
                            $this->result->save();
                            
                        }
                    
                    $exam = $this->exam;
                   
                 }
                 $exam_id = $exam->id;
                 $exam =    $this->exam->leftJoin('courses', 'exams.course_id', '=', 'courses.id')->join('levels','courses.level_id','=','levels.id')
                 ->select('exams.id','courses.id as course_id','exams.exam_title','courses.name','courses.code','levels.level',
                             'exams.instruction','exams.count_down','exams.questions_display','exams.begin_date','exams.end_date')
                 ->where('exams.id','=',$exam_id)
                 // ->select('*')
                 ->get();
                  //Count Exam Questions and then initialize here..
                  $questions_count =0;
                  $questions_count = Question::where('exam_id','=',$exam_id)->count();
                  $exam[0]->questions_count = $questions_count;
                 return response()->json([
                    "success"=>true,
                    "message"=> $exam[0]
                ],200);
            }
    }
    public function deleteExam($id)
    {
        $findExam = Exam::find($id);
        if(!$findExam)
        {
            return response()->json([
                "success" => false,
                "message" => "Exam Not Found",
            ],400);
        }
        if($findExam->delete())
        {
            return response()->json([
                "success"=>true,
                "message"=>"Exam deleted successfully.."
            ],200);
        }
    }
    public function getExams(Request $request)
    {
        // $admin_token = $request->token;
        // $admin = auth("admin")->authenticate($admin_token);
        
        // if($admin)
        // {   
        
            $arr=[];


            $exams =    $this->exam->leftJoin('courses', 'exams.course_id', '=', 'courses.id')->join('levels','courses.level_id','=','levels.id')
                                    ->select('exams.id','courses.id as course_id','exams.exam_title','courses.name','courses.code','levels.level',
                                                'exams.instruction','exams.count_down','exams.questions_display','exams.begin_date','exams.end_date')
                                    // ->where('exams.admin_id','=',$admin->id)
                                    // ->select('*')
                                    ->get();
        
            foreach ($exams as $key => $value) {
                # code...
                $exam_id = $value->id;
                $questions_count =0;
                $questions_count = Question::where('exam_id','=',$exam_id)->count();
                $questions = Question::where('exam_id','=',$exam_id)->get();
                $value->questions_count = $questions_count;
               
                $arr[] = $value;
            }
        
            return response()->json([
                "success"=>true,
                "message"=> $arr
            ],200);
        // }else{
        //     return response()->json([
        //         "message"=>"Admin not found.."
        //     ],400);
        //  }
        
    }
}
