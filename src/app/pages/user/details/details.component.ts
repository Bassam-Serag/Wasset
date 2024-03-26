import { Component , OnInit} from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
//import { ActivatedRoute, RouterModule } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CommonModule } from '@angular/common';
import { PlacesOwnerService } from '../../../services/places-owner.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    CarouselModule

  ],
  // imports: [RouterModule,CarouselModule,CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})

export class DetailsComponent implements OnInit {
  constructor (private _ActivatedRoute:ActivatedRoute,  private ownerserve:PlacesOwnerService){}

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.loadID();
    this.loadAppartmentByID();
   
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 2000,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: true
  }

  appID:any;
  loadID(){
    this._ActivatedRoute.queryParamMap.subscribe({
      next:(res)=>{
        this.appID=res.get("id");
      }
    })

  }
  appartment:any;
  loadAppartmentByID(){
    this.ownerserve.getPlacesByID(this.appID).subscribe({
      next:(res)=>{
        this.appartment=res;
        
      }
    })

  }

  Rented(){

    Swal.fire({
      title: "Are you sure?",
      // text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes,Rent!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.ownerserve.getPlacesByID(this.appID).subscribe({
          next:(res:any)=>{
            var objAppart={
              id:res.id,
              description :res.description,
              location:res.location,
              region:res.region,
              price :res.price,
              capacity:res.capacity,
              gender: res.gender,
              numofroom:res.numofroom,
              phone:res.phone,
              isApproved:res.isApproved,
              isRented:res.isRented,
              img:res.img,
              requestRent:true
            }
            this.ownerserve.updatePlaces(this.appID,objAppart).subscribe({
              next:(res:any)=>
              {
                this.loadAppartmentByID();
                Swal.fire({
                  title: "Rented!",
                  text: "You Rented Successfully.",
                  icon: "success"
                });
                
              }
            })
          }
        })
    
        this.loadAppartmentByID();
      }
    });
  }

}



//style to carousel //
// "node_modules/ngx-owl-carousel-o/lib/styles/prebuilt-themes/owl.carousel.min.css",
// "node_modules/ngx-owl-carousel-o/lib/styles/prebuilt-themes/owl.theme.default.min.css"