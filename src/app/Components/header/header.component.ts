import { Component, SimpleChanges } from '@angular/core';
import { Router,RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  imports: [RouterModule, HttpClientModule, CommonModule],
  providers: [AuthService],
})

export class HeaderComponent {
  isLogin: boolean = false;
  userName: string = '';

  //this is to call logout in AuthService//
  logout() {
    this.isLogin = false;
    this._AuthService.logout();
  }

  ngOnInit(): void {
    this.getlogin();
  }
  constructor(
    private _AuthService: AuthService,
    private routerService: Router
  ) {
    //this.getlogin();
  }
  getlogin() {
    const token = localStorage.getItem('userToken');
    if (token !== null) {
      this.isLogin = true;
      //window.location.reload();
      //this.userName = token;
    } else {

      this.isLogin = false;
    } //this.userName = ''
    console.log(token);
    //
  }

  onSearch(value: any) {
    this.routerService.navigate(['/hosing'], {
      queryParams: { search: value },
    });
  }
}




