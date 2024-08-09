import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule,Validators} from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { subscribe } from 'diagnostics_channel';
import { Router } from '@angular/router';

Router
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  isloading:boolean=false
  errormsg:string=''

  registerform:FormGroup= new FormGroup({

    name:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    email:new FormControl(null,[Validators.required,Validators.email]),
    phone:new FormControl(null,[Validators.required,Validators.pattern(/^(010|011|012)[0-9]{8}$/)]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][0-9]{6}/)]),
    rePassword:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][0-9]{6}/)])
  },this.ConfirmPassword)


  constructor(private _AuthService:AuthService , private _Router:Router)
  {
  }
  ConfirmPassword(p:any)
  {
    if (p.get('password').value === p.get('rePassword').value)
    {
      return null
    }
    else
    {
      return {'passMatched':true}
    }
  }


  RegisterSubmit()
  {
    this.isloading=true
    this._AuthService.SendRegister(this.registerform.value).subscribe({
      next:(res)=>{
        console.log(res)
        this.isloading=false
        this._Router.navigate(['login'])

      },
      error:(err)=>{
        this.errormsg=err.error.message
        this.isloading=false

      }
    })
  }

}
