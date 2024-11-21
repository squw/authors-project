import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { noInvalidPatterns } from '../../shared/validators/special-pattern-validator';
import { catchError, debounceTime, map, of, switchMap } from 'rxjs';
import { AuthorResponseModelBool } from '../../model/interface/authors';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-create-author',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule, CommonModule, MatButtonModule, MatToolbarModule],
  templateUrl: './create-author.component.html',
  styleUrl: './create-author.component.css'
})
export class CreateAuthorComponent {
  authorForm: FormGroup;

  creationSuccess: boolean | null = null;

  constructor(private route: ActivatedRoute, private fb: FormBuilder) {
    this.authorForm = this.fb.group({
      au_id: ['', [Validators.required, Validators.pattern(/^\d{3}-\d{2}-\d{4}$/)], [this.duplicateIdValidator()]],  // e.g. "172-32-1176"
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


  insertAuthorDetail(): void {
    if (this.authorForm.valid) {
      this.http.post('/author/create', this.authorForm.value).subscribe({
        next: (response) => {
          this.creationSuccess = true;
          this.authorForm.reset();
        },
        error: (error) => {
          this.creationSuccess = false;
        }
      });
    } else {
      console.log("Form is invalid");
      this.authorForm.markAllAsTouched();
    }
  }


  duplicateIdValidator(): AsyncValidatorFn {
    return (control) => {
      if (!control.value) return of(null);

      return of(control.value).pipe(
        debounceTime(300), // Avoid sending requests too often

        switchMap((id) =>
          this.http.get<AuthorResponseModelBool>(`/author/check-id/${id}`).pipe(
            map((response) => {
              return response.Exists ? { duplicateId: true } : null;
            }),
            catchError(() => of(null))
          )
        )
      );
    };
  }

}
