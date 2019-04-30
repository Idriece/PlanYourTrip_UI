import { TestBed, inject } from '@angular/core/testing';

import { PackageServiceService } from './package-service.service';

describe('PackageServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PackageServiceService]
    });
  });

  it('should be created', inject([PackageServiceService], (service: PackageServiceService) => {
    expect(service).toBeTruthy();
  }));
});
