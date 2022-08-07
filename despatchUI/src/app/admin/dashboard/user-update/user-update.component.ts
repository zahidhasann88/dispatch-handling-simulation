import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserInfoService } from 'src/app/services/user-info/user-info.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.sass']
})
export class UserUpdateComponent implements OnInit {

  id: number = null;
  user: any = null;
  form: FormGroup; 
  constructor(
    private formBuilder: FormBuilder,
    private userInfoService: UserInfoService,
    private _route: ActivatedRoute,
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
      user_role: [null, [Validators.required, Validators.minLength(5)],],
      user_serving_unit: [null],
      created_by: [null],
      created_at: [null],
      updated_by: [null],
      updated_at: [null],
    });
    this._route.paramMap.subscribe(
      (params: ParamMap) => {
        this.id = Number(params.get('id'));
        if(this.id){
          this.getUserById();
        }
      }
    );
  }

  getUserById() {
    let requestBody = {
      id: this.id
    }
    this.userInfoService.getById(requestBody).subscribe(
      (t) => {
        this.user = t?.payload?.output ?? null;
        this.form.patchValue(this.user);
      },
      (f) => {
        Swal.fire({ icon: 'error', title: 'Oops...', text: f?.error?.message ?? 'Something went wrong. Please try again later.' });
      }
    );
  }

  onSubmit() {
    if(this.form.valid){
      this.form.patchValue({ updated_by: JSON.parse(localStorage.getItem('currentUser'))?.id });
      this.form.patchValue({ updated_at: new Date() });
      this.userInfoService.updateById(this.form.value).subscribe(
        (t) => {
          Swal.fire({ icon: 'success', title: 'Success', text: t?.message ?? 'Operation Successful.' });
        },
        (f) => {
          Swal.fire({ icon: 'error', title: 'Oops...', text: f ?? 'Something went wrong. Please try again later.' });
        }
      );
    }
  }
}
