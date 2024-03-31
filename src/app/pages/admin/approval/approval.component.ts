import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PlacesOwnerService } from '../../../services/places-owner.service';
import { RouterLink, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-approval',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterModule,
    NgxPaginationModule
  ],
  templateUrl: './approval.component.html',
  styleUrl: './approval.component.css'
})
export class ApprovalComponent  implements OnInit{ 
  
  constructor(private ownerService:PlacesOwnerService){

  }
p:number=1;
  notApprovedAppartment:any=[];

  getAllPlaces(){
    this.ownerService.getAllPlaces().subscribe({
      next:(res)=>{
        this.appartment=res;
        //this.notApprovedAppartment=this.appartment.filter((appart:any)=>appart.isApproved!=true);
      }
    })
  }

  delete(id:any){

this.ownerService.deletePlaces(id).subscribe({
  next:(res)=>{
    // this.appartment=res;
    this.getAllPlaces();

  }
})
  }
  appartment:any=[];
  ngOnInit(): void {
    this.getAllPlaces();
  }

  approval(id:any){
    
    this.ownerService.getPlacesByID(id).subscribe({
      next:(res:any)=>{
        var objAppart={
          //id:res.id,
          description :res.description,
          location:res.location,
          region:res.region,
          price :res.price,
          capacity:res.capacity,
          gender: res.gender,
          numofroom:res.numofroom,
          phone:res.phone,
          isApproved:true,
          img:res.img,
          isRented:res.isRented,
          requestRent:res.requestRent
        }
        this.ownerService.updatePlaces(id,objAppart).subscribe({
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
