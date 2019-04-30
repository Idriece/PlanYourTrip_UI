import { TransportOwnerModule } from './transport-owner.module';

describe('TransportOwnerModule', () => {
  let transportOwnerModule: TransportOwnerModule;

  beforeEach(() => {
    transportOwnerModule = new TransportOwnerModule();
  });

  it('should create an instance', () => {
    expect(transportOwnerModule).toBeTruthy();
  });
});
