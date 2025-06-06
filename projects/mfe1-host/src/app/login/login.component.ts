import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  //showPassword = false; // <-- Add this line

  onLogin(form: any) {
    console.log('Login data:', form.value);
    // Add your authentication logic here
  }
}
