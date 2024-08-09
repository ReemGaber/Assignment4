import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';


export const authGuardGuard: CanActivateFn = (route, state) => {

  let _auth:AuthService=inject(AuthService)
  let _Router:Router=inject(Router)
  
    if (localStorage.getItem('UserToken')!=null)
      {
        _auth.UserData();
        return true;
      }
      else
      {
        _Router.navigate(['login'])
        return false;
      }
  
};
