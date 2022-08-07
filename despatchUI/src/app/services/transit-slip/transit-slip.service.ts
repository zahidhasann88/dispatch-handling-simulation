import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const headerOption = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class TransitSlipService {

  constructor(private httpClient: HttpClient) { }

  url: string = "http://" + environment.sdmsApiBaseUrl + ":" + environment.sdmsApiPort.toString() + "/";

  create(requestBody: any) {
    return this.httpClient.post<any>(this.url + 'create-transit-slip', requestBody, headerOption);
  }

  getById(requestBody: any) {
    return this.httpClient.post<any>(this.url + 'get-transit-slip-by-id', requestBody, headerOption);
  }

  getBySlipNo(requestBody: any) {
    return this.httpClient.post<any>(this.url + 'get-transit-slip-by-slip-no', requestBody, headerOption);
  }

  // delete(requestBody: any) {
  //   return this.httpClient.delete<any>(this.url + 'delete-transit-slip', requestBody, headerOption);
  // }

  update(requestBody: any) {
    return this.httpClient.patch<any>(this.url + 'update-transit-slip', requestBody, headerOption);
  }

  getAllTransitFromByUser(requestBody: any) {
    return this.httpClient.post<any>(this.url + 'get-transit-slip-by-user', requestBody, headerOption);
  }

  getAllTransitToByUser(requestBody: any) {
    return this.httpClient.post<any>(this.url + 'get-transit-slip-for-user', requestBody, headerOption);
  }

  getAllTransitSlipForUser(requestBody: any) {
    return this.httpClient.post<any>(this.url + 'get-all-transit-slip-for-user', requestBody, headerOption);
  }

  createTransitSlipDistribution(requestBody: any) {
    return this.httpClient.post<any>(this.url + 'create-transit-slip-distribution', requestBody, headerOption);
  }
}
