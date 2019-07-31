import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiService } from '@app/core/services/api.service';

@Injectable()
export class HomeService {

  constructor(
    private apiService: ApiService
  ) { }

  /**
   * Call dummy service to get dummy data
   *
   * @returns
   * @memberof HomeService
   */
  getDummyData() {
    return this.apiService.get("/v1/employees").pipe(
      map(
        (response: any) => {
          return response;
        }
      )
    )
  }

  /**
   * Call api post method create new employee
   *
   * @param {*} employeeData
   * @returns
   * @memberof HomeService
   */
  postCreateNew(employeeData: any) {
    return this.apiService.post("/v1/create", employeeData).pipe(
      map(
        (response: any) => {
          return response;
        }
      )
    )
  }

  /**
   * Call api put method update data employee
   *
   * @param {*} id
   * @param {*} employeeData
   * @returns
   * @memberof HomeService
   */
  putUpdateEmployee(id: any, employeeData: any) {
    return this.apiService.put("/v1/update/" + id, employeeData).pipe(
      map(
        (response: any) => {
          return response;
        }
      )
    )
  }

  /**
   * Call api delete method delete employee
   *
   * @param {*} id
   * @returns
   * @memberof HomeService
   */
  deleteDeleteEmployee(id: any) {
    return this.apiService.delete("/v1/delete/" + id).pipe(
      map(
        (response: any) => {
          return response;
        }
      )
    )
  }
}
