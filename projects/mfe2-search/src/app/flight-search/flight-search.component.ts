import { Component, OnInit } from '@angular/core';
import { FlightSearchService } from '../service/flight-search.service';
import { Flight } from '../service/flight.model';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.scss']
})
export class FlightSearchComponent implements OnInit {
  flights: Flight[] = [];
  loading = true;
  error = '';

  constructor(private flightService: FlightSearchService) {}

  ngOnInit(): void {
    this.flightService.getAllFlights().subscribe({
      next: (data) => {
        this.flights = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load flights';
        this.loading = false;
      }
    });
  }
}