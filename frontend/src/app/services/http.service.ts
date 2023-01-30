import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  baseUrl = "http://localhost:5000";
  version =  "/api/v1/";

  constructor(private http: HttpClient) { }

  get(path: string, cb: any){
    const endPoint = this.baseUrl + this.version + path;
    this.http.get(endPoint).subscribe((data: any) => {
      if(data.success){
        cb(data);
      }else {
        console.log("Error");
      }
    });
  }

  post(path: string, body: any, cb: any){
    const endPoint = this.baseUrl + this.version + path;
    this.http.post(endPoint, body).subscribe((data: any) => {
      if (data.success) {
        cb(data);
      }else {
        console.log("err");
      }
    });
  }

  delete(path: string, cb: any,){
    const endPoint = this.baseUrl + this.version + path;
    this.http.delete(endPoint).subscribe((data: any) => {
      if(data.success){
        cb(data);
      }else {
        console.log("err");
      }
    });
  }

  patch(path: string, data: any, cb: any){
    console.log("hit here....")
    const endPoint = this.baseUrl + this.version + path;
    this.http.patch(endPoint, data).subscribe((data: any) => {
      if (data.success) {
        cb(data);
      }
    })
  }

  search(path: string, query: any, cb: any){
    const endPoint = this.baseUrl + this.version + path;
    const params = new HttpParams({
      fromObject: query
    });

    console.log("query", query);
    console.log("Search endPoint", endPoint, { params });

    this.http.get(endPoint, { params }).subscribe(data => {
      if(data){
        cb(data);
      }else{
        console.log("Error");
      }
    })

  }

}
