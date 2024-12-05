import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: any = {
    username: null,
    email: null,
    password: null,
    dateOfBirth: null,
    ageInYears: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService) { }

  onSubmit(): void {
    const selectedDateStr: string = this.form.selectedDate;

    const [year, month, day] = selectedDateStr.split('-').map(part => parseInt(part, 10));

    const birthDate: Date = new Date(year, month - 1, day);

    const currentDate: Date = new Date();

    const timeDiff: number = currentDate.getTime() - birthDate.getTime();

    this.form.ageInYears = Math.floor(timeDiff / (1000 * 3600 * 24 * 365.25));

    if (this.form.ageInYears < 18 || this.form.ageInYears > 100) {
      return;
    }

    const { username, email, password, ageInYears } = this.form;

    if (this.form.ageInYears > 18) {

      this.authService.register(username, email, password, ageInYears).subscribe({
        next: data => {
          console.log(data);
          this.isSuccessful = true;
          this.isSignUpFailed = false;
        },
        error: err => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      }); 
    } 
  }
}
