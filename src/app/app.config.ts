import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { headerInterceptor } from './shared/interceptors/header.interceptor';
import { errorInterceptor } from './shared/interceptors/error.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { spinnerLoadingInterceptor } from './shared/interceptors/spinner-loading.interceptor';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';


function HttpLoad(http:HttpClient)
{
  return new TranslateHttpLoader(http, './assets/i18n/' , '.json')
}

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withFetch(),withInterceptors([headerInterceptor,errorInterceptor,spinnerLoadingInterceptor])),provideAnimations(),  provideToastr(),provideRouter(routes), provideClientHydration(),importProvidersFrom(HttpClientModule,RouterModule,BrowserAnimationsModule,ToastrModule,NgxSpinnerModule,
    TranslateModule.forRoot({
      loader :{
        provide : TranslateLoader ,
        useFactory : HttpLoad,
        deps : [HttpClient]
      }
    })
  )]
};

