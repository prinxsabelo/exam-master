<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Exam extends Model
{
    //
    protected $guard = 'admin';
    protected $fillable = [
        'exam_title', 'instruction','course_id','admin_id', 'begin_date', 'end_date'
    ];
}
