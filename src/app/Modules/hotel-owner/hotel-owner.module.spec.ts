import { HotelOwnerModule } from './hotel-owner.module';

describe('HotelOwnerModule', () => {
  let hotelOwnerModule: HotelOwnerModule;

  beforeEach(() => {
    hotelOwnerModule = new HotelOwnerModule();
  });

  it('should create an instance', () => {
    expect(hotelOwnerModule).toBeTruthy();
  });
});
