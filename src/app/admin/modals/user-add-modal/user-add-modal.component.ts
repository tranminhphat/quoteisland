import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/core/models/role';
import { User } from 'src/app/core/models/user';
import { AlertService } from 'src/app/core/services/alert.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { RoleService } from 'src/app/core/services/role.service';
import { UserService } from 'src/app/core/services/user.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    return !!(control?.parent.hasError('passwordMatch') && control?.touched);
  }
}

@Component({
  selector: 'app-user-add-modal',
  templateUrl: './user-add-modal.component.html',
  styleUrls: ['./user-add-modal.component.scss'],
})
export class UserAddModalComponent implements OnInit {
  @Output() userAdded = new EventEmitter();
  addUserForm: FormGroup;
  roles: Role[];
  matcher: any;

  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private userService: UserService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.addUserForm = this.fb.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        username: ['', [Validators.required, Validators.minLength(4)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: [''],
        roles: ['', [Validators.required]],
        photoUrl: ['', [Validators.required]],
      },
      { validators: this.confirmPasswordValidator }
    );
    this.matcher = new MyErrorStateMatcher();
    this.roleService
      .getRoles()
      .subscribe((roles: Role[]) => (this.roles = roles));
  }

  addUser() {
    this.userService.createUser(this.addUserForm.value).subscribe(
      (user: User) => {
        this.alertService.showSuccess('Add user successfully');
        this.userAdded.emit(user);
      },
      (error) => {
        this.alertService.showError('Add user failed');
        console.error(error);
      }
    );
  }

  photoUploaded(response) {
    this.addUserForm.controls['photoUrl'].setValue(response.secureUrl);
  }

  confirmPasswordValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value
      ? null
      : { passwordMatch: true };
  }
}
