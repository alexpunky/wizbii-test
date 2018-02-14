import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {AppStateService} from '../../services/app-state.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    public loginForm: FormGroup;
    public message: string = null;

    constructor(public fb: FormBuilder,
                public router: Router,
                public authentication: AuthenticationService,
                public appState: AppStateService) {
    }

    ngOnInit() {
        this.loginForm = this.fb.group({
            login: this.fb.control('', [Validators.required]),
            password: this.fb.control('', [Validators.required])
        });
    }

    public login(): void {
        if (this.loginForm.valid) {
            const login = this.loginForm.controls.login.value;
            const password = this.loginForm.controls.password.value;
            this.authentication.login(login, password).then(token => {
                if (token) {
                    this.appState.setToken(token);

                    console.log(this.appState);
                    this.router.navigate([ '/feeds']);
                } else {
                    this.message = 'Identifiant / mot de passe incorrect';
                }
            }, error => {
                this.message = 'Identifiant / mot de passe incorrect';
            })
        }
        else {
            this.message = 'Merci de renseigner l\'ensemble des champs du formulaire';
        }

        if (this.message) {
            setTimeout(() => {
                this.message = null;
            }, 3000);
        }
    }

}
