import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-vacaciones-exist',
  templateUrl: './vacaciones-exist.component.html',
  styleUrls: ['./vacaciones-exist.component.scss']
})
export class VacacionesExistComponent implements OnInit {



  @Input() getPeriodosVacacionesList!: any[];

  
  constructor() { }

  ngOnInit(): void {
  }

}
