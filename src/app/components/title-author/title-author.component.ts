import { Component, inject, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TitleAuthor, TitleAuthorResponseModel } from '../../model/interface/titles';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-title-author',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './title-author.component.html',
  styleUrl: './title-author.component.css'
})
export class TitleAuthorComponent implements OnInit {
  @Input() titleId: string | null = null
  readonly http = inject(HttpClient)

  titleAuthorsList: TitleAuthor[] = []

  ngOnInit(): void {
    this.getAllAuthors()
  }

  getAllAuthors(): void {

    this.http.get<TitleAuthorResponseModel>(`title/${this.titleId}/author`).subscribe((res: TitleAuthorResponseModel) => {
      this.titleAuthorsList = res.Data
    })
  }
}
