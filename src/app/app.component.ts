import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

//@ts-ignore
import { Ripple, Carousel, initMDB } from 'mdb-ui-kit';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Frontend';

  ngOnInit(): void {
    initMDB({ Ripple });
    initMDB({ Carousel });
  }
}
