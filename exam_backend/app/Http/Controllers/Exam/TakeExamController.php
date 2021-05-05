<?php

namespace App\Http\Controllers\Exam;
use App\Question;
use App\Exam;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\ExamTracker;
use App\ExamTimeTracker;
use App\Result;
class TakeExamController extends Controller
{
    //
    protected $exam_checker;
    protected $exam_time_tracker;
    public function getStudentExams(Request $request)
    {
       
        $student_token = $request->token;
        $student = auth("student")->authenticate($student_token);
        if($student)
        {
               //Fetch exam... Still yet to include time for begin and end..
                $student_id = $student->id;
                
                $exam = Result::join('students','students.id','=','results.student_id')
                               ->join('courses','courses.level_id','=','students.level_id')
                                ->join('exams','exams.course_id','=','courses.id')
                                ->join('levels','levels.id','=','courses.level_id')
                                // ->join('exams','exams.id','=','results.exam_id')

                                ->leftJoin('exam_time_trackers','exam_time_trackers.student_id','=','results.student_id')
                                
                                ->select('lastname','firstname','exam_title','students.level_id',
                                        'exams.id','exams.instruction',
                                        'students.id as student_id','exams.count_down',
                                        'levels.level',
                                        'results.finish',
                                        'exam_time_trackers.timer'
                                        )->distinct()
                                ->where('results.student_id','=',$student_id)
                                ->where('students.id','=',$student_id)->get();
              
                if($exam->count() > 0)
                {
                    if($exam[0]->timer == null)
                    {
                        $exam[0]->timer = $exam[0]->count_down;
                    }
                    return response()->json([
                        "success" => true,
                        "message" => $exam,
                    ],200);
                }else{
                    return response()->json([
                        "success" => false,
                        "message" => "",
                    ],200);
                }
               
           
               

        }else{
            return response()->json([
                "success" => false,
                "message" => "zzz",
            ],200);
        }
    }



    
    public function startExam(Request $request)
    {
        $student_token = $request->token;
        $student = auth("student")->authenticate($student_token);
        if($student)
        {
            $id = $request->id;
           
            $exam = Exam::find($id);
            if($exam)
            {
                $student_id = $student->id;
                $exam_id = $id;
                //Confirm if student registered for exam here..
                $check_result = Result::where('student_id','=',$student_id)->where('exam_id','=',$exam_id)->count(); 
                if($check_result > 0)
                {
                    //Confirm if exam for student exists already..
                    $count_exam = ExamTracker::where('student_id','=',$student_id)->where('exam_id','=',$exam_id)->count();  
                    if($count_exam == 0){
                       
                        $this->exam_time_tracker = new ExamTimeTracker;
                        $this->exam_time_tracker->timer = $exam->count_down;
                        $this->exam_time_tracker->exam_id = $exam_id;
                        $this->exam_time_tracker->student_id = $student_id;
                        $this->exam_time_tracker->submitted = 'N';
                        $this->exam_time_tracker->save();

                        //Setting the number of visible questions for student here..
                        $questions_display = $exam->questions_display;
                        $questions = Question::select('id','question')
                                ->where('exam_id','=',$id)->limit($questions_display)->inRandomOrder()->distinct()->get();
                        foreach ($questions as $key => $value) 
                        {
                            $question_id = $value->id;
                          
                            
        
        
                            //For easy interpretation for you..
                            $this->exam_checker = new ExamTracker;
                            $this->exam_checker->student_id = $student_id;
                            $this->exam_checker->exam_id = $exam_id;
                            $this->exam_checker->question_id = $question_id;
                            $this->exam_checker->picked_answer= "";
                            $this->exam_checker->save();
                        }
                      
                    }
                 
                    $fetch_questions = ExamTracker::join('questions','exam_trackers.question_id','=','questions.id')
                                                ->select('exam_trackers.id','exam_trackers.question_id','exam_trackers.exam_id','exam_trackers.picked_answer',
                                                            'questions.question','questions.option_a','questions.option_b',
                                                            'questions.option_c','questions.option_d')
                                                ->where('student_id','=',$student_id)->where('exam_trackers.exam_id','=',$exam_id)->get(); 
    
    
                    return response()->json([
                        "success" => true,
                        "exam_questions" => $fetch_questions,
                       
                    ],200);
                    
                }else{
                    return response()->json([
                        "success" => false,
                        "message" => "Registration required..",
                    ],400);
                }
               
               
            }
            
        }
    }
    public function examDetail(Request $request)
    {
        $student_token = $request->token;
        $student = auth("student")->authenticate($student_token);
        if($student)
        {
            $id = $request->id;
            $student_id = $student->id;

            $fetch_details = ExamTimeTracker::join('exams','exams.id','=','exam_time_trackers.exam_id')
            ->select('exams.exam_title','exam_time_trackers.timer')
            ->where('exam_time_trackers.student_id','=',$student_id)
            ->where('exams.id','=',$id)->get();
            return response()->json([
                "success" => true,
                
                "exam_details"=>$fetch_details
            ],200);
        }
    }
    public function markOption(Request $request)
    {
        $alterMark = ExamTracker::find($request->id);
        $alterMark->picked_answer = $request->picked_answer;
        $alterMark->save();
        $fetch_question = ExamTracker::join('questions','exam_trackers.question_id','=','questions.id')
                                    ->select('exam_trackers.id','exam_trackers.question_id','exam_trackers.exam_id','exam_trackers.picked_answer',
                                                'questions.question','questions.option_a','questions.option_b',
                                                'questions.option_c','questions.option_d')
                                    ->where('exam_trackers.id','=',$alterMark->id)->get(); 
        return response()->json([
            "success" => true,
            "message" => $fetch_question[0],
        ],200);
    }
    public function saveTimer(Request $request)
    {
        $exam_id = $request->exam_id;
        $student_id = $request->student_id;
        $alter =  ExamTimeTracker::where('exam_id','=',$exam_id)->where('student_id','=',$student_id)->get();
        $exam_time_tracker = ExamTimeTracker::find($alter[0]->id);
        $exam_time_tracker->submitted = $request->submitted;
        $exam_time_tracker->timer = $request->timer;
        $exam_time_tracker->save();
        $scored=0;
        if($request->submitted == "Y")
        {
            $counter=0;
            // $result = 
            $student_exam = ExamTracker::where('exam_id','=',$exam_id)->where('student_id','=',$student_id)->get();
            foreach ($student_exam as $key => $value) 
            {
                $question_id = $value->question_id;
                $picked_answer = $value->picked_answer;

                $question = Question::find($question_id);
                if($picked_answer == $question->correct_option)
                {
                    ++$counter;
                }
            }
            $exam = Exam::find($exam_id);
            $questions_display = $exam->questions_display;
            // $total_questions = Question::where('exam_id','=',$exam_id)->count();
            $scored = $counter / $questions_display *100;
            $results = Result::where('exam_id','=',$exam_id)->where('student_id','=',$student_id)->get();
            $result = $results[0];
            $result->score = $scored;
            $result->finish = 1;
            $result->save();
            
        }
        return response()->json([
            "success" => true,
            // "message" => $exam_time_tracker
            "message" => $scored
        ],200);
    }
}
