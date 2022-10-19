import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Vehicle } from '../models/vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {
  private url = environment.baseUrl + '/vehicles';

  constructor(
    private http: HttpClient
  ) { }

  addVehicle(vehicle: Vehicle) {
    return this.http.post(this.url, (vehicle))
        .pipe(
          map((results) => results),
          catchError(this.handleError)
        );
  }

  getVehicle(id: string) {
    return this.http.get(`${this.url}/${id}`)
      .pipe(
        map((results) => results),
        catchError(this.handleError)
      );
  }

  editVehicle(id: string, vehicle: Vehicle) {
    return this.http.patch(`${this.url}/${id}`, (vehicle))
      .pipe(
        map((results) => results),
        catchError(this.handleError)
      );
  }

  deleteVehicle(id: string) {
    return this.http.delete(`${this.url}/${id}`)
      .pipe(
        map((results) => results),
        catchError(this.handleError)
      );
  }

  getVehicles() {
    return this.http.get(this.url)
      .pipe(
        map((results) => results),
        catchError(this.handleError)
      );
  }

  handleError(error: Response | any) {
    return throwError(error?.error);
  }
}
