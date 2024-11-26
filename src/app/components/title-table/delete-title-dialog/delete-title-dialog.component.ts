import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { BookTitle, TitleResponseModel, TitleResponseModelBool } from '../../../model/interface/titles';

@Component({
  selector: 'app-delete-title-dialog',
  standalone: true,
  imports: [
    HttpClientModule, 
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    CommonModule
  ],
  templateUrl: './delete-title-dialog.component.html',
  styleUrl: './delete-title-dialog.component.css'
})
export class DeleteTitleDialogComponent implements OnInit {

  exists = false;

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<DeleteTitleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public title: BookTitle
  ) { }

  ngOnInit(): void {
    this.checkIfDeletable();
  }

  checkIfDeletable(): void {
    this.http.get<TitleResponseModelBool>(`title/check-sales/${this.title.title_id}`).subscribe({
      next: (response) => {
        this.exists = response.Exists
      },
      error: (err) => {
        console.error('Error checking title status: ', err)
      }
    });
  }

}
