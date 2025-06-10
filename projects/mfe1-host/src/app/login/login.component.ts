import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private service: AuthService, private router: Router,
    private toastr: ToastrService) {
    sessionStorage.clear();
  }

  result: any;

  //showPassword = false; // <-- Add this line

  onLogin(form: any) {
    console.log('Login data:', form.value);
    // Add your authentication logic here
  }

  proceedlogin(form: any) {
    if (form.value.userId == null || form.value.password == null) {
      this.toastr.warning('Please enter valid credentials', 'Invalid data');
      return;
    } else if (form.value.userId.length < 3 || form.value.password.length < 8) {
      this.toastr.warning('Username should be at least 3 characters long and password should be at least 8 characters long', 'Invalid data');
      return;
    }

    this.service.loginUser(form.value).subscribe(res => {
      this.result = res;
      if (this.result.authStatus && this.result.active) {
        console.log('Login successful:', this.result);
        sessionStorage.setItem('userId', this.result.userId);
        sessionStorage.setItem('role', this.result.role != null ? this.result.role : 'user');
        this.router.navigate(['home']);
      } else if (this.result.authStatus && !this.result.active) {
        this.toastr.error('Please contact Admin', 'Inactive user');
      } else {
        this.toastr.error('Invalid credentials');
      }
    });
  }

}
