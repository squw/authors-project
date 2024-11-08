import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { noInvalidPatterns } from '../../shared/validators/special-pattern-validator';

@Component({
  selector: 'app-create-author',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule],
  templateUrl: './create-author.component.html',
  styleUrl: './create-author.component.css'
})
export class CreateAuthorComponent {
  authorForm: FormGroup;

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

  http = inject(HttpClient)


  insertAuthorDetail(): void {
    if (this.authorForm.valid) {
      this.http.post('/author/create', this.authorForm.value).subscribe({
        next: (response) => {
          console.log('Author created successfully:', response);
          this.authorForm.reset();
        },
        error: (error) => {
          console.error('Error creating author:', error);
        }
      });
    } else {
      console.log("Form is invalid");
      this.authorForm.markAllAsTouched();
    }
  }
}
