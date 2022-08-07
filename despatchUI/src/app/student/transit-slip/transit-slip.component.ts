import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransitSlipService } from 'src/app/services/transit-slip/transit-slip.service';
import { UserInfoService } from 'src/app/services/user-info/user-info.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transit-slip',
  templateUrl: './transit-slip.component.html',
  styleUrls: ['./transit-slip.component.sass']
})
export class TransitSlipComponent implements OnInit {
  form: FormGroup;
  user = JSON.parse(localStorage.getItem('currentUser'));
  users: any[] = [];
  constructor(private formBuilder: FormBuilder, private transitSlipService: TransitSlipService, private userInfoService: UserInfoService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      transitSlip: this.formBuilder.group({
        id: null,
        transit_slip_no: [null, Validators.required],
        transit_from: null,
        transit_to: null,
        transit_method: null,
        name_of_courier: null,
        created_by: null,
        created_at: null,
        updated_by: null,
        updated_at: null,
      }),
      transitSlipEnvelop: this.formBuilder.array([]),
      isSendTicked: false,
      sent_from: null,
      sent_to: null,
      transit_slip_id: null,
    });
    this.getAllClerk();
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      id: null,
      transit_slip_id: null,
      sl_no: null,
      originator_no: null,
      precedence: null,
      transit_from: null,
      transit_to: null,
      local_despatch_time: null,
      local_despatch_signature: null,
      created_at: null,
      created_by: null,
      updated_by: null,
      updated_at: null,
    });
  }

  getAllClerk() {
    let requestBody = {
      user_role: 'clerk'
    }
    this.userInfoService.getByLikeRole(requestBody).subscribe(
      (res: any) => {
        this.users = res?.payload?.output ?? [];
      },
      (err: any) => {
        Swal.fire({ icon: 'error', title: 'Oops...', text: err ?? 'Something went wrong. Please try again later.' });
      }
    );
  }

  addItem(): void {
    let formArray: FormArray = this.form.get('transitSlipEnvelop') as FormArray;
    formArray.push(this.createItem());
  }

  // del(input: any) {
  //   let formArray: FormArray = this.form.get('transitSlipEnvelop') as FormArray;
  //   // formArray.removeAt(formArray.(input));
  //   console.log(input);

  //   // let x: any[] = this.form.get('transitSlipEnvelop')?.value ?? [];
  //   // x.splice(x.indexOf(input), 1);
  //   // this.form.patchValue({ transitSlipEnvelop: x });
  // }

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

  onSubmit() {
    // console.log(this.form.value);
    // console.log(this.form.valid);

    // console.log('id : ' + this.form.get('transitSlip').valid);
    // console.log('id : ' + this.form.get('transitSlipEnvelop').valid);


    // for(let item of this.form.controls)

    if (this.form.valid) {
      // console.log(this.form.value);
      this.form.patchValue({ created_by: this.user?.id });

      this.transitSlipService.create(this.form.value).subscribe(
        (t) => {
          this.form.patchValue(t?.payload?.output);
          Swal.fire({ icon: 'success', title: 'Success!', text: t?.message ?? 'Operation Successful.' });
        },
        (f) => {
          Swal.fire({ icon: 'error', title: 'Oops...', text: f ?? 'Something went wrong. Please try again later.' });
        }
      );
    }
  }

  onSend() {
    if (this.form.valid) {
      this.form.patchValue({ sent_from: this.user?.id });
      this.form.patchValue({ transit_slip_id: this.form.get(['transitSlip', 'id'])?.value });
      this.transitSlipService.createTransitSlipDistribution(this.form.value).subscribe(
        (t) => {
          Swal.fire({ icon: 'success', title: 'Success!', text: t?.message ?? 'Operation Successful.' });
        },
        (f) => {
          Swal.fire({ icon: 'error', title: 'Oops...', text: f ?? 'Something went wrong. Please try again later.' });
        }
      );
    }
  }
}
