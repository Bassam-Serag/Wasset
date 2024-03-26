import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { PlacesOwnerService } from '../../../services/places-owner.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';


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
  contain = true;
  
  AddForm = new FormGroup({
    id: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required, Validators.maxLength(500)]),
    location: new FormControl("", [Validators.required, Validators.maxLength(100)]),
    region: new FormControl("", [Validators.required, Validators.maxLength(100)]),
    price: new FormControl("", [Validators.required, Validators.min(0), this.numberOnlyValidator]),
    capacity: new FormControl("", [Validators.required, Validators.min(0), this.numberOnlyValidator]),
    gender: new FormControl("", [Validators.required]),
    numofroom: new FormControl("", [Validators.required, Validators.min(0), this.numberOnlyValidator]),
    phone:new FormControl("", [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)] ),
    img: new FormControl("", [Validators.required, this.imageRequiredValidator])
  });

 
  constructor(private _PlacesOwnerService:PlacesOwnerService , private router: Router){ }
  ngOnInit(): void {
    this._PlacesOwnerService.getAllPlaces().subscribe({
      next:(data)=>{
        this.Places = data;
      },
      error:(err)=>{
        this.router.navigate(['/error',{errormessage : err.message as string}]);
      }
    })
    
  }
  imageRequiredValidator(control: FormControl): { [key: string]: any } | null {
    const value = control.value;
    if (!value || value.length === 0) {
      return { 'required': true };
    }
    return null;
  }
  checkID(){
    this.contain =true;

    for (const st of this.Places) {
      if (st.id == this.AddForm.controls.id.value) {
        this.contain = false;
      }
    }
  }
  numberOnlyValidator(control: FormControl): { [key: string]: any } | null {
    const value = control.value;
    if (isNaN(value)) {
      return { 'notNumber': true };
    }
    return null;
  }
  AddPlaces() {
    if (this.AddForm.valid && this.contain) {
      let newPlace = {
        id: this.AddForm.controls.id.value,
        description: this.AddForm.controls.description.value,
        location:this.AddForm.controls.location.value,
        region:this.AddForm.controls.region.value,
        price: this.AddForm.controls.price.value,
        capacity: this.AddForm.controls.capacity.value,
        gender: this.AddForm.controls.gender.value,
        numofroom: this.AddForm.controls.numofroom.value,
        phone:this.AddForm.controls.phone.value ,
        img:this.AddForm.controls.img.value,
        isApproved:false,
       
        isRented:false,
        requestRent:false
      };
  
      this._PlacesOwnerService.AddNewPlaces(newPlace).subscribe(() => {
        Swal.fire({
          title: "Success!",
          text: "Place added successfully.",
          imageUrl: "https://www.masrtimes.com/UploadCache/libfiles/39/3/600x338o/811.jpg",
          imageWidth: 400,
          imageHeight: 300,
          imageAlt: "Custom image"
        }).then(() => {
          this.router.navigate(['/places']);
        });
      });
    }
  }
}
