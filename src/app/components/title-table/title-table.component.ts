import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { BookTitle, TitleResponseModel } from '../../model/interface/titles';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteTitleDialogComponent } from './delete-title-dialog/delete-title-dialog.component';

@Component({
  selector: 'app-title-table',
  standalone: true,
  imports: [
    HttpClientModule, 
    MatButtonModule, 
    MatIconModule, 
    MatToolbarModule, 
    MatTableModule, 
    RouterModule
  ],
  templateUrl: './title-table.component.html',
  styleUrl: './title-table.component.css'
})
export class TitleTableComponent implements OnInit {
  readonly http = inject(HttpClient)
  readonly dialog = inject(MatDialog);
  titlesList: BookTitle[] = []

  ngOnInit(): void {
    this.getAllTitles()
  }

  getAllTitles(): void {
    this.http.get<TitleResponseModel>('title/table-display').subscribe((res: TitleResponseModel) => {
      this.titlesList = res.Data
    })
  }

  deleteTitle(title_info: BookTitle): void {
    this.http.delete(`title/delete/${title_info.title_id}`).subscribe({
      next: () => {
        this.getAllTitles()
      },
      error: err => console.error(`Error trying to delete author ${title_info.title}`, err)
    });
  }

  openDeleteDialog(title_info: BookTitle, enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DeleteTitleDialogComponent, {
      maxWidth: '80vw',
      width: 'auto',
      enterAnimationDuration,
      exitAnimationDuration,
      data: title_info
    }).afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.deleteTitle(title_info);
      }
    })
  }
}
