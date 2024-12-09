import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CityServiceService {
  private API_URL = 'http://localhost:8080';
  http = inject(HttpClient);

  constructor() {}

  getAllCities(): Observable<any> {
    return this.http.get(`${this.API_URL}/city`);
  }
  getCityMovie(cityId: string): Observable<any> {
    return this.http.get(`${this.API_URL}/city/movies/${cityId}`);
  }
  addNewCity(name: string): Observable<any> {
    console.log(name);

    return this.http.post(`${this.API_URL}/city`, { name: name });
  }
  getCity(cityId: string) {
    return this.http.get(`${this.API_URL}/city/current`, {
      params: { cityId },
    });
  }
  getCityAllTheater(cityId: any) {
    return this.http.get(`${this.API_URL}/city/${cityId}`);
  }
}
