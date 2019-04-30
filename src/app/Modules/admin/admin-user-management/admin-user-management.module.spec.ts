import { AdminUserManagementModule } from './admin-user-management.module';

describe('AdminUserManagementModule', () => {
  let adminUserManagementModule: AdminUserManagementModule;

  beforeEach(() => {
    adminUserManagementModule = new AdminUserManagementModule();
  });

  it('should create an instance', () => {
    expect(adminUserManagementModule).toBeTruthy();
  });
});
