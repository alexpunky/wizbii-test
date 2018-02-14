import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {AuthenticationService} from './services/authentication.service';
import {AppRoutingModule} from './app-routing.module';
import {AuthenticationGuard} from './guard/authentication.guard';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {WizbiiHttpInterceptorService} from './services/wizbii-http-interceptor.service';
import {AppStateService} from './services/app-state.service';


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        NgbModule.forRoot(),
        AppRoutingModule
    ],
    providers: [AuthenticationService, AuthenticationGuard, WizbiiHttpInterceptorService, AppStateService,
        {
        provide: HTTP_INTERCEPTORS,
        useClass: WizbiiHttpInterceptorService,
        multi: true
    }],
    bootstrap: [AppComponent]
})
export class AppModule {
}
