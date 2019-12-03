import { NgModule } from '@angular/core';


import {
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule ,
  MatDividerModule,
  MatChipsModule,
  MatListModule,
  MatMenuModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatExpansionModule
  
  
  } from "@angular/material";

  
const MaterialComponents=[
  
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatDividerModule,
  MatChipsModule,
  MatListModule,
  MatMenuModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatExpansionModule
  
 

];


@NgModule({
  
  imports: [MaterialComponents],
  exports:[MaterialComponents]
})
export class MaterialModule { }
