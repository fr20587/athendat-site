// Angular Modules
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Third's Module
import { Observable } from 'rxjs';

// Global Variables
import { environment } from './../../../environments/environment';
const API_KEY = environment.API_KEY || process.env['API_KEY'];

@Injectable({
    providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // Clone the request object
        let newReq = req.clone();

        newReq = req.clone({
            headers: req.headers.set('apiKey', API_KEY)
        });

        return next.handle(newReq);

    }

}
