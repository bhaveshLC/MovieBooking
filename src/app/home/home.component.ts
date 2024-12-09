import { FormsModule } from '@angular/forms';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MovieService } from '../Service/movieService/movie.service';
import { Router } from '@angular/router';
import { CityServiceService } from '../Service/cityService/city-service.service';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from '../resuable/carousel/carousel.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule, CarouselComponent, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  movieService = inject(MovieService);
  cityService = inject(CityServiceService);
  movies: any[] = [];
  cities: any[] = [];
  city = localStorage.getItem('city');
  router = inject(Router);
  isAddBtnVisible = signal<boolean>(true);
  ngOnInit(): void {
    this.movieService.getAllMovies().subscribe((res) => {
      this.movies = res;
      console.log(res);
    });
    this.getCityMovies(this.city || '');
    this.getCities();
  }
  onView(movieId: any) {
    this.router.navigateByUrl(`movie/${movieId}`);
  }
  getCities() {
    this.cityService.getAllCities().subscribe((res) => {
      this.cities = res;
    });
    console.log(this.filteredCities);
  }
  getCityMovies(cityId: string) {
    console.log(cityId);

    this.cityService.getCityMovie(cityId).subscribe((res: any) => {
      this.movies = res;
    });
  }
  searchTerm: string = '';
  filteredCities: any[] = [];
  addNewCity(city: string) {
    this.cityService.addNewCity(city).subscribe(
      (res) => {
        alert('New City Added.');
      },
      (error) => {
        console.log(error);
      }
    );
  }
  onSearchChange(): void {
    this.isAddBtnVisible.set(true);
    if (this.searchTerm) {
      this.filteredCities = this.cities.filter((city) =>
        city.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      if (this.filteredCities.length == 0) {
      }
    } else {
      this.filteredCities = [];
    }
  }
  selectCity(city: any) {
    this.searchTerm = city.name;
    localStorage.setItem('city', city._id);
    this.filteredCities = [];
    this.isAddBtnVisible.set(false);
    this.getCityMovies(city._id);
  }
}
