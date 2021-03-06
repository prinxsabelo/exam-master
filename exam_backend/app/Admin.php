<?php

namespace App;

use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;


class Admin extends Authenticatable implements JWTSubject
{
    //// Rest omitted for brevity

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    use Notifiable;

    protected $guard = 'admin';

    protected $fillable = [
        'lastname', 'firstname', 'email', 'password', 'is_super'
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];
}
