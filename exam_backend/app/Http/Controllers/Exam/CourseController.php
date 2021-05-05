<?php

namespace App\Http\Controllers\Exam;
use App\Course;
use App\Level;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Validator;
class courseController extends Controller
{
    //
    public function __construct(){
        $this->course = new Course;
        $this->level = new Level;
    }

    public function saveCourse(Request $request)
    {
        $validator = Validator::make($request->all(),
        [   'name' => 'required',
            'code' => 'required',
            'level_id' => 'required'
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
                $course;
                //Update Course if ID exists already..
                if(isset($request->id)){
                    $alterCourse = Course::find($request->id);
                    $alterCourse->name = $request->name;
                    $alterCourse->code = $request->code;
                    $alterCourse->level_id = $request->level_id;
                    $alterCourse->save();
                    $course = $alterCourse;
                }   
                //else create new course..
                else{
                    $this->course->name = $request->name;
                    $this->course->code = $request->code;
                    $this->course->level_id = $request->level_id;
                    $this->course->admin_id = $admin->id;
                    $this->course->save();
                    $course = $this->course;
                  
                }
                // Levels required to fetch courses..
                $course= $this->course->join('levels', 'courses.level_id', '=', 'levels.id')
                                    ->select('courses.id', 'courses.name','courses.code', 'levels.level','levels.id as level_id')
                                    ->where('courses.id','=',$course->id)->get();
                return response()->json([
                    "success"=>true,
                    "message"=> $course[0]
                ],200);
            }else{
               return response()->json([
                   "message"=>"Admin not found.."
               ],400);
            }
       
    }
    public function deleteCourse($id)
    {
        $findCourse = Course::find($id);
        if(!$findCourse)
        {
            return response()->json([
                "success" => false,
                "message" => "Course Not Found",
            ],400);
        }
        if($findCourse->delete())
        {
            return response()->json([
                "success"=>true,
                "message"=>"Course deleted successfully.."
            ],200);
        }
    }
    public function getCourses()
    {
                
       
                $courses = $this->course->join('levels', 'courses.level_id', '=', 'levels.id')
                                        ->select('courses.id', 'courses.name','courses.code', 'levels.level')
                                        ->get();
        return response()->json([
            "success"=>true,
            "message"=> $courses
        ],200);
       
    }
}
