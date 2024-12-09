import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private API_URL = 'http://localhost:8080';
  http = inject(HttpClient);

  constructor() {}

  getAllMovies(): Observable<any> {
    return this.http.get(`${this.API_URL}/movie`);
  }
  getMovieDetails(movieId: any): Observable<any> {
    return this.http.get(`${this.API_URL}/movie/${movieId}`);
  }
}
