import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * RoutesApiService is a service class that handles API requests for route information.
 * It is responsible for making HTTP requests to retrieve route data from the server.
 *
 * @constructor
 * @param {HttpClient} http - The HttpClient module for making HTTP requests.
 */
@Injectable({
     providedIn: 'root',
})
export class RoutesApiService {
     constructor(private http: HttpClient) {}

     requestRoutesInfo(): Observable<string> {
          return this.http.get('assets/sea-routes/web_challenge.csv', {
               responseType: 'text',
          });
     }
}
