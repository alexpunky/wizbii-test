import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {AppStateService} from './app-state.service';

@Injectable()
export class AuthenticationService {

    public static readonly URL_LOGIN = 'https://api.wizbii.com/v1/account/validate';
    private static readonly CLIENT_ID = 'test';

    constructor(public http: HttpClient, public appState: AppStateService) {
    }

    /**
     * Define whether the user is logged or not
     * @returns {boolean}
     */
    public isLogged(): boolean {
        return !!this.appState.getToken();
    }

    /**
     * Log user in
     * @param {string} login
     * @param {string} password
     * @returns {Promise<string>}
     */
    public login(login: string, password: string): Promise<string> {
        let headers = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');

        const body = new HttpParams()
            .set('username', login)
            .set('password', password)
            .set('client_id', AuthenticationService.CLIENT_ID)
            .set('grant_type', 'password');

        const observable: Observable<any> = this.http.post(AuthenticationService.URL_LOGIN, body.toString(), {headers: headers});

        return observable.map(data => {
            return (data && data['access-token']) ? data['access-token'] : null;
        }).toPromise();
    }

}
