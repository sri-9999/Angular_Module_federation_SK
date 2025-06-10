import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Flight } from './flight.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightSearchService {
  private apiUrl = 'http://localhost:8080/service/flights';

  constructor(private http: HttpClient) { }

  // GET all flights
  getAllFlights(): Observable<Flight[]> {
    return this.http.get<Flight[]>(this.apiUrl);
  }

  // GET flight by number
  getFlight(flightNumber: string): Observable<Flight> {
    return this.http.get<Flight>(`${this.apiUrl}/${flightNumber}`);
  }

  // POST add new flight
  addFlight(flight: Flight): Observable<Flight> {
    return this.http.post<Flight>(this.apiUrl, flight);
  }

  // PUT update flight
  updateFlight(flightNumber: string, flight: Flight): Observable<Flight> {
    return this.http.put<Flight>(`${this.apiUrl}/${flightNumber}`, flight);
  }

  // DELETE flight
  deleteFlight(flightNumber: string): Observable<string> {
    return this.http.delete(`${this.apiUrl}/${flightNumber}`, { responseType: 'text' });
  }

  bookmarkFlight(flightNumber: string, bookmark: boolean): Observable<Flight> {
    return this.http.get<Flight>(`${this.apiUrl}/${flightNumber}`);
  }
}