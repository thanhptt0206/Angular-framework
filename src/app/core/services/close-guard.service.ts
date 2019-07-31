import { Injectable } from "@angular/core";
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { CommonService } from "@app/core/services/common.service";
import { ConfirmDialogComponent } from "@app/shared/confirm-dialog/confirm-dialog.component";
import { TranslateService } from "@ngx-translate/core";
import { HomeComponent } from "@app/home/home.component";
import { distinctUntilChanged, take } from "rxjs/operators";

@Injectable()
export class CloseGuard implements CanDeactivate<HomeComponent> {
  isDismissSubject = new Subject<boolean>();
  isDismissObject = this.isDismissSubject.asObservable().pipe(distinctUntilChanged());

  constructor(private commonService: CommonService, private translateService: TranslateService) {
    this.isDismissSubject.next(true);
  }

  canDeactivate(
    component: HomeComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    var that = this;
    if (component.isInput) {
      let dialog = this.commonService.createCustomDialog(ConfirmDialogComponent, {
        width: "30%",
        data: {
          content: this.translateService.instant("WARNING_MSG_REDIRECT_PAGE"),
          title: this.translateService.instant("COMMON_WMSG_TITLE"),
          ok: this.translateService.instant("COMMON_DIALOG_OK_BUTTON"),
          cancel: this.translateService.instant("COMMON_DIALOG_CANCEL_BUTTON"),
        }
      });
      dialog.disableClose = true;
      dialog.afterClosed()
        .subscribe(
          shouldRefresh => {
            if (shouldRefresh) {
              that.isDismissSubject.next(true);
            } else {
              that.isDismissSubject.next(false);
            }
          });
    } else {
      this.isDismissSubject.next(false);
      return true;
    }
    return this.isDismissObject.pipe(
      take(1)
    );
  }
}
