import { Component, inject, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TitleAuthor, TitleAuthorResponseModel } from '../../model/interface/titles';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Author, AuthorResponseModel } from '../../model/interface/authors';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCommonModule, MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-title-author',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatOptionModule,
    MatCommonModule,
    MatSelectModule,
    MatInputModule
  ],
  templateUrl: './title-author.component.html',
  styleUrl: './title-author.component.css'
})
export class TitleAuthorComponent implements OnInit {
  @Input() titleId: string | null = null
  readonly http = inject(HttpClient)

  newTitleAuthorForm: FormGroup
  availableAuthors: Author[] = [];
  titleAuthorsList: TitleAuthor[] = []

  constructor(private fb: FormBuilder) {
    this.newTitleAuthorForm = this.fb.group({
      au_id: [''],
      au_ord: [null, Validators.min(1)],
      royaltyper: [null, Validators.min(0)]
    })
  }

  

  ngOnInit(): void {
    this.getAllTitleAuthors();
    this.getAvailableAuthors();
  }

  getAllTitleAuthors(): void {
    this.http.get<TitleAuthorResponseModel>(`title/${this.titleId}/author`).subscribe({
      next: (res: TitleAuthorResponseModel) => {
        this.titleAuthorsList = res.Data;
        this.newTitleAuthorForm.patchValue({ au_ord: this.getNextOrderCount() });
      },
      error: (err) => console.error('Error fetching title authors:', err)
    });
  }

  getAvailableAuthors(): void {
    this.http.get<AuthorResponseModel>('/author/table-display').subscribe({
      next: (res: AuthorResponseModel) => {
        this.availableAuthors = res.Data;
      },
      error: (err) => console.error('Error fetching authors:', err)
    });
  }

  getNextOrderCount(): number {
    // If there are no entries, start from 1
    return this.titleAuthorsList.length + 1;
  }

  // Shell function for future add functionality
  onAddButtonClick(): void {
    console.log('Add button clicked. Future implementation here.');
  }


}
