<?php


namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Student;
use JWTAuth;
use App\Course;
use App\Result;
use App\ExamTracker;
use App\Question;
use Validator;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Exceptions\JWTException;






class AuthController extends Controller
{
    //
    public function  __construct()
    {
        $this->student = new Student;
    }

    //Getting students here..
    public function getStudents()
    {
        $students = Student::select('students.id','firstname','lastname','email','level_id','level','matric_no')
                                    ->join('levels', 'levels.id','=','students.level_id')->get();
        if($students)
        {
            $result=[];
            //Getting results for each student here..
            foreach ($students as $key => $value) {
                $id = $value->id;
                        $result = Result::select('results.id','results.student_id','results.exam_id','results.score','exams.exam_title','courses.name','courses.code')
                        ->join('exams','results.exam_id','=','exams.id')
                        ->join('courses','exams.course_id','=','courses.id')
                        ->where('student_id','=',$id)
                        ->where('results.finish','=',1)
                        ->get();
                $value->results = $result;
            }

            return response()->json([
                "success"=>true,
                "message" => $students,
            ],200);
        }
    }



    //Saving student here.. Same operation for new student and update student..
    public function saveStudent(Request $request)
    {

        $student;
        //Confirm validation here..
        $validator = Validator::make($request->all(),    [
            'firstname'=>'required|string',
            'lastname' => 'required|string',
            'matric_no' => 'required|string',
            'email' => 'required|email',

        ]);
        if($validator->fails())
        {
            return response()->json([
                "success" => false,
                "message" => $validator->messages()->toArray(),
            ],400);
        }
        //Update happens here..
        if(isset($request->id)){
            $alterStudent = Student::find($request->id);
            $alterStudent->lastname = $request->lastname;
            $alterStudent->firstname = $request->firstname;
            $alterStudent->level_id = $request->level_id;
            $alterStudent->matric_no = $request->matric_no;
            $alterStudent->email = $request->email;
            //To make admin able to make changes too..
            if($request->password){
                $alterStudent->password = Hash::make($request->password);
            }



            if($alterStudent->level_id != $request->level_id)
            {
                $deleteRows = Result::where('student_id','=',$result->id)->delete();
                $courses = Course::leftJoin('exams','exams.course_id','=','courses.id')
                ->where('level_id','=',$request->level_id)
                ->get();
                foreach ($courses as $key => $value)
                {
                    # code...
                    $score = 0;
                    $this->result = new Result;
                    $this->result->exam_id = $value->id;
                    $this->result->student_id = $regComplete->id;
                    $this->result->score = $score;
                    $this->result->save();
                }
            }
            $alterStudent->save();
            $student = $alterStudent;
        }
            //New Student is registered here..
        else{
            $check_email = $this->student->where("email",$request->email)->count();
            if($check_email > 0){
                return response()->json([
                    "success" => false,
                    "message" => "Email exists already..",
                ],400);
            }
            // echo json_encode($request->matric_no);
            $regComplete = $this->student->create([
                'firstname' => $request->firstname,
                'lastname' => $request->lastname,
                'email' => $request->email,
                'level_id' => $request->level_id,
                'matric_no' => $request->matric_no,
                'password' => Hash::make($request->password),
            ]);
            if($regComplete)
            {
                $student = $regComplete;
                $courses = Course::leftJoin('exams','exams.course_id','=','courses.id')
                ->where('level_id','=',$request->level_id)
                ->get();
                foreach ($courses as $key => $value)
                {
                # code...
                $score = 0;
                $this->result = new Result;
                $this->result->exam_id = $value->id;
                $this->result->student_id = $regComplete->id;
                $this->result->score = $score;
                $this->result->save();
                }
            }
        }

        //Update the student courses for either new or existing student..
        $students = Student::select('students.id','firstname','lastname','email','level_id','level','matric_no')
        ->join('levels', 'levels.id','=','students.level_id')->where('students.id','=',$student->id)->get();
        if($students)
        {   
        //Getting results for each student here..
                foreach ($students as $key => $value)
                {
                $id = $value->id;
                $result = Result::select('results.id','results.student_id','results.score','exams.exam_title','courses.name','courses.code')
                ->join('exams','results.exam_id','=','exams.id')
                ->join('courses','exams.course_id','=','courses.id')
                ->where('student_id','=',$id)
                ->get();
                $value->results = $result;
                }

            return response()->json([
            "success"=>true,
            "message" => $students,
            ],200);
        }

    }


    public function loginStudent(Request $request)
    {
       
        $validator = Validator::make($request->only('email','password'), [
            'email' => 'required|string',
            'password' => 'required|string|min:2'
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


        if(!$jwt_token = auth('student')->attempt($input))
        {
            return response()->json([
                'success'=>false,
                'message'=> 'Invalid password/ email'
            ]);
        }
        return response()->json([
            'success'=>true,
            'token'=> $jwt_token
        ],200);
    }

    public function resultDetail(Request $request)
    {
        $student_id = $request->student_id;
        $exam_id = $request->exam_id;
        $student_detail = Student::join('results','results.student_id','=','students.id')
                                    ->join('exams','results.exam_id','exams.id')
                                    ->select('lastname','firstname','score','exams.exam_title','results.id')
                                    ->where('results.student_id','=',$student_id)
                                    ->where('results.exam_id','=',$exam_id)
                                    ->get();
        foreach($student_detail as $key => $studentValue)
        {
            $exam_tracker = ExamTracker::where('student_id','=',$student_id)->where('exam_id','=',$exam_id)->get();
            foreach ($exam_tracker as $key => $value)
            {
                $question_id = $value->question_id;
                $picked_answer = $value->picked_answer;
                $question = Question::find($question_id);
                $value->correct_option = $question->correct_option;
                $value->question = $question->question;
            }
            $studentValue->tracker = $exam_tracker;
        }


        return response()->json([
            "success" => true,
            // "message" => $exam_time_tracker
            "message" => $student_detail
        ],200);
    }

}
