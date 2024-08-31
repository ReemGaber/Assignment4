import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isloading:boolean=false
  errormsg:string=''

  loginform:FormGroup= new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][0-9]{6}/)]),
  })
  constructor(private _AuthService:AuthService , private _Router:Router)
  {
  }
 
  loginSubmit()
  {
    this.isloading=true
    this._AuthService.SendLogin(this.loginform.value).subscribe({

      next:(res)=>{
        this.isloading=false


        //1-Token
        localStorage.setItem('UserToken',res.token)

        //2-In service declare user data variable to carry user token after decode 
        //call this method (userdata)
        this._AuthService.UserData()

        //Navigate to home 
        this._Router.navigate(['home'])

      },
      error:(err)=>{
        this.errormsg=err.error.message
        this.isloading=false

      }
    })
  }

}




