import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { BookTitle, TitleResponseModel } from '../../model/interface/titles';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-title-table',
  standalone: true,
  imports: [HttpClientModule, MatButtonModule, MatIconModule, MatToolbarModule, MatTableModule, RouterModule],
  templateUrl: './title-table.component.html',
  styleUrl: './title-table.component.css'
})
export class TitleTableComponent implements OnInit {
  readonly http = inject(HttpClient)
  // readonly dialog = inject(MatDialog)
  titlesList: BookTitle[] = []

  ngOnInit(): void {
    this.getAllTitles()
  }

  getAllTitles(): void {
    this.http.get<TitleResponseModel>('title/table-display').subscribe((res: TitleResponseModel) => {
      this.titlesList = res.Data
    })
  }
}
