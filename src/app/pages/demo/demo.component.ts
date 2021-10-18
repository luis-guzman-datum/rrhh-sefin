import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
})
export class DemoComponent implements OnInit {
  Pokemns: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons() {
    this.api.getPokemons().subscribe(
      (response) => {
        this.Pokemns = response.abilities;
      },
      (error) => {
        this.Pokemns = [];
        alert('Ocurrio un error')
      }
    );
  }
}
