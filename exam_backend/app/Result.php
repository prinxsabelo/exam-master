<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Result extends Model
{
    //
    protected $fillable = [
        'student_id','score','exam_id','finish'
    ];
}
