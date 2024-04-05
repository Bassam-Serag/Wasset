import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PlacesOwnerService } from '../../../services/places-owner.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';
//import { NgxPaginationModule } from 'ngx-pagination';


@Component({
  selector: 'app-add',
  standalone: true,
  imports: [    
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule
    
  ],
    providers:[PlacesOwnerService],

  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})


export class AddComponent {
  Places:any;
  //p:number=1;
  //contain = true;
  userId:any;
  AddForm = new FormGroup({
    //id: new FormControl("", [Validators.required]),
    Description: new FormControl("", [Validators.required, Validators.maxLength(1000)]),
    Region: new FormControl("", [Validators.required, Validators.maxLength(100)]),
    NumofRoom: new FormControl("", [Validators.required, Validators.min(1), this.numberOnlyValidator]),
    ApartmentPrice: new FormControl("", [Validators.required, Validators.min(1), this.numberOnlyValidator]),
    GenderOfStudents: new FormControl("", [Validators.required]),
    Location: new FormControl("", [Validators.required, Validators.maxLength(100)]),
    Capacity: new FormControl("", [Validators.required, Validators.min(1), this.numberOnlyValidator]),
    //phone:new FormControl("", [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)] ),
    OwnerID: new FormControl("", [Validators.required]),

    images: new FormControl(null, [Validators.required])
   // images: new FormControl("", [Validators.required, this.imageRequiredValidator])


  });
  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const files = event.target.files;
      this.AddForm.get('images')?.setValue(files);
    }
  }
 v:any;
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
    this.AddForm.get('OwnerID')?.setValue(this.userId);
    this.v=    decodedToken[
      'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
    ]
  }
}
  constructor(private _PlacesOwnerService:PlacesOwnerService , private router: Router){
    //this.getUserIdFromToken();
   }
  ngOnInit(): void {
    this.getUserIdFromToken();

  }
  numberOnlyValidator(control: FormControl): { [key: string]: any } | null {
    const value = control.value;
    if (isNaN(value)) {
      return { 'notNumber': true };
    }
    return null;
  }

  AddPlaces() {
    console.log("scvdcsad");
    if (this.AddForm.valid) 
    {
      const formData = new FormData();
      formData.append('Description', this.AddForm.controls.Description.value ?? '');
      formData.append('Region', this.AddForm.controls.Region.value ?? '');
      formData.append('NumofRoom', this.AddForm.controls.NumofRoom.value ?? '');
      formData.append('ApartmentPrice', this.AddForm.controls.ApartmentPrice.value ?? '');
      formData.append('GenderOfStudents', this.AddForm.controls.GenderOfStudents.value ?? '');
      formData.append('Location', this.AddForm.controls.Location.value ?? '');
      formData.append('Capacity', this.AddForm.controls.Capacity.value ?? '');
      formData.append('OwnerID', this.AddForm.controls.OwnerID.value ?? '');
      
      const images = this.AddForm.controls.images.value as unknown as any[];
      if (images !== null) { 
        for (let i = 0; i < images.length; i++) {
          formData.append('images', images[i]);
        }
      }
      console.log(formData);
      console.log(images)
      this._PlacesOwnerService.AddNewPlaces(formData).subscribe(() => {
        //this.router.navigate(['/places']);
        Swal.fire({
          title: "Success!",
          text: "Place added successfully.",
          icon: "success"
          // imageUrl: "https://www.masrtimes.com/UploadCache/libfiles/39/3/600x338o/811.jpg",
          // imageWidth: 400,
          // imageHeight: 300,
          // imageAlt: "Custom image"
        }).then(() => {
          this.router.navigate(['/places']);
        });
      });
    }
  }
}








//////////////////////////////////////////////////////////////////////////////////////////////


// import { Component } from '@angular/core';
// import { HttpClientModule } from '@angular/common/http';
// import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// import { Router, RouterModule } from '@angular/router';
// import { PlacesOwnerService } from '../../../services/places-owner.service';
// import { CommonModule } from '@angular/common';
// import Swal from 'sweetalert2';


// @Component({
//   selector: 'app-add',
//   standalone: true,
//   imports: [    
//     FormsModule,
//     HttpClientModule,
//     ReactiveFormsModule,
//     CommonModule,
//     RouterModule
//   ],
//     providers:[PlacesOwnerService],

//   templateUrl: './add.component.html',
//   styleUrl: './add.component.css'
// })


// export class AddComponent {
//   Places:any;
//   //contain = true;
  
//   AddForm = new FormGroup({
//     //id: new FormControl("", [Validators.required]),
//     description: new FormControl("", [Validators.required, Validators.maxLength(500)]),
//     location: new FormControl("", [Validators.required, Validators.maxLength(100)]),
//     region: new FormControl("", [Validators.required, Validators.maxLength(100)]),
//     price: new FormControl("", [Validators.required, Validators.min(0), this.numberOnlyValidator]),
//     capacity: new FormControl("", [Validators.required, Validators.min(0), this.numberOnlyValidator]),
//     gender: new FormControl("", [Validators.required]),
//     numofroom: new FormControl("", [Validators.required, Validators.min(0), this.numberOnlyValidator]),
//     phone:new FormControl("", [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)] ),
//     img: new FormControl("", [Validators.required, this.imageRequiredValidator])
//   });

 
//   constructor(private _PlacesOwnerService:PlacesOwnerService , private router: Router){ }
//   ngOnInit(): void {
//     this._PlacesOwnerService.getAllPlaces().subscribe({
//       next:(data)=>{
//         this.Places = data;
//       },
//       error:(err)=>{
//         this.router.navigate(['/error',{errormessage : err.message as string}]);
//       }
//     })
    
//   }
//   imageRequiredValidator(control: FormControl): { [key: string]: any } | null {
//     const value = control.value;
//     if (!value || value.length === 0) {
//       return { 'required': true };
//     }
//     return null;
//   }
//   // checkID(){
//   //   this.contain =true;

//   //   for (const st of this.Places) {
//   //     if (st.id == this.AddForm.controls.id.value) {
//   //       this.contain = false;
//   //     }
//   //   }
//   // }
//   numberOnlyValidator(control: FormControl): { [key: string]: any } | null {
//     const value = control.value;
//     if (isNaN(value)) {
//       return { 'notNumber': true };
//     }
//     return null;
//   }
//   AddPlaces() {
//     //&& this.contain
//     if (this.AddForm.valid ) {
//       let newPlace = {
//         //id: this.AddForm.controls.id.value,
//         description: this.AddForm.controls.description.value,
//         location:this.AddForm.controls.location.value,
//         region:this.AddForm.controls.region.value,
//         price: this.AddForm.controls.price.value,
//         capacity: this.AddForm.controls.capacity.value,
//         gender: this.AddForm.controls.gender.value,
//         numofroom: this.AddForm.controls.numofroom.value,
//         phone:this.AddForm.controls.phone.value ,
//         img:this.AddForm.controls.img.value,
//         isApproved:false,
//         isRented:false,
//         requestRent:false
//       };
  
//       this._PlacesOwnerService.AddNewPlaces(newPlace).subscribe(() => {
//         Swal.fire({
//           title: "Success!",
//           text: "Place added successfully.",
//           imageUrl: "https://www.masrtimes.com/UploadCache/libfiles/39/3/600x338o/811.jpg",
//           imageWidth: 400,
//           imageHeight: 300,
//           imageAlt: "Custom image"
//         }).then(() => {
//           this.router.navigate(['/places']);
//         });
//       });
//     }
//   }
// }
