import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Role } from 'src/app/core/models/role';
import { User } from 'src/app/core/models/user';
import { AlertService } from 'src/app/core/services/alert.service';
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
  selector: 'app-user-edit-modal',
  templateUrl: './user-edit-modal.component.html',
  styleUrls: ['./user-edit-modal.component.scss'],
})
export class UserEditModalComponent implements OnInit {
  editUserForm: FormGroup;
  matcher: any;
  roles: Role[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: User,
    private fb: FormBuilder,
    private roleService: RoleService,
    private userService: UserService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.editUserForm = this.fb.group(
      {
        username: [
          this.data.username,
          [Validators.required, Validators.minLength(4)],
        ],
        firstName: [this.data.firstName, [Validators.required]],
        lastName: [this.data.lastName, [Validators.required]],
        password: ['', [Validators.minLength(6)]],
        confirmPassword: [''],
        roles: [this.data.roles.map((role) => role._id), [Validators.required]],
        photoUrl: [this.data.photoUrl],
      },
      { validators: [this.confirmPasswordValidator] }
    );
    this.matcher = new MyErrorStateMatcher();
    this.roleService
      .getRoles()
      .subscribe((roles: Role[]) => (this.roles = roles));
  }

  editUser() {
    this.userService.editUser(this.data._id, this.editUserForm.value).subscribe(
      (user: User) => {
        this.alertService.showSuccess('Edit user successfully');
      },
      (error) => this.alertService.showError('Edit user failed')
    );
  }

  photoUploaded(response) {
    this.editUserForm.controls['photoUrl'].setValue(response.secureUrl);
  }

  confirmPasswordValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value
      ? null
      : { passwordMatch: true };
  }
}
