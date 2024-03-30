import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { PlacesOwnerService } from '../../../services/places-owner.service';
import { jwtDecode } from 'jwt-decode';
@Component({
  selector: 'app-pending-student',
  standalone: true,
  imports: [RouterModule,CommonModule,NgxPaginationModule,HttpClientModule],
  providers:[PlacesOwnerService],

  templateUrl: './pending-student.component.html',
  styleUrl: './pending-student.component.css'
})
export class PendingStudentComponent {
  id:any;
  Places:any;
  userId:any;
  constructor(private _PlacesOwnerService:PlacesOwnerService , private router: Router,private Actived : ActivatedRoute)
  {
    this.id = this.Actived.snapshot.params["id"];
    this.getUserIdFromToken();
   }



   getUserIdFromToken(): void {
    const token = localStorage.getItem('userToken');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      this.userId =
        decodedToken[
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
        ];
      //console.log(this.userId);
      //console.log(decodedToken);
      this.id.setValue(this.userId);
    }
  }
   ngOnInit(): void {

    this._PlacesOwnerService.getAllPendingStd(this.id).subscribe({
      next:(data)=>{
        this.Places = data;
        console.log(data);

      },
      error:(err)=>{
        this.router.navigate(['/error',{errormessage : err.message as string}]);
      }
    })
  }
  backToPlaces(){
    this.router.navigate(['/dashboard']);
  }
}


