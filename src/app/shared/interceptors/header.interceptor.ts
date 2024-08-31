import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {

  if(typeof localStorage !== 'undefined')
    {
      if(localStorage.getItem('UserToken') !== null)
      {
        let userToken : any = {token : localStorage.getItem("UserToken")}
  
    req = req.clone({
      setHeaders  : userToken 
    })
      }
    }

  return next(req);
};
