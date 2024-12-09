import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MovieService } from '../../Service/movieService/movie.service';
import { CommonModule } from '@angular/common';
import { CityServiceService } from '../../Service/cityService/city-service.service';
import { ShowService } from '../../Service/showService/show.service';

@Component({
  selector: 'app-add-show',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-show.component.html',
  styleUrl: './add-show.component.css',
})
export class AddShowComponent implements OnInit {
  movieList: any[] = [];
  theaterList: any[] = [];
  cities: any[] = [];
  movieService = inject(MovieService);
  cityService = inject(CityServiceService);
  showService = inject(ShowService);
  bookingForm = new FormGroup({
    movieId: new FormControl('', [Validators.required]),
    cityId: new FormControl('', Validators.required),
    theaterId: new FormControl('', [Validators.required]),
    startTime: new FormControl('', [Validators.required]),
    endTime: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required]),
  });
  ngOnInit(): void {
    this.movieService.getAllMovies().subscribe((res) => {
      this.movieList = res;
    });
    this.cityService.getAllCities().subscribe((res) => {
      this.cities = res;
    });
  }
  getCityTheaters() {
    console.log(this.bookingForm.value);

    this.cityService
      .getCityAllTheater(this.bookingForm.value.cityId)
      .subscribe((res: any) => {
        this.theaterList = res;
      });
  }
  onCreateShow() {
    const showData = {
      movieId: this.bookingForm.value.movieId,
      theaterId: this.bookingForm.value.theaterId,
      startTime: this.bookingForm.value.startTime,
      endTime: this.bookingForm.value.endTime,
      date: this.bookingForm.value.date,
      price: this.bookingForm.value.price,
    };
    this.showService.createShow(showData).subscribe((res) => {
      console.log('Show Created Successfully');
    });
  }
}
