import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { MytranslateService } from '../../../shared/services/Translation/mytranslate.service';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,TranslateModule,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  islogin:boolean=false

  constructor(private _auth:AuthService,private _Router:Router,private _MytranslateService:MytranslateService)
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

  Chnagelang(lang:string)
  {
    this._MytranslateService.Chnagelang(lang)
  }
}
