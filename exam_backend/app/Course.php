<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    //
    protected $guard = 'admin';
    protected $fillable = [
        'name', 'code', 'level_id', 'admin_id'
    ];
}
