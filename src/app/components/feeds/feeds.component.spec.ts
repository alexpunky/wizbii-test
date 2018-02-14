import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FeedsComponent} from './feeds.component';
import {FormsModule} from '@angular/forms';
import {FeedsService} from '../../services/feeds.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

class MockFeedsService {
    public getAll(): Observable<any[]> {
        return Observable.of([]);
    }
}

describe('FeedsComponent', () => {
    let component: FeedsComponent;
    let fixture: ComponentFixture<FeedsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FeedsComponent],
            imports: [FormsModule],
            providers: [{provide: FeedsService, useClass: MockFeedsService}]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FeedsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
