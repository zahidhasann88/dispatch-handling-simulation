import { Component, OnInit } from '@angular/core';
import { UserInfoService } from 'src/app/services/user-info/user-info.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.sass']
})
export class UserListComponent implements OnInit {

  users: any[] = [];

  constructor(private userInfoService: UserInfoService) { }

  ngOnInit(): void {
    this.getAllUser();
  }

  getAllUser() {
    this.userInfoService.getAll().subscribe(
      (t) => {
        this.users = t?.payload?.output ?? [];
      },
      (f) => {
        Swal.fire({ icon: 'error', title: 'Oops...', text: f ?? 'Something went wrong. Please try again later.' });
      }
    );
  }

}
