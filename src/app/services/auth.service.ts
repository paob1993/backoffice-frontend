import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = environment.baseUrl + '/auth';

  constructor(
    private http: HttpClient
  ) { }

  login(loginData: {email: string, password: string}) {
    return this.http.post(this.url, (loginData))
      .pipe(
        map((results) => results),
        catchError(this.handleError)
      );
  }

  handleError(error: Response | any) {
    return throwError(error?.error);
  }

}
