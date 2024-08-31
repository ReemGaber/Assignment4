import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Login, Register} from '../interfaces/register'
import { Environment } from '../../Base/Environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { url } from 'node:inspector';

@Injectable({
  providedIn: 'root'
})
export class ProuctsService {

  constructor(private client:HttpClient) { }

  getallProducts():Observable<any>
  {
    return this.client.get(`${Environment.baseUrl}/api/v1/products`)
  }

  getspecificProduct(pId:string|null):Observable<any>
  {
    return this.client.get(`${Environment.baseUrl}/api/v1/products/${pId}`)
  }
}
