import { Component } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {


  constructor(private builder: FormBuilder, private service: AuthService, private router: Router,
    private toastr: ToastrService) {

  }

  registerform = this.builder.group({
    userId: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(3)])),
    password: this.builder.control('', Validators.compose([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])),
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    role: this.builder.control(''),
    isactive: this.builder.control(false)
  });

  proceedregister() {
    if (this.registerform.valid) {
      this.service.registerUser(this.registerform.value).subscribe(result => {
        this.toastr.success('Please continue to login.', 'Registered successfully')
        this.router.navigate(['login'])
      });
    } else {
      this.toastr.warning('Please enter valid data. Username should be at least 3 characters long, password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character, email should be valid.', 'Invalid data')
    }
  }

}
