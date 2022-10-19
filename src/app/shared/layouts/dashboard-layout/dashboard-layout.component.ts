import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent implements OnInit {
  modules: any[] = [{
    name: 'Vehículos',
    path: '/vehicles'
  }]

  constructor() { }

  ngOnInit(): void {
  }

}
