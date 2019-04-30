import { AdminHotelManagementModule } from './admin-hotel-management.module';

describe('AdminHotelManagementModule', () => {
  let adminHotelManagementModule: AdminHotelManagementModule;

  beforeEach(() => {
    adminHotelManagementModule = new AdminHotelManagementModule();
  });

  it('should create an instance', () => {
    expect(adminHotelManagementModule).toBeTruthy();
  });
});
