import { TestBed, inject } from '@angular/core/testing';

import { WizbiiHttpInterceptorService } from './wizbii-http-interceptor.service';
import {AppStateService} from './app-state.service';

class MockAppStateService {

}

describe('WizbiiHttpInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WizbiiHttpInterceptorService,
          {provide: AppStateService, useClass: MockAppStateService}]
    });
  });

  it('should be created', inject([WizbiiHttpInterceptorService], (service: WizbiiHttpInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
