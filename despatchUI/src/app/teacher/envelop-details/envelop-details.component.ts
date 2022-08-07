import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DespatchEnvelopService } from 'src/app/services/despatch-envelop/despatch-envelop.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-envelop-details',
  templateUrl: './envelop-details.component.html',
  styleUrls: ['./envelop-details.component.sass']
})
export class EnvelopDetailsComponent implements OnInit {

  id: number = null;
  envelop: any = null;
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, 
    private despatchEnvelopService: DespatchEnvelopService,
    private _route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [null],
      letter_no: [null, [Validators.required]],
      date_time_group: [null],
      originator_no: [null],
      from_address: [null],
      to_address: [null],
      precedance: [null],
      security_classification: [null],
      time_of_receive: [null],
      despatch_status: [null],
      time_of_delivery: [null],
      created_by: [null],
    });
    this._route.paramMap.subscribe(
      (params: ParamMap) => {
        this.id = Number(params.get('id'));
        if(this.id){
          this.getEnvelopById();
        }
      }
    );
  }

  getEnvelopById() {
    let requestBody = {
      id: this.id
    }
    this.despatchEnvelopService.getById(requestBody).subscribe(
      (t) => {
        this.envelop = t?.payload?.output ?? null;
        this.form.patchValue(this.envelop);
      },
      (f) => {
        Swal.fire({ icon: 'error', title: 'Oops...', text: f ?? 'Something went wrong. Please try again later.' });
      }
    );
  }
}
