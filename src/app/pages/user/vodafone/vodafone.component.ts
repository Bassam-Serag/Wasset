import { Component } from '@angular/core';
import { PaymentService } from '../../../../../payment.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vodafone',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './vodafone.component.html',
  styleUrl: './vodafone.component.css',
})
export class VodafoneComponent {
  constructor(private paymentService: PaymentService,private router: Router) {}
  walletNumber: any;
  amount: any;
  pin: any;
  otp: any;
  submitPaymentForm(): void {
    // Implement your form submission logic here
    // For example, you can call a service method to process the payment
    console.log('Form submitted!');
    console.log('Wallet Number:', this.walletNumber);
    console.log('Amount:', this.amount);
    console.log('Pin:', this.pin);
    console.log('OTP:', this.otp);
  }
  VodafoneRequestt(): void {
    Swal.fire({
      position: 'center',
      title: 'successful',
      icon: 'success',
      showCancelButton: false,
      timer: 2000,
      width: '400px'
    }).then(() => {
        this.paymentService.VodafonerRequest(); 
        this.router.navigate(['/home']);
    });
  }
  
}
