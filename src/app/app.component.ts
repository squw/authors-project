import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { TableComponent } from "./components/table/table.component";
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TableComponent, RouterModule, RouterLink, CommonModule, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'authors-project';
  isAuthorDetailsPage = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Listen to router events to detect the current route
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Check if the current route is the author details page
        this.isAuthorDetailsPage = event.urlAfterRedirects.startsWith('/author/');
      });
  }
}
