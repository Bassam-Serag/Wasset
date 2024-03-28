import { Component } from '@angular/core';
import { PlacesOwnerService } from '../../../services/places-owner.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-details-places',
  standalone: true,
  imports: [HttpClientModule,RouterModule],
  providers:[PlacesOwnerService],

  templateUrl: './details-places.component.html',
  styleUrl: './details-places.component.css'
})
export class DetailsPlacesComponent {
  id:any;
  Places:any;
  constructor(private _PlacesOwnerService:PlacesOwnerService , private router: Router,private Actived : ActivatedRoute)
  {
    this.id = this.Actived.snapshot.params["id"];

   }
   ngOnInit(): void {

    this._PlacesOwnerService.getPlacesByID(this.id).subscribe({
      next:(data)=>{
        this.Places = data;
      },
      error:(err)=>{
        this.router.navigate(['/error',{errormessage : err.message as string}]);
      }
    })
  }
  backToPlaces(){
    this.router.navigate(['/places']);
  }
}










///////////////////////////////////////////////////////////////////////////////////////////////

// import { Component } from '@angular/core';
// import { PlacesOwnerService } from '../../../services/places-owner.service';
// import { HttpClientModule } from '@angular/common/http';
// import { ActivatedRoute, Router, RouterModule } from '@angular/router';

// @Component({
//   selector: 'app-details-places',
//   standalone: true,
//   imports: [HttpClientModule,RouterModule],
//   providers:[PlacesOwnerService],

//   templateUrl: './details-places.component.html',
//   styleUrl: './details-places.component.css'
// })
// export class DetailsPlacesComponent {
//   id:any;
//   Places:any;
//   constructor(private _PlacesOwnerService:PlacesOwnerService , private router: Router,private Actived : ActivatedRoute)
//   {
//     this.id = this.Actived.snapshot.params["id"];

//    }
//    ngOnInit(): void {

//     this._PlacesOwnerService.getPlacesByID(this.id).subscribe({
//       next:(data)=>{
//         this.Places = data;
//       },
//       error:(err)=>{
//         this.router.navigate(['/error',{errormessage : err.message as string}]);
//       }
//     })
//   }
//   backToPlaces(){
//     this.router.navigate(['/places']);
//   }
// }
