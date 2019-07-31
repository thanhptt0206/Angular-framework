import { Injectable } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material";
import { MatSnackBar } from '@angular/material';

import * as moment from "moment";
import * as _ from "lodash"

import { Constant } from "@app/core/services/constant.service";
import { MessageService } from 'primeng/components/common/messageservice';
import { TranslateService } from "@ngx-translate/core";
import { HttpHeaders } from "@angular/common/http";
import { I18nService } from "@app/core/i18n.service";
import { ConfirmDialogComponent } from "@app/shared/confirm-dialog/confirm-dialog.component";

declare var $: any;
@Injectable()
export class CommonService {
  dialogRef: MatDialogRef<{}, any>;
  disableButton: boolean = false;
  constructor(
    public dialog: MatDialog,
    private messageService: MessageService,
    private translationService: TranslateService,
    private i18nService: I18nService,
    public snackBar: MatSnackBar
  ) { }

  public TITLE_HEADER: string;

  /**
   * Set title for header
   *
   * @param {string} title
   * @memberof CommonService
   */
  setTitleHeader(title: string) {
    this.TITLE_HEADER = title;
  }

  /**
   * Set Header for authen
   *
   * @returns {HttpHeaders}
   * @memberof CommonService
   */
  setAuthenHeaders(): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    return new HttpHeaders(headersConfig);
  }

  /**
   * Create Success message
   *
   * @param {string} message
   * @param {any} [title="COMMON_SMSG_TITLE"]
   * @memberof CommonService
   */
  createSuccessMessage(message: string, title = "COMMON_SMSG_TITLE") {
    this.messageService.clear();
    this.messageService.add({ severity: 'success', summary: this.translationService.instant(title), detail: this.translationService.instant(message) });
  }

  /**
   * Create Info message
   * 
   * @param {string} message 
   * @param {any} [title="COMMON_IMSG_TITLE"] 
   * @memberof CommonService
   */
  createInfoMessage(message: string, title = "COMMON_IMSG_TITLE") {
    this.messageService.clear();
    this.messageService.add({ severity: 'info', summary: this.translationService.instant(title), detail: this.translationService.instant(message) });
  }

  /**
   * Create Warning message
   * 
   * @param {string} message 
   * @param {any} [title="COMMON_WMSG_TITLE"] 
   * @memberof CommonService
   */
  createWarningMessage(message: string, title = "COMMON_WMSG_TITLE") {
    this.messageService.clear();
    this.messageService.add({ severity: 'warn', summary: this.translationService.instant(title), detail: this.translationService.instant(message) });
  }

  /**
   * Create Error message
   *
   * @param {string} message
   * @param {any} [title="COMMON_EMSG_TITLE"]
   * @memberof CommonService
   */
  createErrorMessage(message: string, title = "COMMON_EMSG_TITLE") {
    this.messageService.clear();
    this.messageService.add({ severity: 'error', summary: this.translationService.instant(title), detail: this.translationService.instant(message) });
  }

  /**
   * Create message error for invalid
   *
   * @param {string} message
   * @param {any} [title="COMMON_EMSG_TITLE"]
   * @memberof CommonService
   */
  createErrorInvalidMessage(message: string, title = "COMMON_EMSG_TITLE") {
    this.messageService.clear();
    var messageDetail = {
      severity: 'error',
      summary: this.translationService.instant(title)
    }
    if (this.i18nService.language == "en-US") {
      messageDetail['detail'] = this.translationService.instant("COMMON_INVALID") + " " + this.translationService.instant(message);
    }
    else {
      messageDetail['detail'] = this.translationService.instant("COMMON_INVALID") + this.translationService.instant(message);
    }
    this.messageService.add(messageDetail);
  }

  /**
   * Create Alert modal
   *
   * @param {string} title
   * @param {string} message
   * @returns
   * @memberof CommonService
   */
  createAlertModal(title: string, message: string) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "300px",
      data: { title: title, content: message }
    });
    return dialogRef.afterClosed();
  }

  /**
   * Convert base64string to ArrayBuffer
   *
   * @param {string} base64String
   * @returns
   * @memberof CommonService
   */
  urlB64ToUint8Array(base64String: string) {
    const padding = "=".repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  /**
   * Convert number to date
   *
   * @param {any} dateData
   * @returns
   * @memberof EditListComponent
   */
  convertDate(dateData: any) {
    let lang = this.translationService.currentLang;
    let date = moment(dateData).format(Constant.FORMAT_DATE_TIME);
    if (lang == 'ja-JP') {
      return moment(dateData).format(Constant.MOMENT_DATE_FORMAT_TIME_JP);
    }
    if (lang == 'en-US') {
      return date;
    }
  }

  /**
   * Format default date by moment
   * 
   * @param {any} date 
   * @returns 
   * @memberof CommonService
   */
  formatDate(date: any) {
    return moment(date).format(Constant.MOMENT_DATE_FORMAT);
  }

  /**
   * Get timezone offset
   *
   * @param {*} target
   * @param {*} timeZoneOffset note timezone offset is different from timezone. Ex: timezone = GMT +9 => timezoneOffset = -9
   * @returns
   * @memberof CommonService
   */
  getOffsetTime(target: any, timeZoneOffset: any) {
    //get the timezone offset from local time in minutes
    var tzDifference = timeZoneOffset * 60 + target.getTimezoneOffset();
    //convert the offset to milliseconds, add to targetTime, and make a new Date
    return new Date(target.getTime() + tzDifference * 60 * 1000);
  }

  /**
   * Return true if broser is IE or Edge
   *
   * @returns
   * @memberof CommonService
   */
  detectIEOrEdgeBrowser() {
    return /msie\s|trident\/|edge\//i.test(window.navigator.userAgent);
  }

  /**
 * Create custom dialog
 *
 * @param {any} component
 * @param {Object} [options={}] dialog options
 * @returns {*}
 * @memberof CommonService
 */
  createCustomDialog(component: any, options: Object = {}): MatDialogRef<any> {
    this.dialogRef = this.dialog.open(component, options);
    return this.dialogRef;
  }

  /**
   * Convert alphanumberic and symbol two byte to one byte
   *
   * @param {*} value
   * @returns
   * @memberof CommonService
   */
  convertToHalfWidth(value: any) {
    return value.replace(Constant.REGEX_TWO_BYTE_ALPHANUMBERIC_SYMBOL),
      function (s: any) { return String.fromCharCode(s.charCodeAt(0) - 0xFEE0) };
  }

  /**
   * Convert image file to base 64
   *
   * @param {*} inputValue
   * @memberof CommonService
   */
  convertFileToBase64(inputValue: any): void {
    var file: File = inputValue.target.files[0];
    var myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => { }
    myReader.readAsDataURL(file);
    console.log(myReader.result);
  }


  /**
   * Encoding file to csv before download
   *
   * @param {*} response
   * @memberof CommonService
   */
  encodingExportCSV(response: any) {
    if (response) {
      var data, filename = "";
      var disposition = response.headers.get(Constant.CONTENT_DISPOSITION);
      var filenameRegex = /filename[^;=\n]*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/i;
      var matches = filenameRegex.exec(disposition);
      if (matches != null && matches[2]) {
        filename = matches[2].replace(/['"]/g, '');
      }
      filename = filename || 'export.csv';
      data = 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURI(response.body);
      let a = document.createElement('a');
      a.href = data;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };
    window.URL.revokeObjectURL(data);
  }

  /*
   * Read url of input file
   *
   * @param {*} input
   * @param {*} imgTagId
   * @memberof CommonService
   */
  readURL(input: any, imgTagId: any) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e: any) {
        $("#" + imgTagId).attr("src", e.target.result);
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  /**
   * Common open Snackbar
   *
   * @param {string} message
   * @param {string} action
   * @memberof CommonService
   */
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    })
  }
}
