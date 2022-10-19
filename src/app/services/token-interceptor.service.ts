import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(
    private router: Router
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = JSON.parse(localStorage.getItem('token') || '');

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token ? token : ''}`,
        },
      });
    }

    return next.handle(req).pipe(
      catchError((error) => {
        Swal.fire({
          title: 'Error',
          text: 'Error al procesar su solicitud',
          icon: 'error',
          timer: 3000
        });
        localStorage.clear();
        this.router.navigate(['/']);        
        return throwError(error);
      })
    );
  }
}
