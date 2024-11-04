import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APIResponseModelSingular, Author } from '../../model/interface/authors';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-author-details',
  standalone: true,
  imports: [HttpClientModule, FormsModule],
  templateUrl: './author-details.component.html',
  styleUrl: './author-details.component.css'
})
export class AuthorDetailsComponent implements OnInit {


  authorId: string | null = null

  auth_data: Author = {
    au_id: '',
    au_lname: '',
    au_fname: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    contract: false
  };

  constructor(private route: ActivatedRoute) {}
  
  http = inject(HttpClient)


  ngOnInit(): void {
    this.authorId = this.route.snapshot.paramMap.get('id');
    if (this.authorId) {
      this.getAuthDetail();
    }
  }


  getAuthDetail(): void {
    this.http.get<APIResponseModelSingular>(`author/${this.authorId}`).subscribe((res: APIResponseModelSingular) => {
      this.auth_data = res.Data
    })
  }

  onStatusChange(): void {
    console.log('Status changed:', this.auth_data.contract);
    // save to server script
  }

  discardChanges(): void {
    this.getAuthDetail();
  }
}
