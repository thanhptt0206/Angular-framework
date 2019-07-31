import { Injectable, EventEmitter, Injector } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { CommonService } from "@app/core/services/common.service";

import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent, throwError } from 'rxjs';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';

@Injectable()
export class ApiService {
  private authService: any;
  constructor(
    private httpClient: HttpClient,
    private commonService: CommonService,
  ) {
  }

  onDestroyToken: EventEmitter<any> = new EventEmitter();

  /**
   * Set header for api get
   * 
   * @private
   * @returns {HttpHeaders} 
   * @memberof ApiService
   */
  setHeaders(): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    return new HttpHeaders(headersConfig);
  }

  /**
   * Set header for api with basic auth
   * 
   * @param {*} user 
   * @param {*} pass 
   * @returns {HttpHeaders} 
   * @memberof ApiService
   */
  setBasicAuthenHeader(user: any, pass: any): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    headersConfig['Authorization'] = "Basic " + btoa(`${user}:${pass}`);

    return new HttpHeaders(headersConfig);
  }


  /**
   * Handle undefine and null convert to ""
   * 
   * @returns HttpParams
   * @memberof ApiService
   */
  private handleParams(params: any) {
    var result = new HttpParams();
    for (var index = 0; index < params.keys().length; index++) {
      var value = params.keys()[index];
      if (params.get(value) !== null && params.get(value) !== undefined) {
        if (typeof params.get(value) === 'string') {
          result = result.append(value, params.get(value).trim());
        } else {
          result = result.append(value, params.get(value));
        }
      }
    }
    return result;
  }
  /**
   * Handle error and show msg
   *
   * @param {HttpErrorResponse} error
   * @returns
   * @memberof ApiService
   */
  errorHandler(error: HttpErrorResponse) {
    this.commonService.disableButton = false;
    this.commonService.createErrorMessage(error.message);
    return throwError(error.message || "Server Error");
  }

  /**
   * Handle api get before send request
   * 
   * @param {string} path 
   * @param {any} [params=new URLSearchParams()] 
   * @returns {Observable<any>} 
   * @memberof ApiService
   */
  get(path: string, params = new HttpParams()): Observable<any> {
    this.commonService.disableButton = true;
    params = this.handleParams(params);
    return this.httpClient
      .get(path, { params: params, headers: this.setHeaders() })
      .pipe(
        map((res: any) => {
          this.commonService.disableButton = false;
          return res;
        }),
        catchError(e => this.errorHandler(e))
      )
  }

  /**
   * Handle api put before send request
   * 
   * @param {string} path 
   * @param {URLSearchParams} [body=new URLSearchParams()] 
   * @returns {Observable<any>} 
   * @memberof ApiService
   */
  put(path: string, body: HttpParams = new HttpParams()): Observable<any> {
    this.commonService.disableButton = true;
    return this.httpClient
      .put(
        path, body, { headers: this.setHeaders() })
      .pipe(
        map((res: any) => {
          this.commonService.disableButton = false;
          return res;
        }),
        catchError(e => this.errorHandler(e))
      )
  }

  /**
   * Handle api post before send request
   * 
   * @param {string} path 
   * @param {*} body 
   * @param {any} [headers=this.setHeaders()] 
   * @returns {Observable<any>} 
   * @memberof ApiService
   */
  post(path: string, body: any, headers?: HttpHeaders, isEditProfile: boolean = false): Observable<any> {
    this.commonService.disableButton = true;
    return this.httpClient.post(
      path, body, { headers: this.setHeaders() })
      .pipe(
        map((res: any) => {
          this.commonService.disableButton = false;
          return res;
        }),
        catchError(e => this.errorHandler(e))
      )
  }

  /**
   * Handle api post before send request with json and params
   * 
   * @param {string} path 
   * @param {*} body 
   * @param {any} [headers=this.setHeaders()] 
   * @returns {Observable<any>} 
   * @memberof ApiService
   */
  postWithParam(path: string, body: any, params = new HttpParams(), headers = this.setHeaders()): Observable<any> {
    this.commonService.disableButton = true;
    return this.httpClient.post(
      path, body, { params: params, headers: headers })
      .pipe(
        map((res: any) => {
          this.commonService.disableButton = false;
          return res;
        }),
        catchError(e => this.errorHandler(e))
      )
  }

  /**
   * Handle api delete before send request
   * 
   * @param {string} path 
   * @returns {Observable<any>} 
   * @memberof ApiService
   */
  delete(path: string): Observable<any> {
    this.commonService.disableButton = true;
    return this.httpClient.delete(
      path, { headers: this.setHeaders() })
      .pipe(
        map((res: any) => {
          this.commonService.disableButton = false;
          return res;
        }),
        catchError(e => this.errorHandler(e))
      )
  }
}