import {NgModule} from '@angular/core';
import {FeedsComponent} from './feeds.component';
import {AuthenticationService} from '../../services/authentication.service';
import {FeedsService} from '../../services/feeds.service';
import {CommonModule} from '@angular/common';
import {FeedsRoutingModule} from './feeds-routing.module';
import {FormsModule} from '@angular/forms';


@NgModule({
    declarations: [
        FeedsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        FeedsRoutingModule
    ],
    providers: [AuthenticationService, FeedsService],
    bootstrap: [FeedsComponent]
})
export class FeedsModule {
}
