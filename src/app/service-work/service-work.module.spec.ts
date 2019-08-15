import { ServiceWorkModule } from './service-work.module';

describe('ServiceWorkModule', () => {
  let serviceWorkModule: ServiceWorkModule;

  beforeEach(() => {
    serviceWorkModule = new ServiceWorkModule();
  });

  it('should create an instance', () => {
    expect(serviceWorkModule).toBeTruthy();
  });
});
