import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  // login(username: string, password: string) {
  //   return this.http
  //     .post<any>(`${environment.apiUrl}/authenticate`, {
  //       username,
  //       password,
  //     })
  //     .pipe(
  //       map((user) => {
  //         // store user details and jwt token in local storage to keep user logged in between page refreshes

  //         localStorage.setItem('currentUser', JSON.stringify(user));
  //         this.currentUserSubject.next(user);
  //         return user;
  //       })
  //     );
  // }

  login(username: string, password: string) {
    let requestBody = {
      user_name: username,
      user_password: password
    };
    const headerOption = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    let url: string = "http://" + environment.sdmsApiBaseUrl + ":" + environment.sdmsApiPort.toString() + "/";
    return this.http
      .post<any>(url + 'get-user-by-username-and-password', requestBody, headerOption)
      .pipe(
        map((o) => {
          let tempData = o?.payload?.output;
          let getRole: string = tempData?.user_role;
          getRole = getRole.toLowerCase();
          let setRole: string = getRole.includes("clerk") ? "Student" : getRole === "instructor" ? "Instructor" : getRole === "admin" ? "Admin" : "Student";
          let r: Role = Role.Student;
          r = setRole === "Student" ? Role.Student : setRole === "Instructor" ? Role.Teacher : setRole === "Admin" ? Role.Admin : Role.Student;
          let user: User = {
            id: tempData?.id ?? 0,
            img: setRole === "Admin" ? "assets/images/user/admin.jpg" : setRole === "Instructor" ? "assets/images/user/teacher.jpg" : setRole === "Student" ? "assets/images/user/student.jpg" : "assets/images/user/student.jpg",
            username: tempData?.user_name ?? "admin@school.org",
            firstName: tempData?.user_full_name ?? "",
            lastName: '',
            role: r,
            token: setRole === "Admin" ? "admin-token" : setRole === "Instructor" ? "teacher-token" : setRole === "Student" ? "student-token" : "student-token",
            password: tempData?.user_password ?? "student@123",
            user_full_name: tempData?.user_full_name,
            user_name: tempData?.user_name,
            user_password: tempData?.user_password,
            user_email: tempData?.user_email,
            user_army_number: tempData?.user_army_number,
            user_rank: tempData?.user_rank,
            user_role: tempData?.user_role,
            user_serving_unit: tempData?.user_serving_unit,
            user_status: tempData?.user_status,
          };

          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    return of({ success: false });
  }
}
