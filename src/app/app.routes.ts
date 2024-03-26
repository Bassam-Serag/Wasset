import { Routes } from '@angular/router';
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
//import { authGuard } from './auth.guard';

export const routes: Routes = [
    {path:"",redirectTo:"register",pathMatch:"full"},
    {path:"home",component:HomeComponent},//canActivate:[authGuard] ,
    {path:"about",component:AboutComponent},//canActivate:[authGuard] ,
    {path:"contact",component:ContactComponent},//canActivate:[authGuard] ,
    {path:"hosing",component:HousingComponent},//canActivate:[authGuard] ,
    {path:"details",component:DetailsComponent},//canActivate:[authGuard] ,
    {path:"register",component:RegisterComponent},
    {path:"login",component:LoginComponent},
    {path:"loginstudent",component:LoginStudentComponent},
    {path:"loginadmin",component:LoginAdminComponent},
    {path:"places",component:PlacesComponent},
    {path:"places/:id",component:DetailsPlacesComponent},
    {path:"updateplaces/:id",component:UpdatePlacesComponent},
    {path:"addplaces",component:AddComponent},
    {path:"approval",component:ApprovalComponent},


    {path:"**",component:ErrorComponent}
];
