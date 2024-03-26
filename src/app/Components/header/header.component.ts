import { Component } from '@angular/core';
import { Router,RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';



@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
    imports: [RouterModule,HttpClientModule,CommonModule],
    providers: [AuthService]
})
/*



*/
export class HeaderComponent {
    isLogin:boolean=false;
    userName: string = '';

    //this is to call logout in AuthService//
    logout(){
        this._AuthService.logout();
    }
    constructor(private _AuthService:AuthService ,private routerService:Router)
    {
        _AuthService.userData.subscribe({
            next:(data)=>{
                if(_AuthService.userData.getValue() !==null){
                    this.isLogin=true;
                    //this.userName = data.name;
                }else{ this.isLogin=false;}//this.userName = '';
            }
        })

    }
    // constructor(private _AuthService: AuthService) {
    //     _AuthService.userData.subscribe({
    //         next: (data) => {
    //             if (data !== null) { // Check if data is not null
    //                 this.isLogin = true;
    //                 //this.userName = data.name;
    //             } else {
    //                 this.isLogin = false;
    //                 this.userName = '';
    //             }
    //         }
    //     });
    // }

    onSearch(value:any){

        this.routerService.navigate(["/hosing"],{queryParams:{search:value}});

    }
    

}




