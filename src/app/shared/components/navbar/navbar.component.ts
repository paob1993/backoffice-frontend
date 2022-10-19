import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() modules: any[];
  isOpen: boolean = false;
  user: any;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logOut(): void {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  openMobileMenu(): void {
    this.isOpen = !this.isOpen;
  }

}
