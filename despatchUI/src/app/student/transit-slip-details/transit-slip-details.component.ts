import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TransitSlipService } from 'src/app/services/transit-slip/transit-slip.service';
// import { UserInfoService } from 'src/app/services/user-info/user-info.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transit-slip-details',
  templateUrl: './transit-slip-details.component.html',
  styleUrls: ['./transit-slip-details.component.sass']
})
export class TransitSlipDetailsComponent implements OnInit {
  id: number = null;
  form: FormGroup;
  user = JSON.parse(localStorage.getItem('currentUser'));
  users: any[] = [];

  constructor(private formBuilder: FormBuilder,
    private transitSlipService: TransitSlipService,
    // private userInfoService: UserInfoService,
    private _route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      transitSlip: this.formBuilder.group({
        id: [null],
        transit_slip_no: [null],
        transit_from: [null],
        transit_to: [null],
        transit_method: [null],
        name_of_courier: [null],
        created_by: [null],
        created_at: [null],
        updated_by: [null],
        updated_at: [null],
      }),
      transitSlipEnvelop: [null]
      // transitSlipEnvelop: this.formBuilder.group({
      //   transitSlipEnvelop: this.formBuilder.array([])
      // })

      // transitSlipEnvelop: this.formBuilder.array([
      //   // this.formBuilder.group({
      //   //   id: [null],
      //   //   transit_slip_id: [null],
      //   //   sl_no: [null],
      //   //   originator_no: [null],
      //   //   precedence: [null],
      //   //   transit_from: [null],
      //   //   transit_to: [null],
      //   //   local_despatch_time: [null],
      //   //   local_despatch_signature: [null],
      //   //   created_at: [null],
      //   //   created_by: [null],
      //   //   updated_by: [null],
      //   //   updated_at: [null],
      //   // })
      // ]),

      // transitSlipEnvelop : this.formBuilder.group({
      //   "action": [{ value: null, disabled: true }],
      //   "transitSlipEnvelop": this.formBuilder.array([], Validators.required)
      // })
      // transitSlipEnvelop: this.formBuilder.array([])
      // transitSlipEnvelop: 
      // this.formBuilder.array([
      //   // this.formBuilder.group({
      //   //   id: [null],
      //   //   transit_slip_id: [null],
      //   //   sl_no: [null],
      //   //   originator_no: [null],
      //   //   precedence: [null],
      //   //   transit_from: [null],
      //   //   transit_to: [null],
      //   //   local_despatch_time: [null],
      //   //   local_despatch_signature: [null],
      //   //   created_at: [null],
      //   //   created_by: [null],
      //   //   updated_by: [null],
      //   //   updated_at: [null],
      //   // })
      // ])
    });
    this._route.paramMap.subscribe(
      (params: ParamMap) => {
        this.id = Number(params.get('id'));
        if (this.id) {
          this.getTsById();
        }
      }
    );
  }

  

  // createFormArray(input: any[]): FormArray {
  //   return new FormArray(
  //     input.map(
  //       (item) =>
  //         new FormGroup({
  //           id: new FormControl(item.id),
  //           transit_slip_id: new FormControl(item.transit_slip_id),
  //           sl_no: new FormControl(item.sl_no),
  //           originator_no: new FormControl(item.originator_no),
  //           precedence: new FormControl(item.precedence),
  //           transit_from: new FormControl(item.transit_from),
  //           transit_to: new FormControl(item.transit_to),
  //           local_despatch_time: new FormControl(item.local_despatch_time),
  //           local_despatch_signature: new FormControl(item.local_despatch_signature),
  //           created_at: new FormControl(item.created_at),
  //           created_by: new FormControl(item.created_by),
  //           updated_by: new FormControl(item.updated_by),
  //           updated_at: new FormControl(item.updated_at)
  //         })
  //     )
  //   );
  // }

  getTsById() {
    let requestBody = {
      id: this.id
    };
    this.transitSlipService.getById(requestBody).subscribe(
      (res: any) => {
        this.form.patchValue(res?.payload?.output ?? null);
        console.log('hi');
        console.log(this.form.value);
      },
      (err: any) => {
        Swal.fire({ icon: 'error', title: 'Oops...', text: err ?? 'Something went wrong. Please try again later.' });
      }
    );
  }
}
