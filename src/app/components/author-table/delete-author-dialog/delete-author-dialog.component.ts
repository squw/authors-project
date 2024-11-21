import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { Author, AuthorResponseModelBool } from '../../../model/interface/authors';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [HttpClientModule, MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, CommonModule],
  templateUrl: './delete-author-dialog.component.html',
  styleUrl: './delete-author-dialog.component.css'
})
export class DeleteAuthorDialogComponent implements OnInit {
  exists = false;

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<DeleteAuthorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public author: Author
  ) { }

  ngOnInit(): void {
    this.checkIfDeletable();
  }

  checkIfDeletable(): void {
    this.http.get<AuthorResponseModelBool>(`author/check-titles/${this.author.au_id}`).subscribe({
      next: (response) => {
        this.exists = response.Exists
      },
      error: (err) => {
        console.error('Error checking author status: ', err)
      }
    });
  }

}
