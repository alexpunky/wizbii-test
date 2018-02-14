import {async, ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {AuthenticationService} from '../../services/authentication.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {AppStateService} from '../../services/app-state.service';

class MockAuthenticationService {
    public login(login: string, password: string): Promise<string> {
        return new Promise((resolve, reject) => {
            if (login) {
                resolve('test');
            } else {
                reject(null);
            }
        });
    }
}

class MockAppStateService {
    private token: string = null;

    public getToken(): string {
        return this.token;
    }

    public setToken(value: string): void {
        this.token = value;
    }
}

class MockFeedsComponent {

}

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let authService: MockAuthenticationService;
    let appState: MockAppStateService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LoginComponent],
            imports: [FormsModule, ReactiveFormsModule, RouterTestingModule.withRoutes([
                {path: 'feeds', component: MockFeedsComponent}
            ])],
            providers: [
                {provide: AuthenticationService, useClass: MockAuthenticationService},
                {provide: AppStateService, useClass: MockAppStateService}
            ]
        })
            .compileComponents();

        appState = TestBed.get(AppStateService);
        appState.setToken(null);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should not login', () => {
        component.login();
        expect(component.appState.getToken()).toBeFalsy();
    });

    it('should login', () => {
        component.loginForm.controls.login.patchValue('wizbii');
        component.loginForm.controls.password.patchValue('pass');
        fixture.detectChanges();
        component.login();
        fixture.whenStable().then(() => {
            fixture.detectChanges();
            expect(component.appState.getToken()).toBe('test');
        });

    });
});
