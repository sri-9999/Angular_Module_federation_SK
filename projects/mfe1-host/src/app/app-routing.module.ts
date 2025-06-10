import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { BookingComponent } from './booking/booking.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { UserManagementComponent } from './admin/user-management/user-management.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate:[AuthGuard]},
  { path: '', component: AboutComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'bookings', component: BookingComponent, canActivate:[AuthGuard]},
  {
    path: 'search',
    canActivate:[AuthGuard],
    loadChildren: () =>
      import('mfe2-search/FlightSearchModule').then(m => m.FlightSearchModule)
  },
  { path: 'manageUsers', component: UserManagementComponent, canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }