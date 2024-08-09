import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Login, Register} from '../interfaces/register'
import { Environment } from '../../Base/Environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //decoded:any=null
  //now make this decoded variable (carry user data)of type behaviour subject
  decoded:BehaviorSubject<any>=new BehaviorSubject(null)

  constructor(private _HttpClient:HttpClient) 
  { 
  }

  SendRegister(data:Register):Observable<any>
  {
    return this._HttpClient.post(`${Environment.baseUrl}/api/v1/auth/signup`,data)
  }

  SendLogin(data:Login):Observable<any>
  {
    return this._HttpClient.post(`${Environment.baseUrl}/api/v1/auth/signin`,data)
  }

  //create fn called userdata this fn carry token and decode(in shared variable)
  UserData()
  {
    //1-gettoken
    //localStorage.getItem('UserToken')
    //2-decode token(using jwt library json web tokens)
     //this.decoded=jwtDecode(JSON.stringify(localStorage.getItem('UserToken')));


     //now use behaviour data use next method to set data
     if(typeof document!="undefined")
     {
      this.decoded.next(jwtDecode(JSON.stringify(localStorage.getItem('UserToken'))));

      console.log(this.decoded.getValue())
    }

     
  }
}
 