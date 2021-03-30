<?php

namespace App\Http\Controllers\Exam;
use App\Level;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Validator;
class LevelController extends Controller
{
    //
    protected $level;
    public function __construct()
    {
        $this->level = new Level;
    }

    public function saveLevel(Request $request){
        $validator = Validator::make($request->all(),
        [ 'level' => 'required'  ] );
        if($validator->fails())
        {
            return response()->json([
                "success" => false,
                "message" => $validator->messages()->toArray(),
            ],400);
        } 
        //Update Level if ID exists already..
        if(isset($request->id)){
            $alterLevel = Level::find($request->id);
            $alterLevel->level = $request->level;
            $alterLevel->save();
            return response()->json([
                "success"=>true,
                "message"=> $alterLevel
            ],200);
        }  //Save new Level..
        else{
          
            $this->level->level = $request->level;
            $this->level->save();
            return response()->json([
                "success"=>true,
                "message"=>$this->level
            ],200);
        }
    }
    public function deleteLevel($id)
    {
        $findLevel = Level::find($id);
        if(!$findLevel)
        {
            return response()->json([
                "success" => false,
                "message" => "Level Not Found",
            ],400);
        }
        if($findLevel->delete())
        {
            return response()->json([
                "success"=>true,
                "message"=>"level deleted successfully.."
            ],200);
        }
    }
    public function getLevels()
    {
        $levels = Level::orderBy('level')->get();
        return response()->json([
            "success"=>true,
            "message"=> $levels
        ],200);
    }
    
}
