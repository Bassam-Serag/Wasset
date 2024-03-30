import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
@Component({
  selector: 'app-pending-student',
  standalone: true,
  imports: [RouterModule,CommonModule,NgxPaginationModule],
  templateUrl: './pending-student.component.html',
  styleUrl: './pending-student.component.css'
})
export class PendingStudentComponent {

}


