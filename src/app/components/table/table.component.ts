import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { AIPResponseModel, Author } from '../../model/interface/authors';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit {
  authorList: Author[] = []

  ngOnInit(): void {
    this.apiService.getAuthors().subscribe(
      (result: AIPResponseModel) => {
        if (result.Result) {  // Check if the response was successful
          this.authorList = result.Data;
        } else {
          alert('Failed to retrieve data');
        }
      },
      (error) => {
        alert('API error / Network Down');
        console.error('API Error:', error);
      }
    );
  }

  apiService = inject(ApiService)

}
