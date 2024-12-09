import { Component, inject, OnInit } from '@angular/core';
import { MovieService } from '../Service/movieService/movie.service';
import { ActivatedRoute } from '@angular/router';
import {
  AsyncPipe,
  CommonModule,
  CurrencyPipe,
  DatePipe,
} from '@angular/common';
import { ShowService } from '../Service/showService/show.service';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, DatePipe, AsyncPipe],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css',
})
export class MovieDetailsComponent implements OnInit {
  movieService = inject(MovieService);
  showService = inject(ShowService);
  router = inject(ActivatedRoute);
  movie: any;
  duration = 0;
  cityId = localStorage.getItem('city') || '';
  shows: any[] = [];
  ngOnInit(): void {
    const movieId = this.router.snapshot.params['movieId'];

    this.movieService.getMovieDetails(movieId).subscribe((res) => {
      this.movie = res;
      this.duration = Number(res.duration);
      const hh = Math.floor(this.duration / 60);
      const mm = this.duration % 60;
      this.movie.duration = `${hh}h ${mm}m`;
    });
    this.getShowDetails(movieId);
    console.log(this.shows.length);
  }
  getShowDetails(movieId: string) {
    this.showService.getShow(this.cityId, movieId).subscribe((res: any) => {
      this.shows = res;
    });
  }
}
