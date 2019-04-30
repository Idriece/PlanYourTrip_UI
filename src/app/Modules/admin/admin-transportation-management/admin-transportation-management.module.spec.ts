import { AdminTransportationManagementModule } from './admin-transportation-management.module';

describe('AdminTransportationManagementModule', () => {
  let adminTransportationManagementModule: AdminTransportationManagementModule;

  beforeEach(() => {
    adminTransportationManagementModule = new AdminTransportationManagementModule();
  });

  it('should create an instance', () => {
    expect(adminTransportationManagementModule).toBeTruthy();
  });
});
