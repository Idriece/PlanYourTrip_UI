import { AdminBookingManagementModule } from './admin-booking-management.module';

describe('AdminBookingManagementModule', () => {
  let adminBookingManagementModule: AdminBookingManagementModule;

  beforeEach(() => {
    adminBookingManagementModule = new AdminBookingManagementModule();
  });

  it('should create an instance', () => {
    expect(adminBookingManagementModule).toBeTruthy();
  });
});
