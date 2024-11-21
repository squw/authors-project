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
import { DeleteTitleAuthorDialogComponent } from './delete-title-author-dialog/delete-title-author-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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
  readonly dialog = inject(MatDialog);

  newTitleAuthorForm: FormGroup
  availableAuthors: Author[] = [];
  titleAuthorsList: TitleAuthor[] = []

  constructor(private fb: FormBuilder) {
    this.newTitleAuthorForm = this.fb.group({
      au_id: ['', Validators.required],
      au_ord: [null, Validators.min(1)],
      royaltyper: [0, [Validators.min(0), Validators.max(100), Validators.pattern(/^\d+$/)]]
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
        this.newTitleAuthorForm.patchValue({ royaltyper: 0 })
      },
      error: (err) => console.error('Error fetching title authors:', err)
    });
  }

  getAvailableAuthors(): void {
    this.http.get<AuthorResponseModel>('/author/table-display').subscribe({
      next: (res: AuthorResponseModel) => {
        const existingAuthorIds = new Set(this.titleAuthorsList.map(author => author.au_id));

        this.availableAuthors = res.Data.filter(author => !existingAuthorIds.has(author.au_id));
      },
      error: (err) => console.error('Error fetching authors:', err)
    });
  }

  getNextOrderCount(): number {
    // If there are no entries, start from 1
    return this.titleAuthorsList.length + 1;
  }


  addTitleAuthor(): void {
    if (this.newTitleAuthorForm.valid) {
      this.http.post(`title/${this.titleId}/author/add`, this.newTitleAuthorForm.value).subscribe({
        next: (response) => {
          console.log('Author added to title successfully:', response);

          this.getAllTitleAuthors();
          this.getAvailableAuthors();
          this.newTitleAuthorForm.reset();
          this.newTitleAuthorForm.patchValue({ au_order: this.getNextOrderCount() });
        },
        error: (error) => {
          console.error('Error adding author to title:', error);
        }
      })
    } else {
      console.error('Form is invalid!');
    }
  }


  deleteTitleAuthor(title_author_info: TitleAuthor): void {
    this.http.delete(`title/${this.titleId}/author/delete/${title_author_info.au_id}`).subscribe({
      next: () => {
        this.getAllTitleAuthors();
        this.getAvailableAuthors();
      },
      error: err => console.error(`Error trying to delete author ${title_author_info.au_fname} ${title_author_info.au_fname} from title`, err)
    })
  }

  openDeleteDialog(title_author_info: TitleAuthor, enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DeleteTitleAuthorDialogComponent, {
      maxWidth: '80vw',
      width: 'auto',
      enterAnimationDuration,
      exitAnimationDuration,
      data: title_author_info
    }).afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.deleteTitleAuthor(title_author_info);
      }
    })
  }

}
