import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FootfallDetailComponent } from './footfall-detail/footfall-detail.component';
import { HeatmapsComponent } from './heatmaps/heatmaps.component';


const routes: Routes = [
  {path:'login',component:LoginComponent},
{path:'register',component:SignupComponent},
{path:'dashboard',component:DashboardComponent},
{path:'detail',component:FootfallDetailComponent},
{path:'maps',component:HeatmapsComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
