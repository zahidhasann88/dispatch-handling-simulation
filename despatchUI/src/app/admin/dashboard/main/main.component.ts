import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserInfoService } from 'src/app/services/user-info/user-info.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private userInfoService: UserInfoService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [null],
      user_full_name: [null, [Validators.required]],
      user_name: [null, [Validators.required]],
      user_password: [null, [Validators.required, Validators.minLength(5)],],
      user_email: [null, [Validators.required, Validators.email, Validators.minLength(5)],],
      user_army_number: [null],
      user_rank: [null],
      user_role: ['routing_clerk', [Validators.required, Validators.minLength(5)],],
      user_serving_unit: [null],
      created_by: [null],
      created_at: [null],
      updated_by: [null],
      updated_at: [null],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.form.patchValue({ created_by: JSON.parse(localStorage.getItem('currentUser'))?.id });
      this.form.patchValue({ created_at: new Date() });
      this.form.patchValue({ updated_by: JSON.parse(localStorage.getItem('currentUser'))?.id });
      this.form.patchValue({ updated_at: new Date() });
      this.form.patchValue({ user_name: this.form.get('user_email')?.value });
      this.userInfoService.create(this.form.value).subscribe(
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
