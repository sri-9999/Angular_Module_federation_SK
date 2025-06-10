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
  bookmarkedFlights: Flight[] = [];
  loading = true;
  error = '';

  constructor(private flightService: FlightSearchService) { }

  ngOnInit(): void {
    this.flightService.getAllFlights().subscribe({
      next: (data) => {
        this.flights = data.map(flight => ({
          ...flight,
          isBookmarked: flight.isBookmarked ?? false
        }));
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load flights';
        this.loading = false;
      }
    });
  }

  bookmarkFlightWhenUserClicks(flight: Flight): void {
    flight.isBookmarked = !flight.isBookmarked;
    // Optionally, call API here to persist the change
    this.flightService.bookmarkFlight(flight.flightNumber, true).subscribe(data => {
      this.bookmarkedFlights.push(data);

    });
  }

  fetchFlight(flightNumber: string) {
    this.flightService.getFlight(flightNumber).subscribe(data => {
      this.bookmarkedFlights.push(data);
    });
  }

}