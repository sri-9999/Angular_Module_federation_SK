import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.scss']
})
export class BookmarkComponent  {
  flightForm: FormGroup;
  bookingSummary: any = null;

  constructor(private fb: FormBuilder) {
    this.flightForm = this.fb.group({
      from: ['', Validators.required],
      to: ['', Validators.required],
      date: ['', Validators.required],
      passengers: ['1', Validators.required]
    });
  }

  onSubmit() {
    if (this.flightForm.valid) {
      this.bookingSummary = this.flightForm.value;
      this.flightForm.reset({ passengers: '1' });
    }
  }
}
