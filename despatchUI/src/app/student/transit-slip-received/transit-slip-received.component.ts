import { Component, OnInit } from '@angular/core';
import { TransitSlipService } from 'src/app/services/transit-slip/transit-slip.service';
import { UserInfoService } from 'src/app/services/user-info/user-info.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transit-slip-received',
  templateUrl: './transit-slip-received.component.html',
  styleUrls: ['./transit-slip-received.component.sass']
})
export class TransitSlipReceivedComponent implements OnInit {
  transitSlips: any[] = [];
  users: any[] = [];
  user = JSON.parse(localStorage.getItem('currentUser'));
  constructor(private transitSlipService: TransitSlipService, private userInfoService: UserInfoService) { }

  ngOnInit(): void {
    // this.getAllUser();
    this.getAllTsForUser();
  }

  getAllTsForUser() {
    if (this.user?.id) {
      let requestBody = {
        transit_to: this.user?.id
      };
      this.transitSlipService.getAllTransitToByUser(requestBody).subscribe(
        (res: any) => {
          this.transitSlips = res?.payload?.output ?? [];
        },
        (err: any) => {
          Swal.fire({ icon: 'error', title: 'Oops...', text: err ?? 'Something went wrong. Please try again later.' });
        }
      );
    }
  }

  // getAllUser() {
  //   this.userInfoService.getAll().subscribe(
  //     (res: any) => {
  //       this.users = res?.payload?.output ?? [];
  //     },
  //     (err: any) => {
  //       Swal.fire({ icon: 'error', title: 'Oops...', text: err ?? 'Something went wrong. Please try again later.' });
  //     }
  //   );
  // }

  // getUserFullName(id: number) {
  //   console.log('hi');
  //   console.log(this.users);
    
    
  //   return this.users.find(x => x.id === id)?.user_full_name;
  // }
}
