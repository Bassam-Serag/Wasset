import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/user/about/about.component';
import { HomeComponent } from './pages/user/home/home.component';
import { ErrorComponent } from './Components/error/error.component';
import { ContactComponent } from './pages/user/contact/contact.component';
import { RegisterComponent } from './Components/register/register.component';
import { HousingComponent } from './pages/user/housing/housing.component';
import { DetailsComponent } from './pages/user/details/details.component';
import { LoginComponent } from './Components/login/login.component';
import { AddComponent } from './pages/owner/add/add.component';
import { PlacesComponent } from './pages/owner/places/places.component';
import { DetailsPlacesComponent } from './pages/owner/details-places/details-places.component';
import { UpdatePlacesComponent } from './pages/owner/update-places/update-places.component';
import { LoginStudentComponent } from './Components/login-student/login-student.component';
import { LoginAdminComponent } from './Components/login-admin/login-admin.component';
import { ApprovalComponent } from './pages/admin/approval/approval.component';
import { NgModule } from '@angular/core';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {path:"",redirectTo:"register",pathMatch:"full"},
    {path:"home",canActivate:[authGuard] ,component:HomeComponent},//
    {path:"about",canActivate:[authGuard] ,component:AboutComponent},//
    {path:"contact",canActivate:[authGuard] ,component:ContactComponent},//
    {path:"hosing",canActivate:[authGuard] ,component:HousingComponent},//
    {path:"details",canActivate:[authGuard] ,component:DetailsComponent},//
    {path:"register",component:RegisterComponent},
    {path:"login",component:LoginComponent},
    {path:"loginstudent",component:LoginStudentComponent},
    {path:"loginadmin",component:LoginAdminComponent},
    {path:"places",canActivate:[authGuard],component:PlacesComponent},
    {path:"places/:id",canActivate:[authGuard],component:DetailsPlacesComponent},
    {path:"updateplaces/:id",canActivate:[authGuard],component:UpdatePlacesComponent},
    {path:"addplaces",canActivate:[authGuard],component:AddComponent},
    {path:"approval",canActivate:[authGuard],component:ApprovalComponent},


    {path:"**",component:ErrorComponent}
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}