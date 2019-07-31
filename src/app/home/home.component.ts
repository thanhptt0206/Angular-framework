import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { HomeService } from '@app/home/home.service';
import { SelectItem } from 'primeng/components/common/selectitem';
import { CommonService } from '@app/core/services/common.service';
import { Constant } from '@app/core/services/constant.service';
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  primeng: boolean = false;
  material: boolean = false;
  numberNoti: number = 10;
  quote: string;
  isLoading: boolean;
  cars: SelectItem[];
  selectedCar1: string;
  employees: any;

  isInput: boolean = false;

  // Regex
  emailRegex: RegExp = Constant.REGEX_EMAIL;
  email: string;
  halfAlphaRegex: RegExp = Constant.REGEX_HALF_SIZE_ALPHABET;
  halfAlpha: string;
  ccRegex: RegExp = /[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/;
  cc: string;
  onlyNumRegex: RegExp = Constant.REGEX_ONLY_NUMBERIC;
  onlyNum: string;

  constructor(
    private homeService: HomeService,
    public commonService: CommonService,
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.cars = [
      { label: 'Audi', value: 'Audi' },
      { label: 'BMW', value: 'BMW' },
      { label: 'Fiat', value: 'Fiat' },
      { label: 'Ford', value: 'Ford' },
      { label: 'Honda', value: 'Honda' },
      { label: 'Jaguar', value: 'Jaguar' },
      { label: 'Mercedes', value: 'Mercedes' },
      { label: 'Renault', value: 'Renault' },
      { label: 'VW', value: 'VW' },
      { label: 'Volvo', value: 'Volvo' }
    ];
    // Read input file img
    var that = this;
    $("#imgInput").change(function (e: any) {
      that.commonService.readURL(e.target, "imgPreview");
    });
  }

  /**
   * Call server get all employee
   *
   * @memberof HomeComponent
   */
  onGetAllClick() {
    this.employees = [];
    this.homeService.getDummyData().subscribe(
      resultAfterGet => {
        if (resultAfterGet) {
          this.employees = resultAfterGet;
          this.commonService.createSuccessMessage("Lấy được thông tin nhân viên rùi nha!");
        }
      }
    )
  }

  /**
   * Call service create new employee
   *
   * @memberof HomeComponent
   */
  onCreateNewClick() {
    const employee = {
      employee_name: "Khánh Trần Hoàng",
      employee_salary: "123",
      employee_age: "23",
      "name": "Khánh Trần Hoàng",
      "salary": "123",
      "age": "23",
    };
    this.homeService.postCreateNew(employee).subscribe(
      resultAfterPost => {
        this.employees.unshift(resultAfterPost);
        this.commonService.createSuccessMessage("Thêm nhân viên thành công");
      }
    )
  }

  /**
   * Update first employee
   *
   * @memberof HomeComponent
   */
  onUpdateClick() {
    const employeeToUpdate = {
      employee_name: "John Cena",
      employee_salary: "123",
      employee_age: "23",
      "name": "John Cena",
      "salary": "123",
      "age": "23",
    };
    const id = this.employees[0].id;
    this.homeService.putUpdateEmployee(id, employeeToUpdate)
      .subscribe(
        resultAfterPut => {
          this.employees[0] = resultAfterPut;
          this.employees[0].id = id;
          this.commonService.createSuccessMessage("Update nhân viên thành công");
        }
      )
  }

  /**
   * Delete first employee
   *
   * @memberof HomeComponent
   */
  onDeleteClick() {
    this.homeService.deleteDeleteEmployee(this.employees[0].id)
      .subscribe(
        resultAfterDelete => {
          this.onGetAllClick();
          this.commonService.createSuccessMessage("Delete nhân viên thành công");
        }
      )
  }

  /**
   * Handle uploadfile
   *
   * @param {*} event
   * @memberof HomeComponent
   */
  myUploader(event: any) {
    console.log(event.files);
  }

  /**
   * Show hide demo
   *
   * @param {*} id
   * @memberof HomeComponent
   */
  onShowHideButtonClick(id: any) {
    if (id == 'primeng') {
      this.primeng = !this.primeng;
    }
    if (id == 'material') {
      this.material = !this.material;
    }
  }

  /**
   * Call common service open snackbar
   *
   * @param {string} message
   * @param {string} action
   * @memberof HomeComponent
   */
  openSnackBar(message: string, action: string) {
    this.commonService.openSnackBar(message, action);
  }
}

