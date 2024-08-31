import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrdersService } from '../../../shared/services/orders/orders.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-req-order',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './req-order.component.html',
  styleUrl: './req-order.component.css'
})
export class ReqOrderComponent {

  constructor(private _OrdersService:OrdersService,private _ActivatedRoute:ActivatedRoute){}

  userdataform:FormGroup=new FormGroup({
    details:new FormControl(null,Validators.required),
    phone:new FormControl(null,Validators.required),
    city:new FormControl(null,Validators.required),

    

  })

  checkout()
  {
    this._ActivatedRoute.paramMap.subscribe((p)=>{
      this._OrdersService.reqorder(p.get('cartId')! , this.userdataform.value).subscribe({
        next: (res)=>
        {
          window.open(res.session.url ,'_self')

        }
      })
     
    })
    
    
  }

}
