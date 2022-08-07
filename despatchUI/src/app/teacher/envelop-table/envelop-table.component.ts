import { Component, OnInit } from '@angular/core';
import { DespatchEnvelopService } from 'src/app/services/despatch-envelop/despatch-envelop.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-envelop-table',
  templateUrl: './envelop-table.component.html',
  styleUrls: ['./envelop-table.component.sass']
})
export class EnvelopTableComponent implements OnInit {
  envelops: any[] = [];
  user = JSON.parse(localStorage.getItem('currentUser'));
  constructor(private despatchEnvelopService: DespatchEnvelopService) { }

  ngOnInit(): void {
    this.getAllEnvelops();
  }

  getAllEnvelops() {
    let requestBody = {
      created_by: this.user?.id
    };
    this.despatchEnvelopService.getByCreatedBy(requestBody).subscribe(
      (t) => {
        this.envelops = t?.payload?.output ?? [];
      },
      (f) => {
        Swal.fire({ icon: 'error', title: 'Oops...', text: f ?? 'Something went wrong. Please try again later.' });
      }
    );
  }

}
