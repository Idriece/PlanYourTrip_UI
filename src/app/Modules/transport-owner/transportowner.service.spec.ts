import { TestBed, inject } from '@angular/core/testing';
import { TransportownerService } from 'src/app/Modules/transport-owner/transport-owner.service';

// import { TransportownerService } from './transportowner.service';

describe('TransportownerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransportownerService]
    });
  });

  it('should be created', inject([TransportownerService], (service: TransportownerService) => {
    expect(service).toBeTruthy();
  }));
});
