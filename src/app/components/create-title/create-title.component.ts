import { Component, inject, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { noInvalidPatterns } from '../../shared/validators/special-pattern-validator';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Publisher, PublisherResponseModel } from '../../model/interface/publishers';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { catchError, debounceTime, map, of, switchMap } from 'rxjs';
import { TitleResponseModelBool } from '../../model/interface/titles';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-create-title',
  standalone: true,
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatToolbarModule,
    MatNativeDateModule,
    MatButtonModule,
    MatInputModule
  ],
  templateUrl: './create-title.component.html',
  styleUrl: './create-title.component.css'
})
export class CreateTitleComponent implements OnInit {
  
  titleForm: FormGroup

  allPublishers: Publisher[] = []

  creationSuccess: boolean | null = null

  readonly http = inject(HttpClient)

  constructor(private fb: FormBuilder) {
    this.titleForm = this.fb.group({
      title_id: ['', [Validators.required, Validators.pattern(/^[A-Z]{2}\d{4}$/)]],
      title: ['', [Validators.required, Validators.maxLength(80), noInvalidPatterns()]],
      type: ['', [Validators.required, Validators.maxLength(12)]],
      pub_id: [''],
      price: ['', [Validators.min(0), Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      advance: ['', [Validators.min(0), Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      royalty: ['', [Validators.min(0), Validators.pattern(/^\d+$/)]],
      ytd_sales: ['', [Validators.min(0), Validators.pattern(/^\d+$/)]],
      notes: ['', [Validators.maxLength(200), noInvalidPatterns()]],
      pubdate: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAllPublishers();

    this.titleForm.get('type')?.valueChanges.subscribe(async (type) => {
      if (type) {
        await this.generateUniqueTitleId(type);
      }
    });
  }

  getAllPublishers(): void {
    this.http.get<PublisherResponseModel>(`publisher/table-display`).subscribe((res: PublisherResponseModel) => {
      this.allPublishers = res.Data
    })
  }

  insertTitleDetail(): void {
    const formattedData = {
      title_id: this.titleForm.get('title_id')?.value,
      title: this.titleForm.get('title')?.value,
      type: this.titleForm.get('type')?.value,
      pub_id: this.titleForm.get('pub_id')?.value,
      price: this.titleForm.get('price')?.value,
      advance: this.titleForm.get('advance')?.value,
      royalty: this.titleForm.get('royalty')?.value,
      ytd_sales: this.titleForm.get('ytd_sales')?.value,
      notes: this.titleForm.get('notes')?.value,
      pubdate: this.titleForm.get('pubdate')?.value instanceof Date
        ? this.titleForm.get('pubdate')?.value.toISOString() // convert to sql server date format if necessary
        : this.titleForm.get('pubdate')?.value
    }
    if (this.titleForm.valid) {
      this.http.post('title/create', formattedData).subscribe({
        next: (response) => {
          this.creationSuccess = true;
          this.titleForm.reset();
        },
        error: (error) => {
          this.creationSuccess = false;
        }
      });
    } else {
      console.log("Form is invalid");
      this.titleForm.markAllAsTouched();
    }
  }

  async generateUniqueTitleId(type: string): Promise<void> {
    const typeAcronyms: { [key: string]: string } = {
      business: 'BU',
      mod_cook: 'MC',
      popular_comp: 'PC',
      psychology: 'PS',
      trad_cook: 'TC',
      UNDECIDED: 'UN'
    };
  
    const acronym = typeAcronyms[type] || 'UN'; // Default to 'UN' if type is not recognized
  
    let isUnique = false;
    let generatedId = '';
  
    while (!isUnique) {
      const randomNumber = Math.floor(1000 + Math.random() * 9000); // Generate random 4-digit number
      generatedId = `${acronym}${randomNumber}`;
  
      try {
        // Check uniqueness via the duplicateIdValidator logic
        const response = await this.http
          .get<TitleResponseModelBool>(`/title/check-id/${generatedId}`)
          .toPromise();
  
        isUnique = response?.Exists === false; // ID is unique if response.Exists is false
      } catch (error) {
        console.error('Error checking ID uniqueness:', error);
        isUnique = true; // Assume it's unique if the server call fails
      }
    }
  
    this.titleForm.patchValue({ title_id: generatedId }); // Set the value in the form
  }
  
  
  
}
