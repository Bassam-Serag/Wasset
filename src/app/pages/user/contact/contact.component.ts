import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-contact',
    standalone: true,
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.css',
    imports: [RouterModule]
})
export class ContactComponent {
  // contactForm: FormGroup;
  //  formData = { name: '', email: '', phone: '', subject: '', message: '' }; 
  //    constructor(private formBuilder: FormBuilder, private http: HttpClient) {
  //   this.contactForm = this.formBuilder.group({
  //     name: ['', Validators.required],
  //     email: ['', [Validators.required, Validators.email]],
  //     phone: ['', Validators.required],
  //     subject: ['', Validators.required],
  //     message: ['', Validators.required]
  //   });
  // }
  //   onSubmit() {
  //   if (this.contactForm.valid) {
     
  //     this.http.post('your-backend-url', this.contactForm.value).subscribe(response => {
  //       console.log('Message sent successfully', response);
  //     }, error => {
  //       console.error('Error sending message', error);
  //     });
  //   }
  // }

}

