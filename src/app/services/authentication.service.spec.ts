import {TestBed, inject, fakeAsync} from '@angular/core/testing';

import {AuthenticationService} from './authentication.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AppStateService} from './app-state.service';

class MockAppStateService {
    private token: string = null;

    public getToken(): string {
        return this.token;
    }

    public setToken(value: string): void {
        this.token = value;
    }
}


describe('AuthenticationService', () => {
    let service: AuthenticationService;
    let httpMock: HttpTestingController;
    let appState: MockAppStateService

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AuthenticationService,
                {
                    provide: AppStateService,
                    useClass: MockAppStateService
                }
            ],
            imports: [HttpClientTestingModule]
        });

        service = TestBed.get(AuthenticationService);
        httpMock = TestBed.get(HttpTestingController);
        appState = TestBed.get(AppStateService);
        appState.setToken(null);
    });

    it('should be created', inject([AuthenticationService], (service: AuthenticationService) => {
        expect(service).toBeTruthy();

        expect(service.isLogged()).toBeFalsy();
    }));

    it('should not login', fakeAsync(() => {
        service.login('test', 'test').then(result => {
            expect(result).toBe(null);
        });

        const loginRequest = httpMock.expectOne(AuthenticationService.URL_LOGIN);
        loginRequest.flush(null);
    }));

    it('should not login bad json', fakeAsync(() => {
        service.login('test', 'test').then(result => {
            expect(result).toBe(null);
        });

        const loginRequest = httpMock.expectOne(AuthenticationService.URL_LOGIN);
        loginRequest.flush({content: 'test'});
    }));

    it('should get token', fakeAsync(() => {
        const token = 'wizbii-token';
        service.login('test', 'test').then(result => {
            expect(result).toBe(token);
        });

        const loginRequest = httpMock.expectOne(AuthenticationService.URL_LOGIN);
        loginRequest.flush({'access-token': token});
    }));
});
