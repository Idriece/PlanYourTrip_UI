import { TestBed, inject } from '@angular/core/testing';

import { HotelOwnerService } from './hotel-owner.service';

describe('HotelOwnerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HotelOwnerService]
    });
  });

  it('should be created', inject([HotelOwnerService], (service: HotelOwnerService) => {
    expect(service).toBeTruthy();
  }));
});
