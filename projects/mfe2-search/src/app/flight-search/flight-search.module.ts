import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlightSearchRoutingModule } from './flight-search-routing.module';
import { FlightSearchComponent } from './flight-search.component';


@NgModule({
  declarations: [
    FlightSearchComponent
  ],
  imports: [
    CommonModule,
    FlightSearchRoutingModule
  ]
})
export class FlightSearchModule { }
