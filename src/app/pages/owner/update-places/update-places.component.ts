import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PlacesOwnerService } from '../../../services/places-owner.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-places',
  standalone: true,
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule
  ],
  providers:[PlacesOwnerService],

  templateUrl: './update-places.component.html',
  styleUrl: './update-places.component.css'
})
export class UpdatePlacesComponent {
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
        this.AddForm.controls.id.setValue(this.Places.id);
        this.AddForm.controls.description.setValue(this.Places.description);
        this.AddForm.controls.location.setValue(this.Places.location);
        this.AddForm.controls.region.setValue(this.Places.region);
        this.AddForm.controls.price.setValue(this.Places.price);
        this.AddForm.controls.capacity.setValue(this.Places.capacity);
        this.AddForm.controls.gender.setValue(this.Places.gender);
        this.AddForm.controls.numofroom.setValue(this.Places.numofroom);
        this.AddForm.controls.phone.setValue(this.Places.phone);
        this.AddForm.controls.img.setValue(this.Places.img);
      },
      error:(err)=>{
        this.router.navigate(['/error',{errormessage : err.message as string}]);
      }
    })
  }
  AddForm = new FormGroup({
    id: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required, Validators.maxLength(500)]),
    location: new FormControl("", [Validators.required, Validators.maxLength(100)]),
    region: new FormControl("", [Validators.required, Validators.maxLength(100)]),
    price: new FormControl(null, [Validators.required, Validators.min(0), this.numberOnlyValidator]),
    capacity: new FormControl(null, [Validators.required, Validators.min(0), this.numberOnlyValidator]),
    gender: new FormControl(null, [Validators.required]),
    numofroom: new FormControl(null, [Validators.required, Validators.min(0), this.numberOnlyValidator]),
    phone:new FormControl("", [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)] ),
    img: new FormControl("", [Validators.required, this.imageRequiredValidator])

  });
  imageRequiredValidator(control: FormControl): { [key: string]: any } | null {
    const value = control.value;
    if (!value || value.length === 0) {
      return { 'required': true };
    }
    return null;
  }
  numberOnlyValidator(control: FormControl): { [key: string]: any } | null {
    const value = control.value;
    if (isNaN(value)) {
      return { 'notNumber': true };
    }
    return null;
  }
  UpdatePlaces() {
    if (this.AddForm.valid) {
      let newPlace = {
        id: this.AddForm.controls.id.value,
        description: this.AddForm.controls.description.value,
        location:this.AddForm.controls.location.value,
        region:this.AddForm.controls.region.value,
        price: this.AddForm.controls.price.value,
        capacity: this.AddForm.controls.capacity.value,
        gender: this.AddForm.controls.gender.value,
        numofroom: this.AddForm.controls.numofroom.value,
        phone: this.AddForm.controls.phone.value,
        img:this.AddForm.controls.img.value,

      };
  
      this._PlacesOwnerService.updatePlaces(this.id, newPlace).subscribe(() => {
        Swal.fire({
          title: "Success!",
          text: "Place added successfully.",
          imageUrl: "https://www.masrtimes.com/UploadCache/libfiles/39/3/600x338o/811.jpg",
          imageWidth: 400,
          imageHeight: 300,
          imageAlt: "Custom image"
        }).then(() => { 
        //    this._PlacesOwnerService.getAllPlaces().subscribe((allPlaces) => {
        //   this.Places = allPlaces;
        // });
          this.router.navigate(['/places']);
        });
      });
    }
  }
 
}
