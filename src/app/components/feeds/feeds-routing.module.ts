import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FeedsComponent} from './feeds.component';
import {AuthenticationGuard} from '../../guard/authentication.guard';

const routes: Routes = [
    {
        path: '',
        component: FeedsComponent,
        canActivate: [AuthenticationGuard],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FeedsRoutingModule {
}
