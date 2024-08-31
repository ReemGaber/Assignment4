import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProuctsService } from '../../../shared/services/proucts.service';
import { Environment } from '../../../Base/Environment';
import { Product } from '../../../shared/interfaces/product';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';



@Component({
  selector: 'app-productdetails',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.css'
})
export class ProductdetailsComponent {

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: true
  }

  pId:string|null=""
  product !:Product


  constructor(private _ActivatedRoute:ActivatedRoute,private _ProuctsService:ProuctsService){}


  ngOnInit(): void {

    this._ActivatedRoute.paramMap.subscribe( (p)=>{

       this.pId =  p.get('test')


       this._ProuctsService.getspecificProduct(this.pId).subscribe({
        next : (res)=>{

           this.product =  res.data
        }
       })



    } )
    

    
  }

}
 