import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    return !!(control?.parent.hasError('passwordMatch') && control?.touched);
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  readonly bannerImageUrls = environment.bannerImageUrls.registerPage;
  registerForm: FormGroup;
  matcher: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        username: ['', [Validators.required, Validators.minLength(4)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: [''],
      },
      { validators: this.confirmPasswordValidator }
    );
    this.matcher = new MyErrorStateMatcher();
  }

  register() {
    this.authService.register(this.registerForm.value).subscribe(
      () => {
        console.log('Register successfully');
        this.authService.login(this.registerForm.value).subscribe(() => {
          this.router.navigate(['/']);
        });
      },
      (error) => console.error(error)
    );
  }

  confirmPasswordValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value
      ? null
      : { passwordMatch: true };
  }
}
