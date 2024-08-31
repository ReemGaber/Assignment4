import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../Base/Environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  userHeader : any = {token : localStorage.getItem('UserToken')}

  constructor(private _HttpClient:HttpClient) { }

  AddproducttoCart(pId:string):Observable<any>
  {
    return this._HttpClient.post(`${Environment.baseUrl}/api/v1/cart`,{productId:pId} )
  }

  updatecartquantity(pId:string , count : number):Observable<any>
  {
    return this._HttpClient.put(`${Environment.baseUrl}/api/v1/cart/${pId}`,{count:count})
  }

  getcart():Observable<any>
  {
    return this._HttpClient.get(`${Environment.baseUrl}/api/v1/cart`)
  }

  RemoveItem(pId:string):Observable<any>
  {
    return this._HttpClient.delete(`${Environment.baseUrl}/api/v1/cart/${pId}`)
  }

  clearCartAPI():Observable<any>
  {
    return this._HttpClient.delete(`${Environment.baseUrl}/api/v1/cart`)
  }

  
}



