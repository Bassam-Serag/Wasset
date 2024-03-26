import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PlacesOwnerService } from '../../../services/places-owner.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-places',
  standalone: true,
  imports: [ HttpClientModule, RouterModule,CommonModule],
  providers:[PlacesOwnerService],
  templateUrl: './places.component.html',
  styleUrl: './places.component.css'
})


export class PlacesComponent implements OnInit{
  Places:any;
  constructor(private _PlacesOwnerService:PlacesOwnerService , private router: Router){ }
  ngOnInit(): void {
    
    this.getAllPlaces();
    // this._PlacesOwnerService.getAllPlaces().subscribe({
    //   next:(data)=>{
    //     this.Places = data;
    //   },
    //   error:(err)=>{
    //     this.router.navigate(['/error',{errormessage : err.message as string}]);
    //   }
    // })
  }
  clickAddPlaces(){
    this.router.navigate(['/addplaces']);
  }

  deleteplaces(id: any): void {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this._PlacesOwnerService.deletePlaces(id).subscribe(() => {
          Swal.fire({
            title: "Deleted!",
            text: "Your Place has been deleted.",
            icon: "success"
          }).then(() => {
            this.accept(id);
          //    this._PlacesOwnerService.getAllPlaces().subscribe((data) => {
          //   this.Places = data;
          // });
            this.router.navigate(['/places']);
          });
        });
      }
    });
  }
  getAllPlaces(){
    this._PlacesOwnerService.getAllPlaces().subscribe({
      next:(data:any)=>{
        this.Places = data.filter((c:any)=>c.isRented==false);
      },
      error:(err)=>{
        this.router.navigate(['/error',{errormessage : err.message as string}]);
      }
    })

  }
  accept(id:any){
    console.log("This is id :" +id);

    this._PlacesOwnerService.getPlacesByID(id).subscribe({
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
          img:res.img,

          isApproved:res.isApproved,
          isRented:true,
          requestRent:res.requestRent
        }
        this._PlacesOwnerService.updatePlaces(id,objAppart).subscribe({
          next:(res:any)=>
          {
            this.getAllPlaces();
          }
        })
      }
    })

    this.getAllPlaces();
  }
  
}
