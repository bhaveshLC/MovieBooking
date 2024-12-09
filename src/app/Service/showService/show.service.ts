import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ShowService {
  API_URL = 'http://localhost:8080';
  http = inject(HttpClient);
  constructor() {}
  getShow(cityId: string, movieId: string) {
    return this.http.get(`${this.API_URL}/show/${movieId}`, {
      params: { cityId },
    });
  }
  createShow(payload: any) {
    return this.http.post(`${this.API_URL}/show`, payload);
  }
}
