import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  getUsers() {
    this.userService.getUsers().subscribe((res) => console.log(res));
  }
}
