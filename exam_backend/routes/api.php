<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::group([
    'prefix'=>'admin',
    'namespace' => 'Admin'

],
    function()
    {
        Route::post('register', 'AuthController@registerAdmin');
        Route::post('login', 'AuthController@loginAdmin');
        Route::put('update/{id}', 'AuthController@updateAdmin');
    }
);

Route::group([
    'prefix'=>'student',
    'namespace' => 'Student'
],
    function()
    {
        Route::post('save-student','AuthController@saveStudent');

        Route::post('login', 'AuthController@loginStudent');

        Route::get('get-students','AuthController@getStudents');
        Route::post('result-detail', 'AuthController@resultDetail');

        Route::post('register', 'loginController@register');
        Route::post('verify', 'loginController@verify');
        Route::post('test', 'loginController@test');
    }
);
Route::group([
    'prefix'=> 'exam',
    'namespace' => 'Exam'
],
    function()
    {
        Route::post('get-student-exams', "TakeExamController@getStudentExams");


        Route::post('save-level',"LevelController@saveLevel");

        Route::post('delete-level/{id}','LevelController@deleteLevel');
        Route::get('get-levels',"LevelController@getLevels");

        Route::post('save-course',"CourseController@saveCourse");



        Route::post('create-course', "CourseController@createCourse");


        Route::put('update-course/{id}', "CourseController@updateCourse");
        Route::post('delete-course/{id}', "CourseController@deleteCourse");
        Route::get('get-courses',"CourseController@getCourses");

        Route::post('save-exam','ExamController@saveExam');

        Route::post('create-exam', "ExamController@createExam");
        Route::put('update-exam/{id}', "ExamController@updateExam");
        Route::post('delete-exam/{id}', "ExamController@deleteExam");
        Route::post('get-exams', "ExamController@getExams");
        Route::post('create-question', "QuestionController@createQuestion");
        Route::put('update-question/{id}', "QuestionController@updateQuestion");
        Route::post('get-questions', "QuestionController@getQuestions");
        Route::post('save-question',"QuestionController@saveQuestion");
        Route::post('delete-question',"QuestionController@deleteQuestion");
        Route::post('delete-question/{id}', "QuestionController@deleteQuestion");



        Route::post('start-exam',"TakeExamController@startExam");
        Route::post('exam-detail',"TakeExamController@examDetail");
        Route::post('mark-option',"TakeExamController@markOption");
        Route::post('save-timer',"TakeExamController@saveTimer");


    }

);
