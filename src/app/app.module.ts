import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import{MaterialModule} from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { FootfallDetailComponent } from './footfall-detail/footfall-detail.component';
import { HeatmapsComponent } from './heatmaps/heatmaps.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';






@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    SignupComponent,
    FootfallDetailComponent,
    HeatmapsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ChartsModule,
    FormsModule,
    LeafletModule.forRoot(),
    LeafletModule
   
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
