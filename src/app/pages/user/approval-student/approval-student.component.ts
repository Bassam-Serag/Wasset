import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { NgxPaginationModule } from 'ngx-pagination';
@Component({
  selector: 'app-approval-student',
  standalone: true,
  imports: [RouterModule,CommonModule,NgxPaginationModule],
  templateUrl: './approval-student.component.html',
  styleUrl: './approval-student.component.css'
})
export class ApprovalStudentComponent {

}
