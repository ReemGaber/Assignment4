import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { subscribe } from 'diagnostics_channel';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.css'
})
export class ForgetpasswordComponent {
  errormsg:string="";
  isloading:boolean=false;

  iscodeform:boolean=false;
  isnewpassword:boolean=false;

  constructor(private _Authservice:AuthService, private _Router:Router){}

  EmailForm: FormGroup=new FormGroup({

    email:new FormControl(null,[Validators.required,Validators.email])
  })

  CodeForm: FormGroup=new FormGroup({

    resetCode:new FormControl(null,[Validators.required])
  })

  ResetForm: FormGroup=new FormGroup({

    email:new FormControl(null,[Validators.required,Validators.email]),
    newPassword:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z][0-9]{6}/)]),
  })

  emailSubmit()
  {
    this.isloading=true
    this._Authservice.SendEmailVerify(this.EmailForm.value).subscribe({
      next:(res)=>{
        if(res.status=="success")
        {
          this.iscodeform=true;
          this.isloading=false

        }
      },
      error:(err)=>{
      },
    })
  }

  sendcode()
  {
    this.isloading=true
    this._Authservice.sendCodeverify(this.CodeForm.value).subscribe({
      next:(res)=>{
        if(res.status=="success")
        {
          this.iscodeform=false;
          this.isnewpassword=true;
          this.isloading=false

        }
      },
      error:(err)=>{
      },
    })
    
  }

  setnewpassword()
  {
    this.isloading=true;
    this._Authservice.ResetPassword(this.ResetForm.value).subscribe({
      next:(res)=>
      {
        //token,app,refresh
        localStorage.setItem("UserToken",res.token)

        //call userdata method
        this._Authservice.UserData()

        //navigate
        this._Router.navigate(['home'])
        this.isloading=false;


      }
    })
  }



}
