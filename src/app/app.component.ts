import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AboutComponent } from './pages/user/about/about.component';
import { HeaderComponent } from "./Components/header/header.component";
import { HomeComponent } from './pages/user/home/home.component';
import { FooterComponent } from './Components/footer/footer.component';
import { ErrorComponent } from './Components/error/error.component';
import { ContactComponent } from './pages/user/contact/contact.component';
import { RegisterComponent } from './Components/register/register.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { HousingComponent } from './pages/user/housing/housing.component';
import { HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

//import{BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
      RouterOutlet, 
      AboutComponent,
      HomeComponent, 
      RouterModule, 
      HeaderComponent,
      FooterComponent,
      ErrorComponent,
      HousingComponent,
      RegisterComponent,
      ContactComponent,
      HttpClientModule,
      ReactiveFormsModule,
      //BrowserAnimationsModule,
      CarouselModule,
      NgxPaginationModule
     


      
    ],
    //providers:[provideHttpClient().withFetch()]
    
})
export class AppComponent {
  title = 'Project';
}

