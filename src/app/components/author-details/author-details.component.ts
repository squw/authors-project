import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APIResponseModel, Author } from '../../model/interface/authors';

@Component({
  selector: 'app-author-details',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './author-details.component.html',
  styleUrl: './author-details.component.css'
})
export class AuthorDetailsComponent implements OnInit {
  authorId: string | null = null;
  auth_data: Author[] = []

  constructor(private route: ActivatedRoute) {}
  http = inject(HttpClient)


  ngOnInit(): void {
    this.authorId = this.route.snapshot.paramMap.get('id');
    if (this.authorId) {
      this.getAuthDetail();
    }
  }


  getAuthDetail() {
    this.http.get<APIResponseModel>(`author/${this.authorId}`).subscribe((res: APIResponseModel) => {
      this.auth_data = res.Data
    })
  }
}
