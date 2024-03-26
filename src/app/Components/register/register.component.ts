import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule,HttpClient  } from '@angular/common/http';
//import { provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  standalone: true,
  imports :[RouterModule,ReactiveFormsModule,CommonModule,HttpClientModule,
    // provideHttpClient().withFetch()
  ],
   
  providers:[AuthService],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  
{
  constructor(private _AuthService:AuthService,private _FormBuilder:FormBuilder , private _Router:Router){} 
  isLoading:boolean=false;
  errMsg:string='';
  stringOnlyValidator(control: any): {[key: string]: any} | null {
    const value = control.value;
    if (value && (typeof value !== 'string' || /\d/.test(value))) {
      return { 'notString': true };
    }
    return null;
  }
  register : FormGroup = this._FormBuilder.group
  ({
    userName:[null , [Validators.required, this.stringOnlyValidator, Validators.minLength(3),Validators.maxLength(20)]],
    password:[null , [Validators.required, Validators.pattern(/^\w{6,}/)] ],
    confirmPassword:[null , [Validators.required, Validators.pattern(/^\w{6,}/)] ],
    email:[null , [Validators.required, Validators.email] ],
    phone:[null , [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)] ],
    role: [null, [Validators.required]],
    ssn: [null, [Validators.required, Validators.pattern(/^\d{14}$/)]], 
    address: [null, [Validators.required]],
  },{validators:this.rePasswordMatch});

  rePasswordMatch(register:any){
  {
   let passwordControl= register.get('password');
   let rePasswordControl= register.get('confirmPassword');
   if(passwordControl.value===rePasswordControl.value)
   {
    return null;

   }else
   {
    rePasswordControl.setErrors({passwordMatch:' password and rePassword not match '});
    return {passwordMatch:' password and rePassword not match '}
   }

  }

    
  }

  // uniqueEmailValidator(formGroup: FormGroup): { [key: string]: any } | null {
  //   const email = formGroup.get('email');
  //   if (email && email.value) {
  //     const isEmailUnique = this._AuthService.checkEmailUniqueness(email.value);
  //     if (!isEmailUnique) {
  //       return { notUniqueEmail: true };
  //     }
  //   }
  //   return null;
  // }
  handleRegister(register:FormGroup)
  {
    
    this.isLoading=true
    if(register.valid)
    {
      
    this._AuthService.registerToAPI(register.value).subscribe({
      next: (res) => {
         //if (res.message === 'success') {
          this.register=res;
          this.isLoading = false;
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Registration successful!',
            showConfirmButton: false,
            timer: 1000,
            width: '400px'
          }).then(() => {
            const userType = register.value.role;
            if (userType === 'student') {
              this._Router.navigate(['/loginstudent']);
            } else if (userType === 'owner') {
              this._Router.navigate(['/login']);
            }
          });
        //}
      },
      error: (err) => {
        this.isLoading = false;
        // if (err.error.message === 'This email has already been used') {
        //   this.errMsg = 'This email has already been used';
        // } else {
          this.errMsg = err.error.message;
        //}
      }
    });
    
    }
  }

}
