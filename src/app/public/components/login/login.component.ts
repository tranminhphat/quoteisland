import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { AlertService } from 'src/app/core/services/alert.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  readonly bannerImageUrls = environment.bannerImageUrls.loginPage;
  loginForm: FormGroup;
  usernameFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required]);

  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: this.usernameFormControl,
      password: this.passwordFormControl,
    });
  }

  login() {
    this.authService.login(this.loginForm.value).subscribe(
      () => {
        this.alertService.showSuccess('Login successfully');
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Login failed');
        this.alertService.showError('Login failed');
      }
    );
  }
}
