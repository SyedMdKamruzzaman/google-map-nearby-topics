import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter, tap, finalize } from 'rxjs/operators';
import { UrlConstants } from '../enums/UrlConstants';
import { isNullOrUndefined } from '@swimlane/ngx-datatable';

@Injectable()
export class HeaderInterceptor  {
 // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    intercept(req: HttpRequest<any>, next: HttpHandler) {     
          let authToken:any = '';
          if (localStorage.getItem("token")!=null) {
              authToken =  localStorage.getItem("token");
          }
  
  
          // if (this.token.getToken() !== null) {
          //     authToken = localStorage.getItem("token");
          // }
          //const requestObj: RequestMessage = new RequestMessage();
  
          var customReq ;
          if (req.method=="GET") {
            
              customReq = req.clone({
                  headers: new HttpHeaders({"Authorization": "bearer " + authToken}),
                  url: UrlConstants.apiUrl + req.url
              });
              // console.log(customReq);
          } else {
              customReq = req.clone({
                  url: UrlConstants.apiUrl + req.url,
                  body: req.body,
                  headers: new HttpHeaders({"Authorization":"bearer " + authToken}),
              });
          }
  
          return next.handle(customReq).pipe(
              tap(event => {
  
                  if (event instanceof HttpResponse) {
                      const jwt = event.body.Token;
                      if (!isNullOrUndefined(jwt)) {
                        localStorage.setItem("token",jwt);
                      }
                     
                    if (!isNullOrUndefined(event.body.Message)) {
                      if (event.body.StatusCode==1) {
                        //   this.notification.sendMessage(event.body.Message,'success','bottom-right');
                      } else if (event.body.StatusCode==2){
                        //   this.notification.sendMessage(event.body.Message,'warning','bottom-right');
                      }else if (event.body.StatusCode==3){
                        //   this.notification.sendMessage(event.body.Message,'danger','bottom-right');
                      }else if (event.body.StatusCode==4){
                        //   this.notification.sendMessage(event.body.Message,'danger','bottom-right');
                      }
                      
                    }
                  }
                  //this.spinner.hide();
              }, error => {
                  if (error instanceof HttpErrorResponse) {
                      if (error.status === 401) {
                         
                        //   this.notification.sendMessage(error.message,'danger','bottom-right');
                         
                        localStorage.removeItem("token");
                         location.replace("login");
                      }
                    }
              }),
              finalize(() => {
                //   this.spinner.hide();
              }));
      }
}