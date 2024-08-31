import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Injectable({
  providedIn: 'root'
})
export class MytranslateService {

  constructor(private _TranslateService:TranslateService, @Inject(PLATFORM_ID) private platformId:object) 
  { 

    _TranslateService.setDefaultLang("en")
    if(isPlatformBrowser(platformId))
    {
      this.setlanguage()
    }

  }

  setlanguage()
  {
     //to handle words
     let storedlanguage:string=localStorage.getItem("lang")!
    this._TranslateService.use(storedlanguage)
  
     //to handle design
     if(storedlanguage=="en")
     {
      document.body.dir='ltr'
     }
     else if(storedlanguage=="ar")
     {
      document.body.dir='rtl'
  
     }
  }


  Chnagelang(lang:string)
  {
    localStorage.setItem("lang",lang);

    this.setlanguage();
  }
}
