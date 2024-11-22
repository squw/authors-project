import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthorResponseModelSingular } from '../../model/interface/authors';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { noInvalidPatterns } from '../../shared/validators/special-pattern-validator';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-author-details',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule, CommonModule, MatButtonModule, MatToolbarModule],
  templateUrl: './author-details.component.html',
  styleUrl: './author-details.component.css'
})
export class AuthorDetailsComponent implements OnInit {


  authorId: string | null = null


  authorForm: FormGroup;

  modSuccess: boolean | null = null;

  constructor(private route: ActivatedRoute, private fb: FormBuilder) {
    this.authorForm = this.fb.group({
      au_id: ['', [Validators.required, Validators.pattern(/^\d{3}-\d{2}-\d{4}$/)]],  // e.g. "172-32-1176"
      au_lname: ['', [Validators.required, Validators.maxLength(40), Validators.pattern(/^[a-zA-Z]+$/)]],
      au_fname: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/^[a-zA-Z]+$/)]],
      phone: ['', [Validators.pattern(/^\d{3} \d{3}-\d{4}$/)]],  // e.g. "408 496-7223"
      address: ['', [Validators.maxLength(40), noInvalidPatterns()]], // checks for special character patterns
      city: ['', [Validators.maxLength(20), noInvalidPatterns()]], // checks for special character patterns
      state: ['', [Validators.pattern(/^[A-Z]{2}$/)]],  // e.g. "CA"
      zip: ['', [Validators.pattern(/^\d{5}$/)]],  // e.g. "94025"
      contract: [false, Validators.required]
    });
  }

  readonly http = inject(HttpClient)


  ngOnInit(): void {
    this.authorId = this.route.snapshot.paramMap.get('id');
    if (this.authorId) {
      this.getAuthDetail();
    }
  }


  getAuthDetail(): void {
    this.http.get<AuthorResponseModelSingular>(`author/${this.authorId}`).subscribe((res: AuthorResponseModelSingular) => {
      const authorData = res.Data
      this.authorForm.reset(authorData);
    })
  }


  discardChanges(): void {
    this.getAuthDetail();
    // for empty set of authorForm
    //this.authorForm.reset();
  }

  saveChanges(): void {
    if (this.authorId && this.authorForm.valid) {
      this.http.put<AuthorResponseModelSingular>(`author/${this.authorId}/update`, this.authorForm.value).subscribe({
        next: (response) => {
          this.modSuccess = true;
          this.getAuthDetail();
        },
        error: (error) => {
          console.error('Error saving data:', error);
          this.modSuccess = false;
        }
      });
    } else {
      console.log("Form is invalid");
      this.authorForm.markAllAsTouched();
    }
  }
}

