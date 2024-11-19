import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TitleResponseModelSingular } from '../../model/interface/titles';
import { noInvalidPatterns } from '../../shared/validators/special-pattern-validator';
import { ActivatedRoute } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TitleAuthorComponent } from "../title-author/title-author.component";

@Component({
  selector: 'app-title-details',
  standalone: true,
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    TitleAuthorComponent
  ],
  templateUrl: './title-details.component.html',
  styleUrl: './title-details.component.css'
})
export class TitleDetailsComponent implements OnInit {

  titleId: string | null = null

  titleForm: FormGroup

  modSuccess: boolean | null = null

  constructor(private route: ActivatedRoute, private fb: FormBuilder) {
    this.titleForm = this.fb.group({
      title_id: [''],
      title: ['', [Validators.required, Validators.maxLength(80), noInvalidPatterns()]],
      type: ['', [Validators.required, Validators.maxLength(12)]],
      pub_name: ['', [Validators.maxLength(40), noInvalidPatterns()]],
      price: ['', [Validators.min(0), Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      advance: ['', [Validators.min(0), Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      royalty: ['', [Validators.min(0), Validators.pattern(/^\d+$/)]],
      ytd_sales: [''],
      notes: ['', [Validators.maxLength(200), noInvalidPatterns()]],
      pubdate: ['', [Validators.required]],
    });
  }

  readonly http = inject(HttpClient)

  ngOnInit(): void {
    this.titleId = this.route.snapshot.paramMap.get('id');
    if (this.titleId) {
      this.getTitleDetail();
    }
  }

  getTitleDetail(): void {
    this.http.get<TitleResponseModelSingular>(`title/${this.titleId}`).subscribe((res: TitleResponseModelSingular) => {
      const titleData = res.Data
      if (titleData.pubdate) {
        titleData.pubdate = new Date(titleData.pubdate);
      }

      this.titleForm.patchValue(titleData)
    })
  }

  discardChanges(): void {
    this.getTitleDetail()
  }

}
