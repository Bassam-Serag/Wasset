import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PlacesOwnerService } from '../../../services/places-owner.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import Swal from 'sweetalert2';

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
  
  constructor(private _PlacesOwnerService:PlacesOwnerService,private router: Router){

  }
p:number=1;
notApprovedAppartment:any;
getAllPlaces(){
  console.log()
  this._PlacesOwnerService.getallPendingAdmin().subscribe({
    next:(data:any)=>{
      this.notApprovedAppartment = data;
      console.log(data);

      //console.log(this.Places)
      //.filter((c:any)=>c.isRented==false)
    },
    error:(err)=>{
      this.router.navigate(['/error',{errormessage : err.error as string}]);
    }
  })
}
delete(id:any){
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
          this.getAllPlaces();
          //this.accept(id);
        //    this._PlacesOwnerService.getAllPlaces().subscribe((data) => {
        //   this.Places = data;
        // });
        // setTimeout(() => {
        //   window.location.reload();
        // }, 50);
        // this.getAllPlaces();
          
        });
      });
    }
  });
}
  ngOnInit(): void {
    this.getAllPlaces();
  }

  approval(id:any){
    
    this._PlacesOwnerService.approvalForPost(id).subscribe({
      next:()=>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Approval successful!',
          showConfirmButton: false,
          timer: 2000,
          width: '400px'
        }).then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 500);
        //this.router.navigate(['/approval']);
      })},
      error:(err)=>{
        this.router.navigate(['/error',{errormessage : err.error as string}]);
      }
    })
 }


}
