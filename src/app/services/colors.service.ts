import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ColorsService {
  private url = environment.baseUrl + '/colors';

  constructor(
    private http: HttpClient
  ) { }

  getColors() {
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
