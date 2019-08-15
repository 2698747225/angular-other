import { FlexTestModule } from './flex-test.module';

describe('FlexTestModule', () => {
  let flexTestModule: FlexTestModule;

  beforeEach(() => {
    flexTestModule = new FlexTestModule();
  });

  it('should create an instance', () => {
    expect(flexTestModule).toBeTruthy();
  });
});
