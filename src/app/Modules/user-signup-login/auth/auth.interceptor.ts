import { HttpInterceptor, HttpRequest, HttpHandler, HttpUserEvent, HttpEvent } from '@angular/common/http';
import { UserService } from 'src/app/Services/user-service/user.service';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.headers.get('No-Auth') === 'True') {
            return next.handle(req.clone());
        }
        if (sessionStorage.getItem('userToken') != null) {
            const clonedreq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem('userToken'))
            });
            return next.handle(clonedreq).pipe(tap(
                succ => { },
                err => {
                    if (err.status === 401) {
                        this.router.navigateByUrl('/login');
                    }
                }
                ));
        } else {
            this.router.navigateByUrl('/login');
        }
    }
}