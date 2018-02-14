import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {AuthenticationGuard} from './guard/authentication.guard';

const routes: Routes = [
    {path: '', component: LoginComponent},
    {
        path: 'feeds',
        loadChildren: './components/feeds/feeds.module#FeedsModule',
        canActivate: [AuthenticationGuard]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
