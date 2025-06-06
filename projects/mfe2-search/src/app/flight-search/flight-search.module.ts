import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlightSearchRoutingModule } from './flight-search-routing.module';
import { FlightSearchComponent } from './flight-search.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    FlightSearchComponent
  ],
  imports: [
    CommonModule,
    FlightSearchRoutingModule,
    HttpClientModule
  ]
})
export class FlightSearchModule { }
