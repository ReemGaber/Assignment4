import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  islogin:boolean=false

  constructor(private _auth:AuthService,private _Router:Router)
  {
  }

  ngOnInit(): void {
    this._auth.decoded.subscribe(()=>{
      if(this._auth.decoded.getValue()==null)
      {
        this.islogin=false
      }
      else
      {
        this.islogin=true 
      }
    })
  }
  Logout()
  {
    if(typeof document!="undefined")
    {
      localStorage.removeItem('UserToken');
      this._auth.decoded.next(null);
      this._Router.navigate(['/login']);
    }
    
  }

}
