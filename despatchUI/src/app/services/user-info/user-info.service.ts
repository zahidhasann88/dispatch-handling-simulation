import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const headerOption = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  constructor(private httpClient: HttpClient) { }

  url: string = "http://" + environment.sdmsApiBaseUrl + ":" + environment.sdmsApiPort.toString() + "/";

  create(requestBody: any) {
    return this.httpClient.post<any>(this.url + 'create-user', requestBody, headerOption);
  }

  getById(requestBody: any) {
    return this.httpClient.post<any>(this.url + 'get-user-by-id', requestBody, headerOption);
  }

  getByRole(requestBody: any) {
    return this.httpClient.post<any>(this.url + 'get-user-by-role', requestBody, headerOption);
  }

  getByUnAndPass(requestBody: any) {
    return this.httpClient.post<any>(this.url + 'get-user-by-username-and-password', requestBody, headerOption);
  }

  // deleteById(requestBody: any) {
  //   return this.httpClient.delete<any>(this.url + 'delete-user', requestBody, headerOption);
  // }

  updateById(requestBody: any) {
    return this.httpClient.patch<any>(this.url + 'update-user', requestBody, headerOption);
  }

  getByUn(requestBody: any) {
    return this.httpClient.post<any>(this.url + 'get-user-by-username', requestBody, headerOption);
  }

  getByLikeFln(requestBody: any) {
    return this.httpClient.post<any>(this.url + 'get-user-like-fullname', requestBody, headerOption);
  }

  getByLikeRole(requestBody: any) {
    return this.httpClient.post<any>(this.url + 'get-user-like-role', requestBody, headerOption);
  }

  getAll() {
    return this.httpClient.get<any>(this.url + 'get-all-user', headerOption);
  }
}
