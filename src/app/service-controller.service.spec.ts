import { TestBed } from '@angular/core/testing';

import { ServiceControllerService } from './service-controller.service';

describe('ServiceControllerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceControllerService = TestBed.get(ServiceControllerService);
    expect(service).toBeTruthy();
  });
});
