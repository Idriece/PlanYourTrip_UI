import { TestBed, inject } from '@angular/core/testing';

import { TProviderManagerService } from './tprovider-manager.service';

describe('TProviderManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TProviderManagerService]
    });
  });

  it('should be created', inject([TProviderManagerService], (service: TProviderManagerService) => {
    expect(service).toBeTruthy();
  }));
});
