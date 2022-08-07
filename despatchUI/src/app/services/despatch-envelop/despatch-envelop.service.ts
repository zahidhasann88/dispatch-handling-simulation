import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const headerOption = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DespatchEnvelopService {

  constructor(private httpClient: HttpClient) { }

  url: string = "http://" + environment.sdmsApiBaseUrl + ":" + environment.sdmsApiPort.toString() + "/";

  create(requestBody: any) {
    return this.httpClient.post<any>(this.url + 'create-despatch-envelop', requestBody, headerOption);
  }

  getById(requestBody: any) {
    return this.httpClient.post<any>(this.url + 'get-despatch-envelop-by-id', requestBody, headerOption);
  }

  getAll() {
    return this.httpClient.get<any>(this.url + 'get-all-despatch-envelop', headerOption);
  }

  getByLetterNo(requestBody: any) {
    return this.httpClient.post<any>(this.url + 'get-despatch-envelop-by-letter-no', requestBody, headerOption);
  }

  // delete(requestBody: any){
  //   return this.httpClient.delete<any>(this.url + 'delete-despatch-envelop', requestBody, headerOption);
  // }

  update(requestBody: any) {
    return this.httpClient.patch<any>(this.url + 'update-despatch-envelop', requestBody, headerOption);
  }

  getByCreatedBy(requestBody: any) {
    return this.httpClient.post<any>(this.url + 'get-despatch-envelop-by-user-created', requestBody, headerOption);
  }

  getByCreatedFor(requestBody: any) {
    return this.httpClient.post<any>(this.url + 'get-all-despatch-envelop-for-user', requestBody, headerOption);
  }

  createDespatchEnvelopDistribution(requestBody: any){
    return this.httpClient.post<any>(this.url + 'create-despatch-envelop-distribution', requestBody, headerOption);
  }
}
