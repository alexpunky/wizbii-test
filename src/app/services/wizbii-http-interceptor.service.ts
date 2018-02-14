import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {AppStateService} from './app-state.service';

@Injectable()
export class WizbiiHttpInterceptorService implements HttpInterceptor {

    constructor(public appState: AppStateService) {
    }

    /**
     * Intercept HTTP Request to add token
     * TODO do not apply on login request
     * @param {HttpRequest<any>} req
     * @param {HttpHandler} next
     * @returns {Observable<HttpEvent<any>>}
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${this.appState.getToken()}`
            }
        });

        return next.handle(req);
    }
}
