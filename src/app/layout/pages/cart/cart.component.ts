import { Component } from '@angular/core';
import { CartService } from '../../../shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  
  allCart : any[] = []
  cartId!:string

  constructor(private _CartService:CartService,private _ToastrService:ToastrService){}

  ngOnInit(): void {
    
    if(typeof localStorage !== 'undefined')
    {
      localStorage.setItem("currentPage" , '/cart')
    }


    this._CartService.getcart().subscribe({
      next : (res)=>{ this.allCart =  res.data.products;
        this.cartId = res.data._id
        console.log(this.allCart)
      } ,
      error :(err)=>{
        err.message
      }
    })
    
  }


  changeCount(pId:string , count : number)
  {
   this._CartService.updatecartquantity( pId ,count).subscribe({
    next : (res)=>{this.allCart =  res.data.products ; this._ToastrService.success("Cart Updated Successfully")}
   })
  }

  deleteItem(pId:string)
  {
    this._CartService.RemoveItem(pId).subscribe({
      next : (res)=>{this._ToastrService.success("Removed Successfully !") ; this.allCart =  res.data.products }
    })
  }
}
