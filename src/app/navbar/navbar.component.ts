import { Component, inject, OnInit, signal } from '@angular/core';
//@ts-ignore
import { Modal, Ripple, initMDB } from 'mdb-ui-kit';
import { CityServiceService } from '../Service/cityService/city-service.service';
import { FormsModule } from '@angular/forms';
import { AddShowComponent } from '../resuable/add-show/add-show.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule, CommonModule, AddShowComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  cityId = localStorage.getItem('city') || '';
  currentCity: string = '';
  cityService = inject(CityServiceService);
  cities: any[] = [];
  isAddBtnVisible = signal<boolean>(true);
  ngOnInit(): void {
    initMDB({ Modal, Ripple });
    this.cityService.getCity(this.cityId).subscribe((res: any) => {
      this.currentCity = res?.name;
    });
    this.getCities();
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
    } else {
      this.filteredCities = [];
    }
    console.log(this.filteredCities);
  }
  selectCity(city: any) {
    this.searchTerm = city.name;
    localStorage.setItem('city', city._id);
    this.filteredCities = [];
    this.isAddBtnVisible.set(false);
  }
  getCities() {
    this.cityService.getAllCities().subscribe((res) => {
      this.cities = res;
      console.log(this.cities);
    });
  }
}
