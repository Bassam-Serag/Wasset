import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { PlacesOwnerService } from '../../../services/places-owner.service';
import { CommonModule } from '@angular/common';
@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [
        RouterModule,
        CommonModule
    ]
})
export class HomeComponent  implements OnInit{

    constructor(private ownerService:PlacesOwnerService , private router:Router) {}
    
    ngOnInit(): void {
      // throw new Error('Method not implemented.');
      this.getAllPlaces();
    }
    appartment:any=[];
    getAllPlaces(){
      this.ownerService.getAllPlaces().subscribe({
        next:(res:any)=>{

          console.log(res);
          this.appartment=res.filter((c:any)=>c.isApproved==true && c.isRented==false);
        }
      })
  
    }
    openDetails(id:any){
      this .router.navigate(["/details"], {queryParams:{id:id}})
    }
}

