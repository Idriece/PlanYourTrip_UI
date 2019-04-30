import { UserSignupLoginModule } from './user-signup-login.module';

describe('UserSignupLoginModule', () => {
  let userSignupLoginModule: UserSignupLoginModule;

  beforeEach(() => {
    userSignupLoginModule = new UserSignupLoginModule();
  });

  it('should create an instance', () => {
    expect(userSignupLoginModule).toBeTruthy();
  });
});
