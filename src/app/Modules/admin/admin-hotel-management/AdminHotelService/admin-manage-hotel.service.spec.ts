import { TestBed, inject } from '@angular/core/testing';

import { AdminManageHotelService } from './admin-manage-hotel.service';

describe('AdminManageHotelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminManageHotelService]
    });
  });

  it('should be created', inject([AdminManageHotelService], (service: AdminManageHotelService) => {
    expect(service).toBeTruthy();
  }));
});
