import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { APIResponseModel, Author } from '../../model/interface/authors';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [HttpClientModule, RouterModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit {
  http = inject(HttpClient)
  authorsList: Author[] = []

  ngOnInit(): void {
    this.getAllAuthors()
  }

  getAllAuthors() {
    this.http.get<APIResponseModel>("author_table_display").subscribe((res: APIResponseModel) => {
      this.authorsList = res.Data
    })
  }
}
