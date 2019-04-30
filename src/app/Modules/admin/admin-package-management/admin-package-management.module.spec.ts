import { AdminPackageManagementModule } from './admin-package-management.module';

describe('AdminPackageManagementModule', () => {
  let adminPackageManagementModule: AdminPackageManagementModule;

  beforeEach(() => {
    adminPackageManagementModule = new AdminPackageManagementModule();
  });

  it('should create an instance', () => {
    expect(adminPackageManagementModule).toBeTruthy();
  });
});
