import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../../../Base/Environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  userHeader : any = {token : localStorage.getItem('UserToken')}
  

  constructor(private _HttpClient:HttpClient) { }

  reqorder(cID:string ,formData : any):Observable<any>
  {
    return this._HttpClient.post(`${Environment.baseUrl}/api/v1/orders/checkout-session/${cID}?url=http://localhost:4200`, 

      {shippingAddress : formData }
    )
  }
}
